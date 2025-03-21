import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import jobsads from "../assets/images/jobshd.jpg";
import API from '../api';
import BottomAds from "../components/BottomAds";
import { useAds } from "../context/AdContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getActiveMedia from "../helper/GetActiveMedia";

const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { selectedAds } = useAds();
    const [appointments, setAppointments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const appointmentMain = selectedAds?.find(ad =>
        ad.selectedMedia.some(media => media.position === "Appointment_Main")
    );

    const appointmentMedia = getActiveMedia(appointmentMain);

    const handleSearch = () => {
        // Add your search logic here
    };

    const [show, setShow] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (job) => {
        setSelectedJob(job);
        setShow(true);
    };

    const fetchAppointments = async (pageNumber) => {
        if (pageNumber > totalPages && totalPages !== 0) return;

        setLoading(true);
        try {
            const response = await API.post("/appointments/get_allappointment", {
                page: pageNumber
            });
            setAppointments((prev) => {
                if (pageNumber === 1) {
                    return response.data.appointments;
                }
                return [...prev, ...response.data.appointments];
            });
            setPage(pageNumber);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log("Error in fetching appointments", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(1);
    }, []);

    const handleViewMore = () => {
        if (page < totalPages) {
            fetchAppointments(page + 1);
        }
    };

    return (
        <div className='container mt-3'>
            <div className="row mb-4">
                <div className="col-md-12 mt-4 mb-2">
                    <h2 className="text-center mb-3 fw-bold">Exim Appointments</h2>
                </div>

                {/* Left Section */}
                <div className={appointmentMedia && appointmentMedia.length > 0 ? "col-md-9" : "col-md-12"}>
                    <div className="row mb-4">
                        <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white">
                            <div className="row align-items-center">
                                <div className="col-md-2 mb-3">
                                    <h5 className="fw-bold">Select City</h5>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <Form.Select aria-label="Default select example" className="webinput">
                                        <option>Select City</option>
                                        <option value="1" selected>Mumbai</option>
                                        <option value="2">Chennai</option>
                                        <option value="3">Delhi</option>
                                        <option value="4">Gujarat</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-4 mb-3 col-8">
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="webinput border-end-0"
                                        />
                                        <InputGroup.Text className="bg-transparent border-dark border-start-0">
                                            <i className="bi bi-search"></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className="col-md-2 mb-3 col-4">
                                    <button onClick={handleSearch} className="dailySubscribebtn mx-auto p-2">
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Job Listings */}
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <h5 className="text-webColor fw-bolder">Mumbai</h5>
                                    {appointments.map((job) => (
                                        <div className="AppointBox" key={job._id}>
                                            <h5>{job.job_title || "Job Position"}</h5>
                                            <button className="detailsbtn" onClick={() => handleShow(job)}>
                                                Details
                                            </button>
                                        </div>
                                    ))}

                                    <div className="col-12 text-center mt-4 mb-3">
                                        <button
                                            className="dailySubscribebtn mx-auto p-2"
                                            style={{ width: "200px" }}
                                            onClick={handleViewMore}
                                            disabled={loading || page >= totalPages}
                                        >
                                            {loading ? "Loading..." : "View More"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Advertisement Section */}
                {appointmentMedia && appointmentMedia.length > 0 && (
                    <div className="col-md-3 mb-3">
                        <div className="w-100 mt-2 mb-2">
                            <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true}>
                                {appointmentMedia.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.type === "image" ? (
                                            <img src={media.src} alt="Advertisement" className="ad-image-between w-100" />
                                        ) : (
                                            <video controls={false} autoPlay muted loop className="ad-image-between w-100">
                                                <source src={media.src} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>

            <div className="borderbg"></div>
            <BottomAds leftPosition={"Appointments_Bottom_Left"} rightPosition={"Appointments_Bottom_Right"} />

            <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title className='h5 fw-bolder text-webcolor'>
                        {selectedJob?.job_title || "Job Position"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <div className="job-listing">
                        <div dangerouslySetInnerHTML={{ __html: selectedJob?.description }} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Appointments;