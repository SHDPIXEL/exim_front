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

  const handleContextMenu = (e) => {
    const target = e.target.closest("[data-news-id]");
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      const id = target.getAttribute("data-news-id");
      window.open(`/newsDetails/${id}`, "_blank");
    }
  };

  return (
    <div onContextMenu={handleContextMenu}>
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
          {topNews.slice(0, 7).map((slider) => (
            <SwiperSlide key={slider._id}>
              <div
                role="button"
                onClick={() => navigate(`/newsDetails/${slider._id}`)}
                data-news-id={slider._id}
              >
                <div className="row">
                  <div className="col-md-6 order-1 order-md-0">
                    <div className="leftTopbannerSlider">
                      <div className="d-flex mb-3">
                        <div className="categorybtn">
                          {slider.category_name}
                        </div>
                        <div className="Slidercountbtn ms-2">
                          {currentSlide + 1} / {topNews.slice(0, 7).length}
                        </div>
                      </div>
                      <h3>{slider.headline}</h3>
                      <p>
                        {htmlToText(slider.description, {
                          wordwrap: 130,
                        })}
                      </p>
                      <p>
                        <small>
                          {(() => {
                            const date = new Date(slider.date);
                            const day = date
                              .getDate()
                              .toString()
                              .padStart(2, "0");
                            const month = date
                              .toLocaleString("en-US", { month: "short" })
                              .toUpperCase();
                            const year = date.getFullYear();
                            return `${day} ${month} ${year}`;
                          })()}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 order-0 order-md-1">
                    <div className="slider-image-box">
                      <img
                        src={slider.image || "https://placehold.co/600x400"}
                        alt="slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="row">
        {topNews.slice(7).map((item, index) => (
          <div
            className="col-md-3 mb-3 col-6"
            key={item._id}
            onClick={() => navigate(`/newsDetails/${item._id}`)}
            data-news-id={item._id}
          >
            <div className="topleftimgcard">
              <div className="image-box">
                <img
                  src={item.image || "https://placehold.co/600x400"}
                  alt="news"
                />
              </div>
              <h4>{item.headline}</h4>
              <p>
                {(() => {
                  const date = new Date(item.date);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase();
                  const year = date.getFullYear();
                  return `${day} ${month} ${year}`;
                })()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => navigate("/eximnews", { state: { headlines } })}
        className="row justify-content-center my-3"
      >
        <div className="col-md-3">
          <div className="dailySubscribebtn py-2 text-center">View All</div>
        </div>
      </div>
    </div>
  );
};

export default TopBannerSlider;
