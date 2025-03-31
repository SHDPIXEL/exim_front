import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import newfocusVideo from "../../assets/images/newfocusVideo.mp4";
import videosmall from "../../assets/images/videosmall.mp4";
import { useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../../api";
import { htmlToText } from "html-to-text";
import dataFormatter from "../../helper/DateFormatter";
import TextFormatter from "../../helper/TextFormatter";

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    return match && match[1] ? match[1] : null;
};

const VideoGallery = () => {
    const navigate = useNavigate();
    const [videoNewsData, setVideoNewsData] = useState([]);

    useEffect(() => {
        const fetchVideoNews = async () => {
            try {
                const response = await API.post("/videoNews/get_videoNewsUser");
                setVideoNewsData(response.data);
            } catch (error) {
                console.error("Error in fetching Video news", error);
            }
        };
        fetchVideoNews();
    }, []);

    return (
        <>
            <div className="customerReview m-0 mb-3">
                <Swiper
                    freeMode={false}
                    autoplay={false}
                    breakpoints={{
                        1024: { slidesPerView: 1, spaceBetween: 30 },
                        768: { slidesPerView: 1, spaceBetween: 20 },
                        400: { slidesPerView: 1, spaceBetween: 10 },
                    }}
                    loop
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="mySwiper"
                >
                    {videoNewsData.slice(0, 3).map((slider) => {
                        const youtubeVideoId = !slider.isVideo ? getYouTubeVideoId(slider.videos) : null;
                        return (
                            <SwiperSlide key={slider._id} onClick={() => navigate(`/videoGalleryDetails/${slider._id}`)} role="button">
                                <div className="row">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="videobox">
                                            {slider.isVideo ? (
                                                <video width="100%" height="100%" className="videogal" controls={false} muted autoPlay loop>
                                                    <source src={`${BASE_URL}/${slider.videos}`} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${youtubeVideoId || ''}`} // Fallback if ID extraction fails
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
                                                <div className="categorybtn">{slider.category_name}</div>
                                            </div>
                                            <h3>{slider.headline}</h3>
                                            <p>{TextFormatter(slider.description)}</p>
                                            <p><small>{dataFormatter(slider.date)}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className="row">
                {videoNewsData.slice(3).map((item) => {
                    const youtubeVideoId = !item.isVideo ? getYouTubeVideoId(item.videos) : null;
                    return (
                        <div className="col-md-3 mb-3 col-6" key={item._id} onClick={() => navigate(`/videoGalleryDetails/${item._id}`)} role="button">
                            <div className="topleftimgcard">
                                <div className="videobox smallvideobox">
                                    {item.isVideo ? (
                                        <video width="100%" height="100%" className="videogal" controls={false} muted>
                                            <source src={`${BASE_URL}/${item.videos}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeVideoId || ''}`} // Fallback if ID extraction fails
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                    <div className="play-icon smallplay-icon">
                                        <i className="bi bi-play-fill"></i>
                                    </div>
                                </div>
                                <h4>{item.headline}</h4>
                                <p>{dataFormatter(item.date)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default VideoGallery;