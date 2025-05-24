import React, { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import MumbaiMap from "../../assets/images/mumbai.jpg";
import gujratMap from "../../assets/images/gujrat.jpg";
import ChannaiMap from "../../assets/images/chennai.jpg";
import DelhiMap from "../../assets/images/Delhi.jpg";
import KochiMap from "../../assets/images/kochi.jpg";
import TuticorinMap from "../../assets/images/tuticorin.jpg";
import KolkataMap from "../../assets/images/kolkata.jpg";
import NothMap from "../../assets/images/Nothindia.jpg";
import westMap from "../../assets/images/westernIndia.jpg";
import BottomAds from "../../components/BottomAds";

const OurEditors = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);

  const maps = [
    { src: MumbaiMap, alt: "Mumbai Map" },
    { src: gujratMap, alt: "Gujarat Map" },
    { src: DelhiMap, alt: "Delhi Map" },
    { src: ChannaiMap, alt: "Chennai Map" },
    { src: KochiMap, alt: "Kochi Map" },
    { src: TuticorinMap, alt: "Tuticorin Map" },
    { src: KolkataMap, alt: "Kolkata Map" },
    { src: NothMap, alt: "North India Map" },
    { src: westMap, alt: "Western India Map" },
  ];

  // Open modal on click
  const openModal = (map) => {
    setSelectedMap(map);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMap(null);
  };

  return (
    <div className="container p-md-5 py-md-3">
      {/* Header */}
      <div className="row mt-4">
        <div className="col-md-12 mt-4 text-center">
          <h2 className="fw-bold">Our Editions</h2>
        </div>
      </div>

      {/* Map cards */}
      <div className="row my-3">
        {maps.map((map, index) => (
          <div
            key={index}
            className="col-md-4 mb-4"
            onClick={() => openModal(map)}
            style={{ cursor: "pointer" }} // indicate clickable
          >
            <div
              className="card p-3 border shadow-sm rounded-2 position-relative"
              style={{ overflow: "hidden" }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".overlay").style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".overlay").style.opacity = "0";
              }}
            >
              <img src={map.src} alt={map.alt} className="w-100" />
              <div
                className="overlay d-flex flex-column justify-content-center align-items-center text-white"
                style={{
                  position: "absolute",
                  top: 0,
                  height:"100%",
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                  textAlign: "center",
                }}
              >
                <FaSearchPlus size={36} className="mb-2" style={{color:"black"}}/>
                <div style={{ fontWeight: "bold", fontSize: "1rem", color:"black" }}>
                  Click to Open Map
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="borderbg"></div>

      <BottomAds
        leftPosition={"OurEditors_Bottom_Left"}
        rightPosition={"OurEditors_Bottom_Right"}
      />

      {/* Modal */}
      {modalOpen && selectedMap && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={selectedMap.src}
              alt={selectedMap.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
                margin: "auto",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OurEditors;
