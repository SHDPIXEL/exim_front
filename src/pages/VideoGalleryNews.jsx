import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import newfocusVideo from "../assets/images/newfocusVideo.mp4";
import ads7 from "../assets/images/ads7.png";
import { useNavigate } from 'react-router-dom';
import API, { BASE_URL } from '../api';

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url && typeof url === 'string' ? url.match(regex) : null;
    return match ? match[1] : null;
};

const VideoGalleryNews = () => {
    const navigate = useNavigate();

    const topSlider = [
        {
            _id: "1",
            headline: "Global trade reaching a record in 2024 presents opportunities amidst uncertainty: Report",
            videos: newfocusVideo,
            description: "Global trade is set to reach a record $33 trillion in 2024, according to the latest Global Trade Update by UN Trade and Development (UNCTAD). This $1 trillion increase, reflecting 3.3% annual growth, highlights resilience in global trade...",
            date: "2024-12-06T00:00:00.000Z",
            category_id: "Trade",
            isVideo: true
        },
    ];

    const [videoItems, setVideoItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchVideos = async (pageNumber) => {
        if (pageNumber > totalPages && totalPages !== 0) return;

        setLoading(true);
        try {
            const response = await API.post(`/videoNews/news`, {
                page: pageNumber
            });
            console.log("Response video data:", response.data);

            setVideoItems((prev) => {
                if (pageNumber === 1) {
                    return response.data.news;
                }
                return [...prev, ...response.data.news];
            });
            setPage(pageNumber);
            setTotalPages(response.data.pagination.totalPages);
            console.log("Total items in videoItems:", videoItems.length + response.data.news.length);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(1);
    }, []);

    const handleViewMore = () => {
        if (page < totalPages) {
            fetchVideos(page + 1);
        }
    };

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="customerReview m-0 mb-3">
                                <Swiper
                                    freeMode={false}
                                    autoplay={false}
                                    breakpoints={{
                                        1024: { slidesPerView: 1, spaceBetween: 30 },
                                        768: { slidesPerView: 1, spaceBetween: 20 },
                                        400: { slidesPerView: 1, spaceBetween: 10 },
                                    }}
                                    modules={[Autoplay, Navigation, FreeMode]}
                                    className="mySwiper"
                                >
                                    {videoItems.slice(0, 1).map((slider) => {
                                        const youtubeVideoId = !slider.isVideo ? getYouTubeVideoId(slider.urls) : null;
                                        return (
                                            <SwiperSlide key={slider._id} onClick={() => navigate(`/videoGalleryDetails/${slider._id}`)} role='button'>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3 mb-md-0">
                                                        <div className="videobox">
                                                            {slider.isVideo ? (
                                                                <video width="100%" height="100%" className="videogal" controls muted>
                                                                    <source src={`${BASE_URL}/${slider.videos}`} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            ) : (
                                                                <iframe
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={`https://www.youtube.com/embed/${youtubeVideoId || ''}`}
                                                                    title="YouTube video player"
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                                    allowFullScreen
                                                                ></iframe>
                                                            )}
                                                            <div className="play-icon">
                                                                <i className="bi bi-play-fill"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="leftTopbannerSlider">
                                                            <div className="d-flex mb-3">
                                                                <div className="categorybtn">{slider.category_id}</div>
                                                            </div>
                                                            <h3>{slider.headline}</h3>
                                                            <p>{slider.description.replace(/<[^>]+>/g, '')}</p>
                                                            <p><small>{new Date(slider.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric"
                                                            })}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                            <div className="row">
                                {videoItems.slice(1).map((item) => {
                                    const youtubeVideoId = !item.isVideo ? getYouTubeVideoId(item.urls) : null;
                                    return (
                                        <div className="col-md-3 mb-3 col-6 mt-3" key={item._id}>
                                            <div className="topleftimgcard" onClick={() => navigate(`/videoGalleryDetails/${item._id}`)}>
                                                <div className="videobox smallvideobox">
                                                    {item.isVideo ? (
                                                        <video width="100%" height="100%" className="videogal" controls muted>
                                                            <source src={`${BASE_URL}/${item.videos}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${youtubeVideoId || ""}`}
                                                            title="YouTube video player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            allowFullScreen
                                                        ></iframe>
                                                    )}
                                                    <div className='overlay'></div>
                                                    <div className="play-icon smallplay-icon">
                                                        <i className="bi bi-play-fill"></i>
                                                    </div>
                                                </div>
                                                <h4>{item.headline}</h4>
                                                <p>{new Date(item.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {page < totalPages && (
                                    <div className="col-12 text-center mt-4">
                                        <button
                                            className='dailySubscribebtn mx-auto'
                                            style={{ width: "200px" }}
                                            onClick={handleViewMore}
                                            disabled={loading}
                                        >
                                            {loading ? "Loading..." : "View More"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <img src={ads7} className="w-100 ps-2" alt="advertisement" />
                </div>
            </div>
        </div>
    );
};

export default VideoGalleryNews;