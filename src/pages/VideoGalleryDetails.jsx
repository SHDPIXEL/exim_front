import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogdetailsimg from "../assets/images/blogdetails.jpg";
import adsimg from "../assets/images/adsimg.gif";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import adsleftbannerimg from "../assets/images/topleftads.png";
import banner4 from "../assets/images/banner7.png";
import newfocusVideo from "../assets/images/newfocusVideo.mp4";
import API, { BASE_URL } from "../api";
import dataFormatter from "../helper/DateFormatter";

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
    const [topHeadlines, setTopHeadlines] = useState([]); // Unused, kept for future use

    const bottomData = [
        { id: 1, title: "Proposed US tariffs seen impacting dry bulk trade", imgUrl: banner4, Datetime: "December 06, 2024", category: "Shipping" },
        { id: 2, title: "Proposed US tariffs seen impacting dry bulk trade", imgUrl: banner4, Datetime: "December 06, 2024", category: "Indian Economy" },
        { id: 3, title: "Proposed US tariffs seen impacting dry bulk trade", imgUrl: banner4, Datetime: "December 06, 2024", category: "Export" },
        { id: 4, title: "Proposed US tariffs seen impacting dry bulk trade", imgUrl: banner4, Datetime: "December 06, 2024", category: "Export" }
    ];

    useEffect(() => {
        const fetchVideoNewsDetails = async () => {
            try {
                const response = await API.get(`/videoNews/get_videoNews/${id}`);
                console.log("Details news:", response.data);
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
    console.log("YouTube video ID:", youtubeVideoId);
    console.log("Constructed iframe src:", `https://www.youtube.com/embed/${youtubeVideoId || ''}`);

    return (
        <div className='container mt-5 mb-5'>
            <div className="row">
                <div className="col-xxl-9 col-lg-9 blog-details">
                    <div className="th-blog blog-single d-flex justify-content-between align-items-center">
                        <Link to="/#" className="categorybtn">{VideoNewsDetails.category_name || "Unknown Category"}</Link>

                        {/* Full-Screen Button */}
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const videoElement = document.querySelector(".videogal");
                                if (videoElement?.requestFullscreen) {
                                    videoElement.requestFullscreen();
                                } else if (videoElement?.webkitRequestFullscreen) {
                                    videoElement.webkitRequestFullscreen();
                                } else if (videoElement?.msRequestFullscreen) {
                                    videoElement.msRequestFullscreen();
                                }
                            }}
                        >
                            <i class="bi bi-fullscreen-exit"></i>
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
                                    height="315"
                                    src={`https://www.youtube.com/embed/${youtubeVideoId || ''}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                    {/* <div className="blog-content-wrap">
                            <div className="share-links-wrap">
                                <div className="share-links">
                                    <span className="share-links-title">Share Post:</span>
                                    <div className="multi-social">
                                        <Link to="https://facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link>
                                        <Link to="https://twitter.com/" target="_blank"><i className="bi bi-twitter-x"></i></Link>
                                        <Link to="https://linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></Link>
                                        <Link to="https://pinterest.com/" target="_blank"><i className="fab fa-pinterest-p"></i></Link>
                                        <Link to="https://instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-content">
                                <div className="blog-info-wrap">
                                    <button className="blog-info print_btn">Print : <i className="fas fa-print"></i></button>
                                    <Link className="blog-info" to="mailto:">Email : <i className="fas fa-envelope"></i></Link>
                                    <button className="blog-info ms-sm-auto">15k <i className="fas fa-thumbs-up"></i></button>
                                    <span className="blog-info">126k <i className="fas fa-eye"></i></span>
                                    <span className="blog-info">12k <i className="fas fa-share-nodes"></i></span>
                                </div>
                                <div className="content">
                                    <div className="blog-content">
                                        <p dangerouslySetInnerHTML={{ __html: VideoNewsDetails.description || "No description available" }}></p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
                {/* <div className="blog-navigation mt-3">
                        <div className="nav-btn prev">
                            <div className="img"><img src={banner2} alt="blog img" className="nav-img" /></div>
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Global trade reaching a record in 2024 presents...</Link></h5>
                                <Link to="/#" className="nav-text"><i className="fas fa-arrow-left me-2"></i>Prev</Link>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="nav-btn next">
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Minister launches policy for movement...</Link></h5>
                                <Link to="/#" className="nav-text">Next<i className="fas fa-arrow-right ms-2"></i></Link>
                            </div>
                            <div className="img"><img src={banner3} alt="blog img" className="nav-img" /></div>
                        </div>
                    </div> */}
            </div>
            <div className="col-lg-3">
                {/* <div className="mb-3">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Recent News</div>
                        </div>
                        {bottomData.map((item) => (
                            <div className="righttopStory topleftimgcard SiderecentPost" key={item.id}>
                                <div className="imgside">
                                    <img src={item.imgUrl} width="" height="100%" alt={item.title} />
                                </div>
                                <div className="textside">
                                    <div className="categorybtn">{item.category}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.Datetime}</p>
                                </div>
                            </div>
                        ))}
                    </div> */}
                {/* <div className="mb-4 mt-4">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Popular Tags</div>
                        </div>
                        <div className="tagcloud">
                            <Link to="/#">Trade</Link> <Link to="/#">Shipping</Link><Link to="/#">Exports</Link>
                            <Link to="/#">Special Reports</Link><Link to="/#">Indian Economy</Link>
                            <Link to="/#">Transport & logistic</Link><Link to="/#">Port</Link>
                        </div>
                    </div> */}
                <img src={adsleftbannerimg} alt="ad" className="w-100" style={{ height: "348px" }} />
                <div className="mt-4">
                    {/* <div className="HeadlineList">
                            <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4">
                                <i className="bi bi-fire me-2"></i> Top Headlines
                            </div>
                            <ul>
                                <li><div className="Headlinesingle"><h3>01</h3><h5>Maritime India Vision 2030 achieving its aims, Parliament told</h5></div></li>
                                <li><div className="Headlinesingle"><h3>02</h3><h5>CMA CGM PSS from the Indian Subcontinent, Middle East Gulf, Red Sea ...</h5></div></li>
                                <li><div className="Headlinesingle"><h3>03</h3><h5>CMA CGM PSS from the Indian Subcontinent, Middle East Gulf, Red Sea ...</h5></div></li>
                                <li><div className="Headlinesingle"><h3>04</h3><h5>Alliance capacity market share</h5></div></li>
                                <li><div className="Headlinesingle"><h3>05</h3><h5>Proposed US tariffs seen impacting dry bulk trade</h5></div></li>
                                <li><div className="Headlinesingle"><h3>06</h3><h5>Proposed US tariffs seen impacting dry bulk trade</h5></div></li>
                                <li><div className="Headlinesingle"><h3>07</h3><h5>Proposed US tariffs seen impacting dry bulk trade</h5></div></li>
                            </ul>
                        </div> */}
                </div>
            </div>
        </div>
        </div >
    );
};

export default VideoGalleryDetails;