import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../../api";
import { htmlToText } from "html-to-text";
import dataFormatter from "../../helper/DateFormatter";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner7.png";
import { useNavigate } from "react-router-dom";

const TopStorySlider = () => {

    const [topStories, setTopStories] = useState([]);

    useEffect(() => {
        const fetchTopStories = async () => {
            try {
                const response = await API.post("/news/get_news_topstories");
                setTopStories(response.data.data);
            } catch (error) {
                console.error("Error in fetching headline", error);
            }
        };
        fetchTopStories();
    }, []);

    const navigate = useNavigate();

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
                            breakpoints={{
                                1024: { slidesPerView: 1, spaceBetween: 30 },
                                768: { slidesPerView: 1, spaceBetween: 20 },
                                400: { slidesPerView: 1, spaceBetween: 10 },
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className="mySwiper"
                        >
                            {topStories.slice(3).map((slider) => (
                                <SwiperSlide key={slider._id} onClick={() => navigate(`/newsDetails/${slider._id}`)} role="button">

                                    <div className="leftTopbannerSlider">
                                        <div className="position-relative mb-2">
                                            <img src={slider.image || "https://placehold.co/600x400"} width="100%" height="100%" alt={slider.headline} />
                                            <div className="storycat">
                                                <div className="categorybtn">{slider.category_name}</div>
                                            </div>
                                        </div>
                                        <h3>{slider.headline}</h3>
                                        <p>{htmlToText(slider.description, {
                                            wordwrap: 130,
                                        })}</p>
                                        <p> <small>
                                            {(() => {
                                                const date = new Date(slider.date);
                                                const day = date.getDate().toString().padStart(2, '0');
                                                const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                                                const year = date.getFullYear();
                                                return `${day} ${month} ${year}`;
                                            })()}
                                        </small></p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-md-6 mb-3">
                        {topStories.slice(0, 3).map((item) => (
                            <div
                                className="righttopStory topleftimgcard"
                                key={item._id}
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
                    </div>

                </div>

            </div>

        </>
    );
};

export default TopStorySlider;
