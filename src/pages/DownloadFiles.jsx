import React, { useState, useEffect } from "react";
import API from "../api";
import { BASE_URL } from "../api";

const getFileIcon = (type) => {
  switch (type) {
    case "pdf": return "bi-file-earmark-pdf-fill text-danger";
    case "image": return "bi-file-earmark-image-fill text-primary";
    case "zip": return "bi-file-earmark-zip-fill text-warning";
    case "word": return "bi-file-earmark-word-fill text-info";
    case "ppt": return "bi-file-earmark-slides-fill text-secondary";
    case "video": return "bi-file-earmark-play-fill text-success";
    case "excel": return "bi-file-earmark-excel-fill text-success";
    default: return "bi-file-earmark-fill text-muted";
  }
};

const DownloadFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await API.post("/files/get_files");

        // Flatten the files array while keeping the title from each item
        const extractedFiles = response.data.flatMap(item =>
          item.files.map(file => ({
            id: item._id,
            title: item.title, // Include title from parent object
            fileType: file.fileType,
            filePath: file.filePath,
            fileName: file.fileName,
          }))
        );

        setFiles(extractedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (filePath, fileName) => {
    try {
      const fullPath = `${BASE_URL}${filePath}`;

      const response = await fetch(fullPath);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download"; // Fallback if fileName is empty
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };



  return (
    <div className="container mt-4 mb-4">
      <h3 className="fw-bold text-center mb-4">Download Files</h3>

      {loading ? (
        <p className="text-center">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-muted">No files to download</p>
      ) : (
        <div className="row">
          {files.map((file, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <div className="border shadow-sm rounded-3 p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <i className={`bi ${getFileIcon(file.fileType)} fs-3 me-3`}></i>
                  <div>
                    <h6 className="mb-1">{file.title}</h6>
                    <small className="text-muted">{file.fileType.toUpperCase()}</small>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownload(file.filePath, file.fileName)}
                >
                  <i className="bi bi-download"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default DownloadFiles;
