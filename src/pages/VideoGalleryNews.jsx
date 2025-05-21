import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import newfocusVideo from "../assets/images/newfocusVideo.mp4";
import ads7 from "../assets/images/ads7.png";
import { useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../api";
import { useAds } from "../context/AdContext";
import getActiveMedia from "../helper/GetActiveMedia";
import dataFormatter from "../helper/DateFormatter";

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url && typeof url === "string" ? url.match(regex) : null;
  return match ? match[1] : null;
};

const VideoGalleryNews = () => {
  const navigate = useNavigate();
  const { selectedAds, handleAdClick } = useAds();

  const [videoItems, setVideoItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageNumber) => {
    if (pageNumber > totalPages && totalPages !== 0) return;

    setLoading(true);
    try {
      const response = await API.post(`/videoNews/news`, {
        page: pageNumber,
      });

      setVideoItems((prev) => {
        if (pageNumber === 1) {
          return response.data.news;
        }
        return [...prev, ...response.data.news];
      });
      setPage(pageNumber);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  const handleViewMore = () => {
    if (page < totalPages) {
      fetchVideos(page + 1);
    }
  };

  const videoHomeAds = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Video_Gallery_News")
  );

  const videoHomeMedia = getActiveMedia(videoHomeAds);
  const hasAds = videoHomeMedia && videoHomeMedia.length > 0;

  return (
    <div className="container video-gallery-container">
      <div className="row">
        <div className="col-md-12 mb-2">
          <h2 className="text-center mb-3 fw-bold">Exim Video Gallery</h2>
        </div>
        <div className={`col-md-${hasAds ? "9" : "12"}`}>
          <div className="row mt-2">
            <div className="col-md-12 mb-3">
              <div className="customerReview m-0 mb-3">
                <Swiper
                  freeMode={false}
                  autoplay={false}
                  breakpoints={{
                    1024: { slidesPerView: 1, spaceBetween: 30 },
                    768: { slidesPerView: 1, spaceBetween: 20 },
                    400: { slidesPerView: 1, spaceBetween: 10 },
                  }}
                  modules={[Autoplay, Navigation, FreeMode]}
                  className="mySwiper"
                >
                  {videoItems.slice(0, 1).map((slider) => {
                    const youtubeVideoId = !slider.isVideo
                      ? getYouTubeVideoId(slider.urls)
                      : null;
                    return (
                      <SwiperSlide
                        key={slider._id}
                        onClick={() =>
                          navigate(`/videoGalleryDetails/${slider._id}`)
                        }
                        role="button"
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <div className="videobox">
                              {slider.isVideo ? (
                                <video
                                  width="100%"
                                  height="100%"
                                  className="videogal"
                                  controls
                                  muted
                                >
                                  <source
                                    src={`${BASE_URL}/${slider.videos}`}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={`https://www.youtube.com/embed/${
                                    youtubeVideoId || ""
                                  }`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                ></iframe>
                              )}
                              <div className="play-icon">
                                <i className="bi bi-play-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="leftTopbannerSlider">
                              <div className="d-flex mb-3">
                                <div className="categorybtn">
                                  {slider.category_id}
                                </div>
                              </div>
                              <h3>{slider.headline}</h3>
                              <p>
                                {slider.description.replace(/<[^>]+>/g, "")}
                              </p>
                              <p>
                                <small>{dataFormatter(slider.date)}</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="row">
                {videoItems.slice(1).map((item) => {
                  const youtubeVideoId = !item.isVideo
                    ? getYouTubeVideoId(item.urls)
                    : null;
                  return (
                    <div className="col-md-3 mb-3 col-6 mt-3" key={item._id}>
                      <div
                        className="topleftimgcard"
                        onClick={() =>
                          navigate(`/videoGalleryDetails/${item._id}`)
                        }
                      >
                        <div className="videobox smallvideobox">
                          {item.isVideo ? (
                            <video
                              width="100%"
                              height="100%"
                              className="videogal"
                              controls
                              muted
                            >
                              <source
                                src={`${BASE_URL}/${item.videos}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${
                                youtubeVideoId || ""
                              }`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          )}
                          <div className="overlay"></div>
                          <div className="play-icon smallplay-icon">
                            <i className="bi bi-play-fill"></i>
                          </div>
                        </div>
                        <h4>{item.headline}</h4>
                        <p>{dataFormatter(item.date)}</p>
                      </div>
                    </div>
                  );
                })}
                {page < totalPages && (
                  <div className="col-12 text-center mt-4">
                    <button
                      className="dailySubscribebtn mx-auto"
                      style={{ width: "200px" }}
                      onClick={handleViewMore}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {hasAds && (
          <div className="col-md-3 mb-3">
            <div className="w-100 mt-2 mb-2">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                {videoHomeMedia.map((media, index) => (
                  <SwiperSlide key={index}>
                    <a
                      title="View More"
                      onClick={() =>
                        handleAdClick(
                          "VideoGalleryNew " + media.name,
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
                          className="ad-image-between w-100"
                        />
                      ) : (
                        <video
                          controls={false}
                          autoPlay
                          muted
                          loop
                          className="ad-image-between w-100"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGalleryNews;
