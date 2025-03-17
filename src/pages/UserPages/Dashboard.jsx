import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import demoimg from "../../assets/images/demo.jpg"
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

const Dashboard = () => {
    const navigate = useNavigate();

    const { logout } = useAuth();
    const { user, loading, userSubscription } = useUser();

    const pastdata = [
        { id: 1, dateU: "31 Dec 2024" },
        { id: 2, dateU: "30 Dec 2024" },
        { id: 3, dateU: "29 Dec 2024" },
        { id: 4, dateU: "28 Dec 2024" },
        { id: 5, dateU: "27 Dec 2024" },
        { id: 6, dateU: "26 Dec 2024" },
        { id: 7, dateU: "25 Dec 2024" },
        { id: 8, dateU: "24 Dec 2024" },
        { id: 9, dateU: "23 Dec 2024" },
        { id: 10, dateU: "22 Dec 2024" },
    ];

    const [selectedDate, setSelectedDate] = useState(null);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="container border shadow-sm p-md-5 py-md-3">
                <div className="row mt-4 mb-4">
                    <div className="col-md-6  d-flex justify-content-md-start justify-content-center">
                        <h3 className="">Welcome to, <span className="text-webColor">{user?.name}</span></h3>
                    </div>
                    <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
                        <p>{user?.login_history[0].timestamp}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-1">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Subscribed Editions</div>
                    </div>
                    {
                        userSubscription.map((edition) => (
                            <div className="col-md-2 mt-3 col-6">
                                <div className="Editionsbox active">
                                    <h4>{edition?.location || "Edition Name"}</h4>
                                    <p>Expire at <span>{edition?.expiry_date}</span></p>
                                </div>
                            </div>
                        ))
                    }
                    {/* <div className="col-md-2 mt-3 col-6">
                        <div className="Editionsbox">
                            <h4>CHENNAI</h4>
                            <p>Expire at <span>31 Dec 2026</span></p>
                        </div>
                    </div> */}
                </div>
                <div className="row mt-5 ">

                    <div className="col-md-4 mb-3 offset-md-4 text-center ">
                        <h5 className="fw-bold">Mumbai Editions - 01 Jan 2025</h5>
                        <div className="newspaper-container mt-3 ">
                            <img alt="home" className="w-100 border shadow-sm rounded-3" src={demoimg} />
                            <button className="dailySubscribebtn mt-3 mx-auto p-2" onClick={() => navigate("/viewpage")} style={{ width: "200px" }}>View  </button>
                        </div>
                    </div>

                </div>
                <div className="row mt-5 align-items-center mb-5">
                    <div className="col-md-2 mb-1">
                        <h4>Past Archives -</h4>
                    </div>
                    <div className="col-md-3 mb-1">
                        <div className="datepicker-container w-100">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                placeholderText="Select a date"
                                dateFormat="MMMM d, yyyy"
                                className="form-control webinput w-100 dateiconimg"
                            />
                        </div>
                    </div>
                </div>


                <div className="row mb-5">

                    <div className="col-md-10 mb-3 col-8">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Last 10 Days</div>
                    </div>
                    <div className="col-md-2 mb-3 col-4">

                        <div className='swiperbtn d-flex justify-content-end'>
                            <button className="custom-prev"><i className="bi bi-arrow-left-short"></i></button>
                            <button className="custom-next"><i className="bi bi-arrow-right-short"></i></button>
                        </div>

                    </div>
                    <div className="col-lg-12 col-md-12 mt-1">

                        <Swiper
                            freeMode={true}
                            autoplay={false}
                            breakpoints={{
                                1024: { slidesPerView: 6, spaceBetween: 30 },
                                768: { slidesPerView: 4, spaceBetween: 20 },
                                400: { slidesPerView: 2, spaceBetween: 10 },
                                300: { slidesPerView: 2, spaceBetween: 10 },
                            }}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className="mySwiper"
                        >
                            {pastdata.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="pasdatbox">
                                        <h6 className="m-0 fw-bold">{item.dateU}</h6>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Dashboard;