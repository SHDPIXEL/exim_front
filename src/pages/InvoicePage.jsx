import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../api";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../logo.png";

const Invoice = () => {
  const { invoiceId } = useParams();
  const [searchParams] = useSearchParams(); // new
  const shouldDownload = searchParams.get("download") === "true"; // new
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gstOption, setGstOption] = useState("without"); // 'with' or 'without'
  const invoiceRef = useRef(); // Reference to the invoice div
  const autoDownload = useRef(true);

  const headerRef = useRef();
  const contentRef = useRef();
  const footerRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await API.post(
          "/services/get_invoice",
          { orderId: invoiceId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  useEffect(() => {
    if (!loading && invoiceData && shouldDownload && autoDownload.current) {
      setTimeout(() => {
        DownloadPDF();
        autoDownload.current = false;
      }, 1000);
    }
  }, [loading, invoiceData, shouldDownload]);

  // Pre-compute totals
  const { totalBasePrice, totalPrice } = React.useMemo(() => {
    if (!invoiceData?.subscriptions)
      return { totalBasePrice: 0, totalPrice: 0 };
    const totals = invoiceData.subscriptions.reduce(
      (acc, data) => {
        const price = parseFloat(data.price);
        const base = data.basePrice ? parseFloat(data.basePrice) : price / 1.18;
        acc.totalBasePrice += base;
        acc.totalPrice += price;
        return acc;
      },
      { totalBasePrice: 0, totalPrice: 0 }
    );
    return totals;
  }, [invoiceData]);

  if (loading) return <p>Loading invoice...</p>;
  if (!invoiceData) return <p>No invoice found.</p>;

  // Discount and GST calculations (for with-GST view)
  const discountPercent = invoiceData.discountInfo?.discountPercentage || 0;
  const baseDiscount =
    invoiceData.discountInfo?.baseDiscountAmount ??
    invoiceData.discountInfo?.discountAmount ??
    0;
  const baseSubtotal = totalBasePrice - baseDiscount;
  const gstOnSubtotal = baseSubtotal * 0.18;
  const totalPayableWithGst = baseSubtotal + gstOnSubtotal;

  // Function to download the invoice as a PDF
  const DownloadPDF = () => {
    const input = invoiceRef.current;

    // Clone invoice for consistent rendering
    const cloned = input.cloneNode(true);
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "fixed";
    hiddenContainer.style.top = "-10000px";
    hiddenContainer.style.left = "0";
    hiddenContainer.style.width = "794px"; // A4 width (210mm)
    hiddenContainer.style.background = "white";
    hiddenContainer.style.zIndex = "-1";
    hiddenContainer.style.padding = "0";
    hiddenContainer.style.margin = "0";
    hiddenContainer.appendChild(cloned);
    document.body.appendChild(hiddenContainer);

    // Wait for images
    const images = cloned.querySelectorAll("img");
    const promises = Array.from(images).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => (img.onload = img.onerror = res))
    );

    Promise.all(promises).then(() => {
      // Add a small delay to ensure rendering is complete
      setTimeout(() => {
        html2canvas(cloned, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: 794,
          windowHeight: cloned.scrollHeight,
        }).then((canvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
          const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

          // Add margins (10mm on each side)
          const margin = 10;
          const contentWidth = pageWidth - 2 * margin;
          const contentHeight = pageHeight - 2 * margin;

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // Calculate the image dimensions to fit within margins
          const imgWidth = contentWidth;
          const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

          // Calculate how many pages we need
          const totalPages = Math.ceil(imgHeight / contentHeight);

          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");

          // Set page canvas dimensions - height should match one content page
          pageCanvas.width = canvas.width;
          pageCanvas.height = (canvas.height * contentHeight) / imgHeight;

          for (let i = 0; i < totalPages; i++) {
            // Calculate the source Y position for this page (in canvas pixels)
            const srcY = (canvas.height / imgHeight) * (i * contentHeight);
            const remainingHeight = canvas.height - srcY;
            const srcHeight = Math.min(
              (canvas.height / imgHeight) * contentHeight,
              remainingHeight
            );

            // Only draw if there's content to show
            if (srcHeight > 0 && srcY < canvas.height) {
              pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
              pageCtx.drawImage(
                canvas,
                0,
                srcY,
                canvas.width,
                srcHeight,
                0,
                0,
                pageCanvas.width,
                pageCanvas.height
              );

              const imgData = pageCanvas.toDataURL("image/png", 1.0);
              if (i > 0) pdf.addPage();
              pdf.addImage(
                imgData,
                "PNG",
                margin,
                margin,
                contentWidth,
                contentHeight
              );
            }
          }

          pdf.save(`invoice_${invoiceId}.pdf`);
          document.body.removeChild(hiddenContainer);
        });
      }, 100);
    });
  };

  return (
    <div className="invoice-container-m">
      {/* Invoice Div to Capture */}
      <div
        className="invoice-container"
        ref={invoiceRef}
        style={{
          padding: "5mm",
          maxWidth: "240mm",
          margin: "0 auto",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Invoice Header */}

        <div
          className="header"
          style={{
            background: "#1d75d9",
            padding: "1rem",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <div
            className="logo-section"
            style={{ textAlign: "left", width: "100%" }}
          >
            <img
              crossOrigin="anonymous"
              src={logo}
              alt="Exim Logo"
              style={{ maxHeight: "60px" }}
            />
          </div>
        </div>

        {/* Invoice Title */}
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "700",
            marginTop: "0.8rem",
            color: "var(--text-primary)",
            paddingBottom: "1rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Tax Invoice
        </div>

        {/* Supplier & Customer Info */}
        <div
          className="info-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div className="supplier-info" style={{ flex: 1, textAlign: "left" }}>
            <p>
              <strong>Supplier Name:</strong> Exim India
            </p>
            <p>
              <strong>Supplier Address:</strong> 123 Street, City, State, 456789
            </p>
            <p>
              <strong>GSTIN:</strong> 29AABCT3518Q1ZV
            </p>
          </div>
          <div
            className="customer-info"
            style={{ flex: 1, textAlign: "right" }}
          >
            <p>
              <strong>Name:</strong> {invoiceData.name}
            </p>
            <p>
              <strong>Phone:</strong> {invoiceData.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {invoiceData.customerAddress}
            </p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="invoice-details-container">
          <div className="left-details">
            <p>
              <strong>Invoice Date:</strong> {invoiceData.invoiceDate}{" "}
              {invoiceData.invoiceTime}
            </p>
            <p>
              <strong>Transaction ID:</strong> {invoiceData.transactionId}
            </p>
          </div>
          <div className="right-details" style={{ textAlign: "right" }}>
            <p>
              <strong>Order ID:</strong> {invoiceData.orderId}
            </p>
            <p>
              <strong>Payment Method:</strong> UPI/DIGITAL{" "}
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="table-container" style={{ overflow: "auto" }}>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Edition</th>
                <th>Price</th>
                {gstOption === "with" && <th>Tax</th>}
                <th>Duration</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.subscriptions.map((data, index) => {
                const price = parseFloat(data.price);
                const basePrice = data.basePrice
                  ? parseFloat(data.basePrice)
                  : price / 1.18;
                const tax = price - basePrice;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.location}</td>
                    <td>₹{basePrice.toFixed(2)}</td>
                    {gstOption === "with" && <td>₹{tax.toFixed(2)}</td>}
                    <td>{data.duration}</td>
                    <td>
                      ₹
                      {gstOption === "with"
                        ? price.toFixed(2)
                        : basePrice.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Applied Offers Section */}
        {invoiceData.offers && invoiceData.offers.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              textAlign: "right",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              <strong>Applied Offer Codes:</strong>{" "}
              {invoiceData.offers
                .map((offer) => offer.code)
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* Total Section */}
        <div
          className="total-section"
          style={{
            borderBottom: "2px solid var(--border)",
            paddingBottom: "1rem",
          }}
        >
          {gstOption === "with" && (
            <>
              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
              >
                <span style={{ fontWeight: 500, color: "#000" }}>
                  Total Base Price: ₹{totalBasePrice.toFixed(2)}
                </span>
              </div>

              {invoiceData.discountInfo && (
                <div
                  className="total-row final"
                  style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
                >
                  <span style={{ fontWeight: 500, color: "#000" }}>
                    Discount ({discountPercent}%): - ₹{baseDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
              >
                <span style={{ fontWeight: 500, color: "#000" }}>
                  Subtotal (after discount): ₹{baseSubtotal.toFixed(2)}
                </span>
              </div>

              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
              >
                <span style={{ fontWeight: 500, color: "#000" }}>
                  GST (18% on subtotal): ₹{gstOnSubtotal.toFixed(2)}
                </span>
              </div>

              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}
              >
                <span style={{ fontWeight: "bold", color: "#1d75d9" }}>
                  Total Paid Amount: ₹{totalPayableWithGst.toFixed(2)}
                </span>
              </div>
            </>
          )}

          {gstOption !== "with" && (
            <>
              {/* Total Base Price (Original) */}
              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
              >
                <span style={{ fontWeight: 500, color: "#000" }}>
                  Total Base Price: ₹{invoiceData.totalWithoutGSTOriginal}
                </span>
              </div>

              {/* Discount Amount (if exists) */}
              {invoiceData?.discountInfo?.baseDiscountAmount > 0 && (
                <div
                  className="total-row final"
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                    color: "red",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#000" }}>
                    Discount ({discountPercent}%): - ₹
                    {invoiceData.discountInfo.baseDiscountAmount}
                  </span>
                </div>
              )}

              {/* Final Total Paid */}
              <div
                className="total-row final"
                style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}
              >
                <span style={{ fontWeight: "bold", color: "#1d75d9" }}>
                  Total Paid Amount: ₹{invoiceData.totalWithoutGST}
                </span>
              </div>
            </>
          )}

          <div
            className="total-row"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-primary)",
              fontWeight: "500",
            }}
          >
            <span>
              {" "}
              Total Amount in Words:{" "}
              {gstOption === "with"
                ? invoiceData.amountInWords
                : invoiceData.amountInWordsWithoutGST}
            </span>
          </div>
        </div>

        {/* Footer */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "2rem",
            border: "1px solid var(--border)",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "50%",
                  padding: "8px",
                  borderRight: "1px solid var(--border)",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  verticalAlign: "bottom",
                  textAlign: "left",
                }}
              >
                <p>
                  <a
                    href="https://eximin.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#0d6efd" }}
                  >
                    https://eximin.net
                  </a>
                </p>
              </td>
              <td
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  verticalAlign: "bottom",
                  textAlign: "right",
                }}
              >
                <p>E&OE</p>
                <p style={{ marginTop: "2rem" }}>Authorized Signatory</p>
                <p>Exim India</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* GST Option Toggle - Above Download Button */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", marginRight: "1rem" }}>
          Invoice Type:
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="gstOption"
            value="without"
            checked={gstOption === "without"}
            onChange={(e) => setGstOption(e.target.value)}
            style={{ cursor: "pointer" }}
          />
          Without GST
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="gstOption"
            value="with"
            checked={gstOption === "with"}
            onChange={(e) => setGstOption(e.target.value)}
            style={{ cursor: "pointer" }}
          />
          With GST
        </label>
      </div>

      {/* Download Button */}
      <button onClick={DownloadPDF} className="btn btn-primary mb-3">
        Download Invoice
      </button>
    </div>
  );
};

export default Invoice;
