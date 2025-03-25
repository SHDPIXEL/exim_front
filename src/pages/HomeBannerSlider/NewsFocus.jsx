import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { htmlToText } from "html-to-text";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import banner1 from "../../assets/images/banner1.png";


const NewsFocus = () => {
    const [newsInFocus, setNewsInFocus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsInFocus = async () => {
            try {
                const response = await API.post("/news/get_inFocus");
                setNewsInFocus(response.data.data || []);
                console.log(response.data.data)
            } catch (error) {
                console.error("Error fetching news in focus:", error);
            }
        };
        fetchNewsInFocus();
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.realIndex);
    };

    return (
        <div className="customerReview m-0 mb-3">
            <Swiper
                freeMode={false}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    1024: { slidesPerView: 1, spaceBetween: 30 },
                    768: { slidesPerView: 1, spaceBetween: 20 },
                    400: { slidesPerView: 1, spaceBetween: 10 },
                }}
                modules={[Autoplay, Navigation, FreeMode]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
            >
                {newsInFocus.map((news) => (
                    <SwiperSlide key={news._id} onClick={() => navigate(`/newsDetails/${news._id}`)}>
                        <div className="row">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <img src={news.image || banner1} alt="news" width="100%" height="100%" />
                            </div>
                            <div className="col-md-8">
                                <div className="leftTopbannerSlider leftnewfocus">
                                    <div className="d-flex mb-3">
                                        <div className="categorybtn">{news.category_name}</div>
                                        <div className="Slidercountbtn ms-2">
                                            {currentSlide + 1} / {newsInFocus.length}
                                        </div>
                                    </div>
                                    <h3>{news.headline}</h3>
                                    <p>{htmlToText(news.description, { wordwrap: 130 })}</p>
                                    <p><small>{new Date(news.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</small></p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NewsFocus;
