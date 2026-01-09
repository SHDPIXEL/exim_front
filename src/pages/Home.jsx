import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBannerSlider from "./HomeBannerSlider/TopBannerSlider";
import logo from "../assets/images/image.png";
import TopStorySlider from "./HomeBannerSlider/TopStorySlider";
import Newsletter from "./Newsletter";
import EximEventsSlider from "./HomeBannerSlider/EximEventSlider";
import homenewpaper from "../assets/images/homenewpaper.png";
import NewsFocus from "./HomeBannerSlider/NewsFocus";
import NewCategories from "./HomeBannerSlider/NewCategories";
import EximPolls from "./HomeBannerSlider/EximPolls";
import VideoGallery from "./HomeBannerSlider/VideoGallery";
import jobimg from "../assets/images/Job.svg";
import FacebookPost from "./HomeBannerSlider/FacebookPost";
import TwitterPost from "./HomeBannerSlider/TwitterPost";
import HomeAdvertise from "./HomeBannerSlider/HomeAdvertise";
import API from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getActiveMedia from "../helper/GetActiveMedia";
import { useAds } from "../context/AdContext";
import dayjs from "dayjs";

const Home = () => {
  const navigate = useNavigate();
  const [headlines, SetHeadlines] = useState([]);
  const [TopNews, setTopNews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tweets, setTweets] = useState([]);

  const { selectedAds, handleAdClick } = useAds();
  // Get active media for top right and top left ads
  const topRightAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Top_Right")
  );
  const topLeftAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Top_Left")
  );

  const aboveEventstRight = selectedAds?.find((ad) =>
    ad.selectedMedia.some(
      (media) => media.position === "Home_AboveEvents_Right"
    )
  );
  const aboveEventstLeft = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_AboveEvents_Left")
  );

  const SubscribeAds = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Subscribe")
  );

  const videoHomeAds = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Video")
  );

  const bottomRightAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Bottom_Right")
  );
  const bottomLeftAd = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "Home_Bottom_Left")
  );

  // Extracting active media
  const topRightMedia = getActiveMedia(topRightAd);
  const topLeftMedia = getActiveMedia(topLeftAd);

  const aboveEventsRightMedia = getActiveMedia(aboveEventstRight);
  const aboveEventsLeftMedia = getActiveMedia(aboveEventstLeft);

  const SubscribeMedia = getActiveMedia(SubscribeAds);
  const videoHomeMedia = getActiveMedia(videoHomeAds);

  const bottomRightMedia = getActiveMedia(bottomRightAd);
  const bottomLeftMedia = getActiveMedia(bottomLeftAd);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await API.post("/news/get_news_recent");
        const data = response.data.data;
        setTopNews(data.slice(0, 11));
        SetHeadlines(data.slice(11));
      } catch (error) {
        console.error("Error in fetching Headlines", error);
      }
    };
    fetchHeadlines();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.post(
          "/appointments/get_latest_appointments"
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error in fetching appointments");
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await API.get("/tweets/latest-tweet");
        console.log("tweets", response.data);
        setTweets(response.data.tweet); // now clearly an array
      } catch (error) {
        console.error("Error in fetching tweet:", error);
      }
    };

    fetchTweets();
  }, []);

  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [tweets]);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-Y1L0N0LFM2";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y1L0N0LFM2');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="borderbg"></div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            <TopBannerSlider topNews={TopNews} headlines={headlines} />
          </div>

          <div className="col-lg-3">
            <HomeAdvertise />

            <div className="mt-4">
              <div className="HeadlineList">
                <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4">
                  <i className="bi bi-fire me-2"></i> Top Headlines
                </div>
                <ul>
                  {headlines.map((headlineItem, index) => (
                    <li key={index}>
                      <div
                        className="Headlinesingle"
                        onClick={() =>
                          navigate(`/newsDetails/${headlineItem._id}`)
                        }
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            `/newsDetails/${headlineItem._id}`,
                            "_blank"
                          );
                        }}
                      >
                        <h3>{index + 1}</h3>
                        <h5>{headlineItem.headline}</h5>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="borderbg"></div>
        <div className="row mt-4">
          <div className="col-md-12 mb-3">
            <div className="webTittle">
              <i className="bi bi-chevron-right"></i> Top Stories
            </div>
          </div>
          <div className="col-md-9">
            <TopStorySlider />
          </div>
          <div className="col-md-3 mb-4">
            <Newsletter />
          </div>
        </div>
        <div className="borderbg"></div>

        <div className="container">
          <div className="row mb-4">
            {/* Left Swiper */}
            {aboveEventsLeftMedia.length > 0 && (
              <div className="col-md-6 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {aboveEventsLeftMedia.map((media, index) => (
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
            {aboveEventsRightMedia.length > 0 && (
              <div className="col-md-6 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {aboveEventsRightMedia.map((media, index) => (
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

        <div className="borderbg"></div>

        <div className="row my-4 ">
          <EximEventsSlider />
        </div>

        <div className="borderbg"></div>
        <div className="row my-4">
          <div className="col-md-12 mb-4">
            <div className="webTittle">
              <i className="bi bi-chevron-right"></i> Subscribe to EXIM India
              Digital Copy
            </div>
          </div>
          <div className="col-md-5 mb-3">
            <div
              className="newspaper-container"
              role="button"
              onClick={() => navigate("/subscribePage")}
            >
              <img src={homenewpaper} alt="home" className="w-100" />
              <h4>
                EXIM India Digital Copy includes all latest news & insights
                coverage you need{" "}
              </h4>
              <p>
                Our yearly charges to subscribe with EXIM India Digital Copy,
                that varies with costs as well as number of copies with respect
                to locations.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="homedailyEximbtn">
              <ul>
                <li>
                  <Link to="/subscribePage">Mumbai</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Chennai</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Gujarat</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Kolkata</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Delhi</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Kochi</Link>
                </li>
                <li>
                  <Link to="/subscribePage">Tutikorin</Link>
                </li>
              </ul>
              <button
                className="dailySubscribebtn"
                onClick={() => navigate("/subscribePage")}
              >
                Subscribe to EXIM India Digital Copy
              </button>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            {SubscribeMedia && SubscribeMedia.length > 0 && (
              <div className="w-100 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {SubscribeMedia.map((media, index) => (
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
                            className="ad-image-between w-100"
                          />
                        ) : (
                          <video
                            controls={false}
                            autoPlay
                            muted
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
            )}
          </div>
        </div>
        <div className="borderbg"></div>
        <div className="row my-4">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> News In Focus
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <NewsFocus />
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> Follow Us
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="sociallinks">
                  <Link
                    to="https://www.facebook.com/Exim-India-132749816804720"
                    target="_blank"
                  >
                    <div>
                      <i className="bi bi-facebook"></i> facebook{" "}
                    </div>
                    <div>Like</div>
                  </Link>
                  <Link to="https://x.com/Exim_India" target="_blank">
                    <div>
                      <i className="bi bi-twitter-x"></i> twitter{" "}
                    </div>
                    <div>Follow</div>
                  </Link>
                  <Link
                    to="https://www.youtube.com/@eximindia9046"
                    target="_blank"
                  >
                    <div>
                      <i className="bi bi-youtube"></i> youtube
                    </div>
                    <div>Subscribe</div>
                  </Link>
                  <Link
                    to="https://www.instagram.com/eximindia_"
                    target="_blank"
                  >
                    <div>
                      <i className="bi bi-instagram"></i> instagram
                    </div>
                    <div>Follow</div>
                  </Link>
                  <Link
                    to="https://www.linkedin.com/company/eximindia/"
                    target="_blank"
                  >
                    <div>
                      <i className="bi bi-linkedin"></i> linkedin
                    </div>
                    <div>Follow</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 ">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> News Categories
                </div>
              </div>
              <NewCategories />
            </div>
          </div>
          <div className="col-md-3 mb-4 ">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> EXIM Polls
                </div>
              </div>
              <EximPolls />
            </div>
          </div>
        </div>
        <div className="borderbg"></div>
        <div className="row my-4 h-100">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> Video Gallery
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <VideoGallery />
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            {videoHomeMedia && videoHomeMedia.length > 0 && (
              <div className="w-100 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {videoHomeMedia.map((media, index) => (
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
                            className="ad-image-between w-100"
                          />
                        ) : (
                          <video
                            controls={false}
                            autoPlay
                            muted
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
            )}
          </div>
        </div>
        <div className="borderbg"></div>
        <div className="row my-4">
          <div className="col-md-9">
            <div className="row">
              <div
                className="col-md-6 mb-4"
                style={{ height: "900px", overflow: "auto" }}
              >
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> EXIM India on{" "}
                  <i className="bi bi-facebook"></i>{" "}
                </div>
                <h5 className="mt-3 mb-3">
                  @Exim_India - a reputed and all-India recognised premier
                  publishing house.
                </h5>
                <div className="w-100">
                  <FacebookPost />
                </div>
              </div>
              <div
                className="col-md-6 mb-4"
                style={{ height: "900px", overflow: "auto" }}
              >
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> EXIM India on{" "}
                  <i className="bi bi-twitter-x"></i>
                </div>
                <h5 className="mt-3 mb-3">
                  @Exim_India - a reputed and all-India recognised premier
                  publishing house.
                </h5>
                <div className="w-full flex flex-col items-center">
                  {tweets ? (
                    <div className="max-w-md w-full bg-white border border-gray-300 rounded-xl shadow-sm p-4 m-4">
                      {/* Top row: profile pic + username */}
                      {/* Top row: profile pic + username */}
                      <div className="flex flex-col mb-2">
                        <div className="flex items-center">
                          <img
                            src={logo}
                            alt="Exim_India"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: "8px",
                            }}
                          />
                          <span className="font-semibold text-sm">
                            Exim_India
                          </span>
                        </div>
                        <span
                          style={{
                            color: "#000",
                            fontSize: "10px",
                            marginLeft: "35px",
                          }}
                        >
                          @Exim_India ·{" "}
                          {dayjs(tweets.created_at).format("MMM D, YYYY")}
                        </span>
                      </div>

                      {/* Tweet content */}
                      {/* Tweet content */}
                      <p className="text-sm text-gray-800 whitespace-pre-line mb-3">
                        {tweets && tweets.text ? (
                          tweets.text.split("\n").map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              {/* For each line, split by spaces */}
                              {line.split(" ").map((word, wordIndex) => {
                                // Detect URLs and make them clickable
                                if (
                                  word.startsWith("https://") ||
                                  word.startsWith("http://")
                                ) {
                                  return (
                                    <a
                                      key={wordIndex}
                                      href={word}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500"
                                    >
                                      {word}{" "}
                                    </a>
                                  );
                                }
                                // Detect hashtags and style them differently
                                else if (word.startsWith("#")) {
                                  return (
                                    <span
                                      key={wordIndex}
                                      className="text-green-500"
                                    >
                                      {word}{" "}
                                    </span>
                                  );
                                }
                                // Regular text
                                else {
                                  return <span key={wordIndex}>{word} </span>;
                                }
                              })}
                              {/* Add a line break between parts */}
                              <br />
                            </React.Fragment>
                          ))
                        ) : (
                          <span>Loading tweet content...</span>
                        )}
                      </p>

                      {/* Media */}
                      {tweets.media?.[0]?.url && (
                        <div className="w-full flex justify-center mt-2">
                          <a
                            href={tweets.tweet_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block" // Make the link block-level so it covers the whole image area
                          >
                            <img
                              src={tweets.media[0].url}
                              alt="Tweet media"
                              className="rounded-lg object-cover w-full max-h-60 border"
                            />
                          </a>
                        </div>
                      )}

                      {/* Bottom: View on Twitter */}
                      <div className="mt-3 text-right">
                        <a
                          href={tweets.tweet_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm hover:underline"
                        >
                          View on Twitter
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p>Loading tweet...</p>
                  )}
                </div>
              </div>
              <div className="col-md-12 mb-3"></div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="EximAppoBoxMain">
              <img src={jobimg} alt="msg" />
              <h4>EXIM Appointments</h4>
              <p>
                Join us in the extraordinary journey of a reputed and all-India
                recognised premier publishing house.
              </p>
              {appointments.map((appointment) => (
                <div className="EximAppoBox">
                  <h6>{appointment.edition}</h6>
                  <p>{appointment.job_title}</p>
                </div>
              ))}

              <button
                className="viewResultbtn mb-0 mt-1"
                onClick={() => navigate("/appointments")}
              >
                View all appointments
              </button>
            </div>
          </div>
        </div>
        <div className="borderbg"></div>

        <div className="container">
          <div className="row mb-4">
            {/* Left Swiper */}
            {bottomLeftMedia.length > 0 && (
              <div className="col-md-6 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {bottomLeftMedia.map((media, index) => (
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
            {bottomRightMedia.length > 0 && (
              <div className="col-md-6 mt-2 mb-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }}>
                  {bottomRightMedia.map((media, index) => (
                    <SwiperSlide key={index}>
                      <a
                        title="View More"
                        onClick={() =>
                          handleAdClick(
                            {
                              company: media["company_name"],
                              id: media["name"],
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
    </>
  );
};

export default Home;

{
  /* <div className="container">
          <div className="row mb-4"> */
}
{
  /* Left Swiper */
}
{
  /* {topLeftMedia.length > 0 && (
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
            )} */
}

{
  /* Right Swiper */
}
{
  /* {topRightMedia.length > 0 && (
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
        </div> */
}
