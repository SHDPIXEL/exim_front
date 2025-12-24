import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getActiveMedia from "../helper/GetActiveMedia";
import { useAds } from "../context/AdContext";

const TopAds = () => {
  const { selectedAds, handleAdClick } = useAds();

  const topRightAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Top_Right")
  );

  const topLeftAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Top_Left")
  );

  const topRightMedia = getActiveMedia(topRightAd);
  const topLeftMedia = getActiveMedia(topLeftAd);

  if (!topLeftMedia.length && !topRightMedia.length) {
    return null;
  }

  return (
    <div className="container mt-3">
      <div className="container">
        <div className="row mb-4">
          {/* Left Swiper */}
          {topLeftMedia.length > 0 && (
            <div className="col-md-6 mt-2 mb-2">
              <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                {topLeftMedia.map((media, index) => (
                  <SwiperSlide key={index}>
                    <a
                      title="View More"
                      onClick={() =>
                        handleAdClick(
                          {
                            company: media.company_name,
                            id: media.name,
                            position: media.position,
                          },
                          media.url
                        )
                      }
                      className="cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.src}
                          alt="Advertisement"
                          className="w-100 ad-image-top"
                        />
                      ) : (
                        <video
                          controls={false}
                          autoPlay
                          muted
                          className="w-100 ad-image-top"
                        >
                          <source src={media.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Right Swiper */}
          {topRightMedia.length > 0 && (
            <div className="col-md-6 mt-2 mb-2">
              <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                {topRightMedia.map((media, index) => (
                  <SwiperSlide key={index}>
                    <a
                      title="View More"
                      onClick={() =>
                        handleAdClick(
                          {
                            company: media.company_name,
                            id: media.name,
                            position: media.position,
                          },
                          media.url
                        )
                      }
                      className="cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.src}
                          alt="Advertisement"
                          className="w-100 ad-image-top"
                        />
                      ) : (
                        <video
                          controls={false}
                          autoPlay
                          muted
                          className="w-100 ad-image-top"
                        >
                          <source src={media.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopAds;


