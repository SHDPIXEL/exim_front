import React, { useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import newfocusVideo from "../assets/images/newfocusVideo.mp4";
import videosmall from "../assets/images/banner4.png";
import ads7 from "../assets/images/ads7.png";
import { useNavigate } from 'react-router-dom';

const VideoGalleryNews = () => {

    const navigate = useNavigate();

    const topSlider = [
        {
            id: 1,
            title: "Global trade reaching a record in 2024 presents opportunities amidst uncertainty: Report",
            imgUrl: newfocusVideo,
            content: "Global trade is set to reach a record $33 trillion in 2024, according to the latest Global Trade Update by UN Trade and Development (UNCTAD). This $1 trillion increase, reflecting 3.3% annual growth, highlights resilience in global trade...",
            Datetime: "December 06, 2024",
            category: "Trade"
        },


    ];

    const bottomData = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: "Proposed US tariffs seen impacting dry bulk trade",
        imgUrl: videosmall,
        Datetime: "December 06, 2024",
    }));

    const [visibleItems, setVisibleItems] = useState(8);

    const handleViewMore = () => {
        setVisibleItems((prev) => prev + 8);
    };

    return (
        <div className='container my-5'>

            <div className="row ">
                {/* <div className="col-md-12 mb-3">
                    <h2 className='text-center mb-5 fw-bold'>Video Gallery News</h2>
                </div> */}
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
                                    {topSlider.map((slider) => (
                                        <SwiperSlide key={slider.id} onClick={()=>navigate("/videoGalleryDetails")} role='button'>
                                            <div className="row">
                                                <div className="col-md-6  mb-3 mb-md-0" >
                                                    <div className="videobox">
                                                        <video width="100%" height="100%" className="videogal" controls={false} muted autoPlay loop>
                                                            <source src={slider.imgUrl} type="video/mp4" />
                                                        </video>
                                                        <div className="play-icon">
                                                            <i className="bi bi-play-fill"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="leftTopbannerSlider">
                                                        <div className="d-flex mb-3">
                                                            <div className="categorybtn">{slider.category}</div>

                                                        </div>
                                                        <h3>{slider.title}</h3>
                                                        <p>{slider.content}</p>
                                                        <p><small>{slider.Datetime}</small></p>
                                                    </div>
                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="row">
                                {bottomData.slice(0, visibleItems).map((item) => (
                                    <div className="col-md-3 mb-3 col-6 mt-3" key={item.id} onClick={()=>navigate("/videoGalleryDetails")}>
                                        <div className="topleftimgcard">
                                            <div className="videobox smallvideobox">
                                                <img src={item.imgUrl} alt="" />
                                                <div className='overlay'></div>
                                                <div className="play-icon smallplay-icon">
                                                    <i className="bi bi-play-fill"></i>
                                                </div>
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.Datetime}</p>
                                        </div>
                                    </div>
                                ))}
                                    {visibleItems < bottomData.length && (
                                        <div className="col-12 text-center mt-4">

                                            <button className='dailySubscribebtn mx-auto' style={{ width: "200px" }} onClick={handleViewMore}>
                                                View More
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 ">

                    <img src={ads7} className="w-100  ps-2" />

                </div>
            </div>
        </div>
    )
}

export default VideoGalleryNews;