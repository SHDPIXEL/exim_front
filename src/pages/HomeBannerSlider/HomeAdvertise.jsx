import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { useAds } from "../../context/AdContext";
import getActiveMedia from "../../helper/GetActiveMedia";

const HomeAdvertise = () => {
    const { selectedAds, handleAdClick } = useAds();


    const ads = selectedAds?.find(ad =>
        ad.selectedMedia.some(media => media.position === "Home_Above_Headlines")
    );
    const activeMedia = getActiveMedia(ads);


    return (
        <Swiper
            freeMode={false}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
                1024: { slidesPerView: 1, spaceBetween: 0 },
                768: { slidesPerView: 1, spaceBetween: 0 },
                400: { slidesPerView: 1, spaceBetween: 0 },
            }}
            modules={[Autoplay, Navigation, FreeMode]}
            className="mySwiper"
        >
            {activeMedia.length > 0 ? (
                activeMedia.map((media, index) => (
                    <SwiperSlide key={index}>
                        <a title='View More' onClick={() => handleAdClick("Home Top " + media.name,media.url)} className='cursor-pointer' target="_blank" rel="noopener noreferrer">
                                            
                            {media.type === "image" ? (
                                <img src={media.src} className="w-100" alt="Advertisement" style={{ height: "348px", objectFit: "cover" }} />
                            ) : (
                                <video controls={false} autoPlay muted loop className="w-100" style={{ height: "348px", objectFit: "cover" }}>
                                    <source src={media.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </a>
                    </SwiperSlide>
                ))
            ) : (
                "")}
        </Swiper >
    );
};

export default HomeAdvertise;
