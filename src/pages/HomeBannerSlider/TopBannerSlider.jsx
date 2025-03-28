import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { htmlToText } from "html-to-text";

// Import images dynamically
import { useNavigate } from "react-router-dom";


const TopBannerSlider = ({ topNews, headlines }) => {
    const navigate = useNavigate();

    // State for tracking the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.realIndex);
    };



    return (
        <>
            <div className="customerReview m-0 mb-3">
                <Swiper
                    freeMode={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop
                    //autoplay={false}
                    breakpoints={{
                        1024: { slidesPerView: 1, spaceBetween: 30 },
                        768: { slidesPerView: 1, spaceBetween: 20 },
                        400: { slidesPerView: 1, spaceBetween: 10 },
                    }}
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="mySwiper"
                    onSlideChange={handleSlideChange}
                >
                    {topNews.slice(0, 3).map((slider) => (
                        <SwiperSlide key={slider._id}>
                            <div role="button" onClick={() => navigate(`/newsDetails/${slider._id}`)}>
                                <div className="row">
                                    <div className="col-md-6 order-1 order-md-0">
                                        <div className="leftTopbannerSlider">
                                            <div className="d-flex mb-3">
                                                <div className="categorybtn">{slider.category_name}</div>
                                                <div className="Slidercountbtn ms-2">
                                                    {currentSlide + 1} / {topNews.slice(0,3).length}
                                                </div>
                                            </div>
                                            <h3>{slider.headline}</h3>
                                            <p>{htmlToText(slider.description, {
                                                wordwrap: 130,
                                            })}</p>
                                            <p><small>{new Date(slider.date).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}</small></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 order-0 order-md-1 mb-3 mb-md-0">
                                        <img src={slider.image || "https://placehold.co/600x400"} width="100%" height="100%" alt={slider.title} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="row">
                {topNews.slice(3).map((item, index) => (
                    <div className="col-md-3 mb-3 col-6" key={item._id} onClick={() => navigate(`/newsDetails/${item._id}`)}>
                        <div className="topleftimgcard">
                            <img src={item.image || "https://placehold.co/600x400"} />
                            <h4>{item.headline}</h4>
                            <p>{new Date(item.date).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}</p>
                        </div>

                    </div>
                ))}
            </div>
            <div 
            onClick={() => navigate("/eximnews", {state: {headlines}})}
            className="row justify-content-center my-3">
                <div className="col-md-3">
                    <div className="dailySubscribebtn py-2 text-center">View All</div>
                </div>
            </div>

        </>
    );
};

export default TopBannerSlider;
