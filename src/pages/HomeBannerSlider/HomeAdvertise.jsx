import React from "react";
import adsleftbannerimg from "../../assets/images/topleftads.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
const HomeAdvertise = () => {

    const topSlider = [
        {
            id: 1,
            imgUrl: adsleftbannerimg,
        },
        {
            id: 2,
            imgUrl: adsleftbannerimg,
        },
        {
            id: 3,
            imgUrl: adsleftbannerimg,

        }
    ];

    return (
        <Swiper
            freeMode={false}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            //autoplay={false}
            breakpoints={{
                1024: { slidesPerView: 1, spaceBetween: 0 },
                768: { slidesPerView: 1, spaceBetween: 0 },
                400: { slidesPerView: 1, spaceBetween: 0 },
            }}
            modules={[Autoplay, Navigation, FreeMode]}
            className="mySwiper"
        >
            {topSlider.map((slider) => (
                <SwiperSlide key={slider.id}>
                    <img src={slider.imgUrl} className="w-100" alt="" style={{ height: "348px" }} />
                </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default HomeAdvertise;