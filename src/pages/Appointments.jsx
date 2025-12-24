import React, { useEffect, useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import API from "../api";
import BottomAds from "../components/BottomAds";
import { useAds } from "../context/AdContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import getActiveMedia from "../helper/GetActiveMedia";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedAds, handleAdClick } = useAds();
  const [appointments, setAppointments] = useState([]);
  const [editions, setEditions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  //   const [count, setCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [searchedCity, setSearchedCity] = useState("Mumbai");
  const [isSearching, setIsSearching] = useState(false);

  const appointmentMain = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Appointment_Main")
  );
  const appointmentMedia = getActiveMedia(appointmentMain);

  const handleClose = () => setShow(false);
  const handleShow = (job) => {
    setSelectedJob(job);
    setShow(true);
  };

  const fetchAppointments = async (pageNumber = 1) => {
    if (pageNumber > totalPages && totalPages !== 0) return;

    setLoading(true);
    try {
      const response = await API.post("/appointments/get_allappointment", {
        page: pageNumber,
      });

      setAppointments((prev) =>
        pageNumber === 1
          ? response.data.appointments
          : [...prev, ...response.data.appointments]
      );
      setPage(pageNumber);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     handleSearch(searchPage);
  //   }, [searchTerm]);

  //   useEffect(() => {
  //     if (count > 0) {
  //       handleSearch(1);
  //     }
  //     setCount(1);
  //   }, [selectedCity]);

  useEffect(() => {
    fetchAppointments(1);
  }, []);  

  useEffect(() => {
    setSearchResults([]);
    setSearchPage(1);

    if (searchTerm || selectedCity) {
      setIsSearching(true);
      handleSearch(1);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, selectedCity]);

  const handleViewMore = () => {
    if (isSearching) {
      if (searchPage < searchTotalPages) {
        handleSearch(searchPage + 1, true);
      }
    } else {
      if (page < totalPages) {
        fetchAppointments(page + 1);
      }
    }
  };

  // const handleSearch = async (pageNumber = 1, view = false) => {
  //     if (pageNumber > searchTotalPages && searchTotalPages !== 0) return;
  //     setLoading(true);
  //     try {
  //         const response = await API.post("/appointments/search_appointments", {
  //             edition: selectedCity || "",
  //             query: searchTerm || "",
  //             page: pageNumber,
  //         });

  //         // Access the correct field for appointments
  //         const results = response.data.appointments || []; // Fallback to an empty array

  //         if(view){
  //             setSearchResults((prev) =>
  //                 pageNumber === 1 ? results : prev.length > 0 ? [...prev, ...results] : results);
  //         } else {
  //             setSearchResults((prev) => results);
  //         }

  //         setSearchedCity(selectedCity);
  //         setSearchPage(pageNumber);
  //         setSearchTotalPages(response.data.totalPages || 1);
  //     } catch (error) {
  //         console.error("Error searching appointments:", error.response?.data || error.message);
  //     } finally {
  //         setLoading(false);
  //     }
  // };
  const handleSearch = async (pageNumber = 1, view = false) => {
    setIsSearching(true);
    setLoading(true);

    try {
      const response = await API.post("/appointments/search_appointments", {
        edition: selectedCity || "",
        query: searchTerm || "",
        page: pageNumber,
      });

      const results = response.data.appointments || [];

      setSearchResults((prev) =>
        pageNumber === 1 ? results : [...prev, ...results]
      );

      setSearchPage(pageNumber);
      setSearchTotalPages(response.data.totalPages || 1);
      setSearchedCity(selectedCity);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedAppointments = isSearching ? searchResults : appointments;

  return (
    <div className="container mt-3">
      <div className="row mb-4">
        <div className="col-md-12 mt-4 mb-2">
          <h2 className="text-center mb-3 fw-bold">Exim Appointments</h2>
        </div>

        {/* Left Section */}
        <div
          className={
            appointmentMedia && appointmentMedia.length > 0
              ? "col-md-9"
              : "col-md-12"
          }
        >
          <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white">
            <div className="row align-items-center">
              <div className="col-md-2 mb-3">
                <h5 className="fw-bold">Select City</h5>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Select
                  className="webinput"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  <option selected value="Mumbai">
                    Mumbai
                  </option>
                  <option selected value="Kolkata">
                    Kolkata
                  </option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Tuticorin">Tuticorin</option>
                  <option value="Cochin">Cochin</option>
                </Form.Select>
              </div>
              <div className="col-md-4 mb-3 col-8">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="title/keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="webinput border-end-0"
                  />
                  <InputGroup.Text
                    onClick={handleSearch}
                    className="bg-transparent border-dark border-start-0"
                  >
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
              <div className="col-md-2 mb-3 col-4 d-none">
                <button
                  onClick={() => handleSearch(1)} // Ensure it always starts from page 1
                  className="dailySubscribebtn mx-auto p-2"
                  // disabled={!searchTerm || !selectedCity}  // Disable button if no input
                >
                  Search
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="row mt-3">
              <div className="col-md-12">
                <h5 className="text-webColor fw-bolder">
                  {searchedCity || ""}
                </h5>
                {displayedAppointments.map((job) => (
                  <div className="AppointBox" key={job._id}>
                    <h5>{job.job_title || "Job Position"}</h5>
                    <button
                      className="detailsbtn"
                      onClick={() => handleShow(job)}
                    >
                      Details
                    </button>
                  </div>
                ))}
                {!loading && displayedAppointments.length === 0 && (
                  <p className="text-center mt-3">No appointments found.</p>
                )}
                <div className="col-12 text-center mt-4 mb-3 d-flex justify-content-center">
                  {searchPage < searchTotalPages ? (
                    <button
                      className="dailySubscribebtn p-2"
                      style={{ width: "200px" }} // Fixed width
                      onClick={handleViewMore}
                      disabled={
                        loading ||
                        (searchTerm || selectedCity || searchedCity
                          ? searchPage >= searchTotalPages
                          : page >= totalPages)
                      }
                    >
                      {loading ? "Loading..." : "View More"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Advertisement Section */}
        {appointmentMedia?.length > 0 && (
          <div className="col-md-3 mb-3">
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true}>
              {appointmentMedia.map((media, index) => (
                <SwiperSlide key={index}>
                  <a
                    title="View More"
                    onClick={() =>
                      handleAdClick("Appointment " + media.name, media.url)
                    }
                    className="cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.src}
                        alt="Advertisement"
                        className="ad-image-between w-100"
                      />
                    ) : (
                      <video
                        src={media.src}
                        muted
                        autoPlay
                        loop
                        className="ad-image-between w-100"
                      />
                    )}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <BottomAds
        leftPosition="Appointments_Bottom_Left"
        rightPosition="Appointments_Bottom_Right"
      />

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.job_title || "Job Position"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: selectedJob?.description }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;
