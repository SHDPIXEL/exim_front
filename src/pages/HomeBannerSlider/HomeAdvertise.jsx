import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { useAds } from "../../context/AdContext";

const HomeAdvertise = () => {
    const { ads, loading, error } = useAds();
    const headlineTopHome = ads?.find(ad => ad.position === "Headline_Top_Home" && ad.status === "Active");

    const activeMedia = [];

    if (headlineTopHome) {
        if (headlineTopHome.images?.length) {
            activeMedia.push(...headlineTopHome.images
                .filter(image => image.status === "Active")
                .map(image => ({ type: "image", src: image.filePath }))
            );
        }

        if (headlineTopHome.videos?.length) {
            activeMedia.push(...headlineTopHome.videos
                .filter(video => video.status === "Active")
                .map(video => ({ type: "video", src: video.filePath }))
            );
        }
    }

    return (
        <Swiper
            freeMode={false}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
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
                        {media.type === "image" ? (
                            <img src={media.src} className="w-100" alt="Advertisement" style={{ height: "348px", objectFit: "cover" }} />
                        ) : (
                            <video controls={false} autoPlay muted className="w-100" style={{ height: "348px", objectFit: "cover" }}>
                                <source src={media.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </SwiperSlide>
                ))
            ) : (
                <p>No active advertisements available</p>
            )}
        </Swiper>
    );
};

export default HomeAdvertise;
