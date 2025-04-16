import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../../api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import { Link, useNavigate } from "react-router-dom";
import TextFormatter from "../../helper/TextFormatter";
import dataFormatter from "../../helper/DateFormatter";

const NewCategories = () => {
    const navigate = useNavigate();
    const [categoryNews, setCategoryNews] = useState([]);


    useEffect(() => {
        const fetchCategoriesNews = async () => {
            try {
                const response = await API.post("/news/get_news_category");
                setCategoryNews(response.data.data);
            } catch (error) {
                console.error("Error in fetching Headlines", error);
            }
        };
        fetchCategoriesNews();
    }, []);

    return (
        <>
            <div className="mt-2 mb-3">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <Swiper
                            freeMode={false}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            //autoplay={false}
                            breakpoints={{
                                1024: { slidesPerView: 1, spaceBetween: 30 },
                                768: { slidesPerView: 1, spaceBetween: 20 },
                                400: { slidesPerView: 1, spaceBetween: 10 },
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className="mySwiper"
                        >
                            {categoryNews.slice(3).map((slider) => (
                                <SwiperSlide key={slider._id} role="button" onClick={() => navigate(`/newsDetails/${slider._id}`)} >

                                    <div className="leftTopbannerSlider">
                                        <div className="position-relative mb-2">
                                            <img src={slider.image || "https://placehold.co/600x400"}
                                            style={{
                                                aspectRatio: "6 / 4",
                                                objectFit : "cover"
                                            }} 
                                            width="100%" height="100%" alt={slider.headline} />
                                            <div className="storycat">
                                                <div className="categorybtn">{slider.category_name}</div>
                                            </div>
                                        </div>
                                        <h3>{slider.headline}</h3>
                                        <p className="mb-2">{TextFormatter(slider.description)}</p>
                                        <p><small>{dataFormatter(slider.date)}</small></p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-md-6 mb-3">
                        {categoryNews.slice(0, 3).map((item) => (
                            <div
                                className="righttopStory topleftimgcard"
                                key={item._id}
                                role="button"
                                onClick={() => navigate(`/newsDetails/${item._id}`)}
                                style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}
                            >
                                <div className="imgside" style={{ width: '150px', height: '100px', overflow: 'hidden' }}>
                                    <img
                                        src={item.image || "https://placehold.co/600x400"}
                                        alt={item.headline}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="textside" style={{ flex: 1 }}>
                                    <div className="categorybtn">{item.category_name}</div>
                                    <h4 style={{ margin: '5' }}>{item.headline}</h4>
                                    <p>{dataFormatter(item.date)}</p>
                                </div>
                            </div>
                        ))}
                        <Link
                            to="/Category"
                            type="button"
                            className="ViewallBtn text-center py-2 m-0 d-flex align-items-center justify-content-center"
                        >
                            View All
                        </Link>
                    </div>

                </div>

            </div>

        </>
    );
};

export default NewCategories;
