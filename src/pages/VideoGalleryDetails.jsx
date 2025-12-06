import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import banner4 from "../assets/images/banner7.png";
import newfocusVideo from "../assets/images/newfocusVideo.mp4";
import API, { BASE_URL } from "../api";
import dataFormatter from "../helper/DateFormatter";
import { useAds } from "../context/AdContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getActiveMedia from "../helper/GetActiveMedia";

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url && typeof url === 'string' ? url.match(regex) : null;
    return match ? match[1] : null;
};

const VideoGalleryDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [VideoNewsDetails, setVideoNewsData] = useState({});
    const [topHeadlines, setTopHeadlines] = useState([]);
    const { selectedAds, handleAdClick } = useAds();

    const VideoDetailsAds = selectedAds?.find(ad =>
        ad.selectedMedia.some(media => media.position === "Video_Gallery_Details")
    );
    const VideoDetailsMedia = getActiveMedia(VideoDetailsAds);
    const hasAds = VideoDetailsMedia && VideoDetailsMedia.length > 0;


    useEffect(() => {
        const fetchVideoNewsDetails = async () => {
            try {
                const response = await API.get(`/videoNews/get_videoNews/${id}`);
                setVideoNewsData(response.data);
            } catch (error) {
                console.error("Error in fetching News details:", error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };
        fetchVideoNewsDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    const youtubeVideoId = !VideoNewsDetails.isVideo ? getYouTubeVideoId(VideoNewsDetails.urls) : null;

    return (
        <div className='container mt-5 mb-5'>
            <div className="row">
                <div className={`col-xxl-${hasAds ? '9' : '12'} col-lg-${hasAds ? '9' : '12'} blog-details`}>
                    <div className="th-blog blog-single d-flex justify-content-between align-items-center">
                        <Link to="/#" className="categorybtn">{VideoNewsDetails.category_name || "Unknown Category"}</Link>

                        {/* Full-Screen Button */}
                        {/* Full-Screen Button */}
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const videoElement = document.querySelector(".videogal");
                                const iframeElement = document.querySelector(".youtube-iframe");

                                // Check if the video is native or YouTube iframe
                                if (videoElement && videoElement.requestFullscreen) {
                                    videoElement.requestFullscreen();
                                } else if (iframeElement && iframeElement.requestFullscreen) {
                                    iframeElement.requestFullscreen();
                                } else if (iframeElement && iframeElement.webkitRequestFullscreen) {
                                    iframeElement.webkitRequestFullscreen(); // Safari
                                } else if (iframeElement && iframeElement.msRequestFullscreen) {
                                    iframeElement.msRequestFullscreen(); // IE/Edge
                                } else if (videoElement && videoElement.webkitRequestFullscreen) {
                                    videoElement.webkitRequestFullscreen(); // Safari
                                } else if (videoElement && videoElement.msRequestFullscreen) {
                                    videoElement.msRequestFullscreen(); // IE/Edge
                                }
                            }}
                        >
                            <i className="bi bi-fullscreen-exit"></i>
                        </button>

                    </div>

                    <h2 className="blog-title">{VideoNewsDetails.headline || "No Title"}</h2>

                    <div className="blog-meta">
                        <Link to="/#">
                            <i className="far fa-calendar-days"></i>
                            {dataFormatter(VideoNewsDetails.date) || "No Date"}
                        </Link>
                    </div>

                    <div className="blog-img">
                        <div className="videobox h-auto">
                            {VideoNewsDetails.isVideo ? (
                                <video width="100%" height="350" className="videogal" controls muted autoPlay loop>
                                    <source src={VideoNewsDetails.videos} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="500"
                                    src={`https://www.youtube.com/embed/${youtubeVideoId || ''}?autoplay=1&mute=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    className="youtube-iframe" // Added a class for easier selection
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>

                            )}
                        </div>
                    </div>
                </div>

                {hasAds && (
                    <div className="col-lg-3">
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 3000 }}
                            loop={true}
                        >
                            {VideoDetailsMedia.map((media, index) => (
                                <SwiperSlide key={index}>
                                    <a title='View More' onClick={() => handleAdClick("VideoGallery Right " + media.name,media.url)} className='cursor-pointer' target="_blank" rel="noopener noreferrer">
                                            
                                        {media.type === "image" ? (
                                            <img src={media.src} alt="Advertisement" className="w-100 ad-image-between" style={{ height: "348px" }} />
                                        ) : (
                                            <video style={{ height: "348px" }} controls={false} autoPlay muted loop className="w-100 ad-image-between">
                                                <source src={media.src} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoGalleryDetails;
