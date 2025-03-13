import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../../api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// Import images dynamically
import newfocusVideo from "../../assets/images/newfocusVideo.mp4";
import banner2 from "../../assets/images/banner2.png";
import banner4 from "../../assets/images/banner4.png";
import { useNavigate } from "react-router-dom";

const NewsFocus = () => {

    const [newsInFocus, setNewsInFocus] = useState([]);

    useEffect(() => {
        const fetchNewsInFocus = async () => {
            try {
                const response = await API.post("/news/get_news_recent");
                const data = response.data.data;
                setNewsInFocus(data)
            } catch (error) {
                console.log("Error in fetching news in focus", error);
            }
        };
        fetchNewsInFocus();
    }, []);
    

    const navigate = useNavigate();
    // Array of slider data
    const topSlider = [
        {
            id: 1,
            title: "India expanding export base and ranks among top 10 global suppliers ",
            imgUrl: newfocusVideo,
            content: "India's journey toward becoming a global economic powerhouse is marked by remarkable achievements in its export landscape. The nation has demonstrated significant progress in diverse sectors, ranging from petroleum oils and agrochemicals to semiconductors and precious stones. This growth reflects India's ability to leverage advanced technology, innovative practices and competitive manufacturing to meet global demands. Suppo...",
            Datetime: "December 06, 2024",
            category: "Indian Economy",

        },
        {
            id: 2,
            title: "Global trade reaching a record in 2024 presents opportunities amidst uncert...",
            imgUrl: banner2,
            content: "India's journey toward becoming a global economic powerhouse is marked by remarkable achievements in its export landscape. The nation has demonstrated significant progress in diverse sectors, ranging from petroleum oils and agrochemicals to semiconductors and precious India's journey toward becoming a global economic powerhouse is marked by remarkable achievements in its export landscape. The nation has demonstrated signific...",
            Datetime: "December 06, 2024",
            category: "Indian Economy"
        },
        {
            id: 3,
            title: "Minister launches policy for incentivising movement of long haul ...",
            imgUrl: banner4,
            content: "The Union Minister of Ports, Shipping & Waterways (MoPSW), Mr Sarbananda Sonowal, unveiled a major policy for Cargo Promotion - ‘Jalvahak’ - incentivising movement of long haul cargo via National Waterways 1 (river Ganga) as well as for National Waterways 2 The Union Minister of Ports, Shipping & Waterways (MoPSW), Mr Sarbananda Sonowal, unveiled a major policy for Cargo Promotion - ‘Jalvahak’ - incentivising movement of ...",
            Datetime: "December 06, 2024",
            category: "Indian Economy"
        }
    ];


    
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.realIndex); 
    };
    const renderMedia = (url, title) => {
        if (url.endsWith(".mp4")) {
            return (
                <video width="100%" height="100%" controls={false} muted autoPlay>
                    <source src={url} type="video/mp4" />
                </video>
            );
        } else {
            return <img src={url} width="100%" height="100%" alt={title} />;
        }
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
                    // autoplay={false}
                    breakpoints={{
                        1024: { slidesPerView: 1, spaceBetween: 30 },
                        768: { slidesPerView: 1, spaceBetween: 20 },
                        400: { slidesPerView: 1, spaceBetween: 10 },
                    }}
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="mySwiper"
                    onSlideChange={handleSlideChange}
                >
                    {topSlider.map((slider) => (
                        <SwiperSlide key={slider.id} role="button" onClick={()=>navigate("/newsDetails")}>
                            <div className="row">
                                <div className="col-md-4 mb-3 mb-md-0">
                                    <div className="HomenewfocussliderImg">
                                        {renderMedia(slider.imgUrl, slider.title)}
                                    </div>

                                </div>
                                <div className="col-md-8 ">
                                    <div className="leftTopbannerSlider leftnewfocus">
                                        <div className="d-flex mb-3">
                                            <div className="categorybtn">{slider.category}</div>
                                            <div className="Slidercountbtn ms-2">
                                                {currentSlide + 1} / {topSlider.length}
                                            </div>
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

        </>
    );
};

export default NewsFocus;
