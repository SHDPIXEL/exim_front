import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from "../../context/UserContext";
import API from "../../api";
import dataFormatter from "../../helper/DateFormatter";
import { useNotification } from "../../context/NotificationContext";


const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading } = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [pastDates, setPastDates] = useState([]);
    const [userSubscription, setUserSubscription] = useState([]);
    const [editionUrl, setEditionUrl] = useState(null);
    const [editionImage, setEditionImage] = useState(null); // Renamed for consistency
    const [isFetching, setIsFetching] = useState(false); // Track fetch status

    const { showNotification } = useNotification();

    const generatePastDates = () => {
        const dates = [];
        const today = new Date();
        let count = 0;
        let currentDate = new Date(today);

        while (count < 30) {
            const dayOfWeek = currentDate.getDay();

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                const day = currentDate.getDate().toString().padStart(2, '0');
                const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const year = currentDate.getFullYear();

                dates.push({
                    id: count + 1,
                    dateU: `${day} ${month} ${year}`,
                });

                count++;
            }

            currentDate.setDate(currentDate.getDate() - 1);
        }

        return dates;
    };



    // Format date to YYYY-MM-DD in local timezone
    const formatDateToLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fetch subscription data
    useEffect(() => {
        const fetchSubscriptionData = async () => {
            try {
                const response = await API.post("/services/get_dashboardSubscription", {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                const subscriptions = response.data.userSubscription;
                setUserSubscription(subscriptions);
                if (subscriptions.length > 0 && !selectedEdition) {
                    setSelectedEdition(subscriptions[0]); // Default to first subscription
                }
            } catch (error) {
                console.error("Error fetching subscription", error);
            }
        };
        fetchSubscriptionData();
    }, []);

    // Fetch edition based on selectedEdition and selectedDate
    const fetchEditionData = async () => {
        if (!selectedEdition || !selectedDate) return;

        setIsFetching(true); // Indicate fetching has started
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
            if (response.data.success && response.data.data) {
                setEditionUrl(response.data.data.url);
                setEditionImage(response.data.data.image);
            } else {
                setEditionUrl(null);
                setEditionImage(null);
            }
        } catch (error) {
            console.error("Error fetching edition data:", error);
            setEditionUrl(null);
            setEditionImage(null);
        } finally {
            setIsFetching(false); // Fetching complete
        }
    };

    // Set past dates on mount
    useEffect(() => {
        setPastDates(generatePastDates());
    }, []);

    // Fetch edition when selectedEdition or selectedDate changes
    useEffect(() => {
        fetchEditionData();
    }, [selectedEdition, selectedDate]);

    // Handle View button click
    const handleViewClick = (e) => {
        e.preventDefault();

        if (isFetching) {
            showNotification("Please wait, fetching edition data...", "info");
            return;
        }

        if (!editionUrl || !selectedEdition || !selectedDate) {
            showNotification("No edition available for the selected date and edition.", "info");
            return;
        }

        navigate("/viewpage", {
            state: {
                url: editionUrl,
                location: selectedEdition.location,
                date: formatDateToLocal(selectedDate),
                image: editionImage, // Pass image if needed on viewpage
            },
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container border shadow-sm p-md-5 py-md-3">
            <div className="row mt-4 mb-4">
                <div className="col-md-6 d-flex justify-content-md-start justify-content-center">
                    <h3>Welcome to, <span className="text-webColor">{user?.name}</span></h3>
                </div>
                <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
                    <p><b>Last Login : </b>{user?.login_history?.[0]?.timestamp || "No login history available"}</p>
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
                        {selectedDate
                            ? ` - ${(() => {
                                const date = new Date(selectedDate);
                                const day = date.getDate().toString().padStart(2, '0');
                                const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                                const year = date.getFullYear();
                                return `${day} ${month} ${year}`;
                            })()}`
                            : ""}

                    </h5>
                    <div className="newspaper-container mt-3">
                        {isFetching ? (
                            <p>Loading edition...</p>
                        ) : (
                            editionImage && (
                                <img
                                    alt="edition"
                                    className="w-100 border shadow-sm rounded-3"
                                    src={editionImage}
                                />
                            )
                        )}

                        {
                            editionUrl &&
                            <button
                                className="dailySubscribebtn mt-3 mx-auto p-2"
                                onClick={handleViewClick}
                                style={{ width: "200px" }}
                                disabled={isFetching || !editionUrl} // Disable during fetch or if no URL
                            >
                                View
                            </button>
                        }
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
                            filterDate={(date) => {
                                const day = date.getDay();
                                return day !== 0 && day !== 6; // Disable weekends (0 = Sunday, 6 = Saturday)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-10 mb-3 col-8">
                    <div className="webTittle"><i className="bi bi-chevron-right"></i> Last 30 Days</div>
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