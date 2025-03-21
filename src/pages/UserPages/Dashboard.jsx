import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import demoimg from "../../assets/images/demo.jpg";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import API from "../../api";
import dataFormatter from "../../helper/DateFormatter";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user, loading } = useUser();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [pastDates, setPastDates] = useState([]);
    const [userSubscription, setUserSubscription ] = useState([]);

    // Generate last 10 days dynamically
    const generatePastDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 10; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);
            dates.push({
                id: i + 1,
                dateU: pastDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })
            });
        }
        return dates;
    };

    // Set past dates on component mount
    useEffect(() => {
        setPastDates(generatePastDates());
    }, []);

    // Format date to YYYY-MM-DD in local timezone
    const formatDateToLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchSubscriptiondata = async () => {
            try{
                const response = await API.post("/services/get_userSubscription");
                console.log("subscription data", response.data)
                setUserSubscription(response.data.userSubscription);
            }catch(error) {
                console.error("Error in fetching subscription", error)
            }
        }
        fetchSubscriptiondata()
    },[])

    // Handle View button click
    const handleViewClick = async (e) => {
        e.preventDefault(); // Prevent default behavior

        if (!selectedEdition || !selectedDate) {
            alert("Please select an edition and a date");
            return;
        }

        try {
            const formattedDate = formatDateToLocal(selectedDate);

            const response = await API.post(
                "/digital_copies/get_bydate",
                {
                    location: selectedEdition.location,
                    date: formattedDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            console.log("Response data:", response.data);

            if (response.data.success && response.data.data.length > 0) {
                navigate("/viewpage", {
                    state: {
                        url: response.data.data[0].url, // Pass the URL directly
                        location: selectedEdition.location,
                        date: formattedDate,
                    },
                });
            } else {
                alert(response.data.message || "No data found for the selected date and edition.");
            }
        } catch (error) {
            console.error("Error fetching edition data:", error);
            alert("Failed to load edition data. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container border shadow-sm p-md-5 py-md-3">
            <div className="row mt-4 mb-4">
                <div className="col-md-6 d-flex justify-content-md-start justify-content-center">
                    <h3>Welcome to, <span className="text-webColor">{user?.name}</span></h3>
                </div>
                <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
                    <p>{user?.login_history?.[0]?.timestamp || "No login history available"}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 mb-1">
                    <div className="webTittle">
                        <i className="bi bi-chevron-right"></i> Subscribed Editions
                    </div>
                </div>

                {userSubscription.length > 0 ? (
                    userSubscription.map((edition) => (
                        <div className="col-md-2 mt-3 col-6" key={edition._id || edition.location}>
                            <div
                                className={`Editionsbox ${selectedEdition?.location === edition.location ? 'active' : ''}`}
                                onClick={() => setSelectedEdition(edition)}
                                style={{ cursor: "pointer" }}
                            >
                                <h4>{edition?.location || "Edition Name"}</h4>
                                <p>Expire at <span>{dataFormatter(edition?.expiryDate)}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 mt-3">
                        <p className="text-center text-muted">No subscriptions available</p>
                    </div>
                )}
            </div>

            <div className="row mt-5">
                <div className="col-md-4 mb-3 offset-md-4 text-center">
                    <h5 className="fw-bold">
                        {selectedEdition ? `${selectedEdition.location} Editions` : "Select an Edition"}
                        {selectedDate ? ` - ${selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}` : ""}
                    </h5>
                    <div className="newspaper-container mt-3">
                        <img alt="home" className="w-100 border shadow-sm rounded-3" src={demoimg} />
                        <button
                            className="dailySubscribebtn mt-3 mx-auto p-2"
                            onClick={handleViewClick}
                            style={{ width: "200px" }}
                        >
                            View
                        </button>
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
                            maxDate={new Date()} // Prevent future dates
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
                        {pastDates.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    className="pasdatbox"
                                    onClick={() => setSelectedDate(new Date(item.dateU))}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h6 className="m-0 fw-bold">{item.dateU}</h6>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;