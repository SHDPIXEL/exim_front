import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogdetailsimg from "../assets/images/blogdetails.jpg";
import { useParams } from "react-router-dom";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import dataFormatter from "../helper/DateFormatter";
import { useAds } from "../context/AdContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getActiveMedia from "../helper/GetActiveMedia";

const NewsDetails = () => {
  const { id } = useParams();
  const [newsDetails, setNewsDetails] = useState([]);
  const [recetnNews, setRecetnNews] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectedAds, handleAdClick } = useAds();

  const NewsDetailsAds = selectedAds?.find((ad) =>
    ad.selectedMedia.some((media) => media.position === "News_Details")
  );
  const NewsDetailsMedia = getActiveMedia(NewsDetailsAds);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await API.post(`/news/get_news/${id}`);

        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setNewsDetails(response.data.data[0]);
          setRecetnNews(response.data.recentNews);
          setTopHeadlines(response.data.topHeadlines);
        } else {
          console.error("No news details found");
        }
      } catch (error) {
        console.error("Error fetching news details:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchNewsDetails();
  }, [id]);

  const defaultImageUrls = [
    "https://eximindiaonline.in:4000/assets/default_category/shipping.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Trade.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Port.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Transport%20&%20logistics.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/indian%20economy.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Special%20Report.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Logistics.jpg",
    "https://eximindiaonline.in:4000/assets/default_category/Others.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/shipping.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Trade.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Port.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Transport%20&%20logistics.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/indian%20economy.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Special%20Report.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Logistics.jpg",
    "https://eximindiaonline.in:4000/assets/default_images/Others.jpg",
  ];

  const shouldShowImage =
    newsDetails.image && !defaultImageUrls.includes(newsDetails.image);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5 mb-5 ">
      <div className="row">
        <div className="col-xxl-9 col-lg-9 blog-details">
          <div className="th-blog blog-single">
            <Link to="#" className="categorybtn">
              {newsDetails.category_name}
            </Link>
            {/* <h2 className="blog-title">{newsDetails.headline}</h2> */}
            <div className="blog-meta" style={{ marginTop: "10px" }}>
              <Link to="/#">
                <i className="far fa-calendar-days"></i>
                {dataFormatter(newsDetails.date)}
              </Link>
            </div>
            {shouldShowImage && (
              <div className="blog-img">
                <img
                  src={newsDetails.image}
                  style={{ aspectRatio: "3 / 2", objectFit: "cover" }}
                  alt="Blog"
                  width={"100%"}
                />
              </div>
            )}

            <div className="blog-content-wrap">
              <div className="blog-content">
                <div className="content">
                  <div className="blog-content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: newsDetails.description,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="blog-navigation mt-3">
                        <div className="nav-btn prev">
                            <div className="img"><img src={banner2} alt="blog img" className="nav-img" /></div>
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Global trade reaching a record in 2024 presents... </Link></h5><Link to="/#" className="nav-text"><i className="fas fa-arrow-left me-2"></i>Prev</Link></div>
                        </div>
                        <div className="divider"></div>
                        <div className="nav-btn next">
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Minister launches policy for  movement...</Link></h5><Link to="/#" className="nav-text">Next<i className="fas fa-arrow-right ms-2"></i></Link></div>
                            <div className="img"><img src={banner3} alt="blog img" className="nav-img" /></div>
                        </div>
                    </div> */}
        </div>
        <div className="col-lg-3">
          <div className="mb-3">
            <div className="col-md-12 mb-3">
              <div className="webTittle">
                <i className="bi bi-chevron-right"></i> Recent News
              </div>
            </div>
            {recetnNews.map((item) => (
              <div
                key={item._id}
                className="righttopStory topleftimgcard SiderecentPost"
                onClick={() => navigate(`/newsDetails/${item._id}`)}
                style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
              >
                <div
                  className="imgside"
                  style={{
                    width: "150px",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image || "https://placehold.co/600x400"}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="textside" style={{ flex: 1 }}>
                  <div className="categorybtn">{item.category_name}</div>
                  <h4 style={{ margin: "5" }}>{item.headline}</h4>
                  <p>{dataFormatter(item.date)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mb-4 mt-4">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Popular Tags</div>
                        </div>
                        <div className="tagcloud"><Link to="/#">Trade</Link>  <Link to="/#">Shipping</Link><Link to="/#">Exports</Link> <Link to="/#">Special Reports</Link><Link to="/#">Indian Economy </Link> <Link to="/#">Tarnsport & logistic</Link><Link to="/#">Port</Link></div>
                    </div> */}

          {/* <img src={adsleftbannerimg} alt="hu" className="w-100" style={{ height: "348px" }} /> */}

          {NewsDetailsMedia.length > 0 ? (
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true}>
              {NewsDetailsMedia.map((media, index) => (
                <SwiperSlide key={index}>
                  <a
                    title="View More"
                    onClick={() =>
                      handleAdClick("NewDetails Right" + media.name, media.url)
                    }
                    className="cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.src}
                        alt="Advertisement"
                        className="w-100 ad-image-between"
                        style={{ height: "348px" }}
                      />
                    ) : (
                      <video
                        style={{ height: "348px" }}
                        controls={false}
                        autoPlay
                        loop
                        muted
                        className="w-100 ad-image-between"
                      >
                        <source src={media.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            ""
          )}

          <div className="mt-4">
            <div className="HeadlineList">
              <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4">
                <i className="bi bi-fire me-2"></i> Top Headlines
              </div>
              <ul>
                {topHeadlines.map((headlineItem, index) => (
                  <li key={index}>
                    <div
                      className="Headlinesingle"
                      onClick={() =>
                        navigate(`/newsDetails/${headlineItem._id}`)
                      }
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
    </div>
  );
};
export default NewsDetails;
