import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogdetailsimg from "../assets/images/blogdetails.jpg";
import adsimg from "../assets/images/adsimg.gif";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import adsleftbannerimg from "../assets/images/topleftads.png";
import banner4 from "../assets/images/banner7.png";
import { useParams } from "react-router-dom";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import dataFormatter from "../helper/DateFormatter";


const NewsDetails = () => {

    const { id } = useParams();
    const [newsDetails, setNewsDetails] = useState([]);
    const [recetnNews, setRecetnNews] = useState([]);
    const [topHeadlines, setTopHeadlines] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                const response = await API.post(`/news/get_news/${id}`);

                if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                    setNewsDetails(response.data.data[0])
                    setRecetnNews(response.data.recentNews);
                    setTopHeadlines(response.data.topHeadlines);
                } else {
                    console.error("No news details found")
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


    if (loading) return <p>Loading...</p>;

    return (

        <div className='container mt-5 mb-5 '>
            <div className="row">
                <div className="col-xxl-9 col-lg-9 blog-details">
                    <div className="th-blog blog-single">
                        <Link to="/#" className="categorybtn" >{newsDetails.category_name}</Link>
                        <h2 className="blog-title">{newsDetails.headline}</h2>
                        <div className="blog-meta"><Link className="author" href="/"><i className="far fa-user"></i>By - Tnews</Link> <Link to="/#"><i className="far fa-calendar-days"></i>{dataFormatter(newsDetails.date)}</Link>

                        </div>
                        <div className="blog-img"><img src={blogdetailsimg} alt="Blog" width={"100%"} /></div>
                        <div className="blog-content-wrap">
                            <div className="share-links-wrap">
                                <div className="share-links"><span className="share-links-title">Share Post:</span>
                                    <div className="multi-social"><Link to="https://facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link> <Link to="https://twitter.com/" target="_blank"><i className="bi bi-twitter-x"></i></Link> <Link to="https://linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></Link>                    <Link to="https://pinterest.com/" target="_blank"><i className="fab fa-pinterest-p"></i></Link> <Link to="https://instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></div>
                                </div>
                            </div>
                            <div className="blog-content">
                                <div className="blog-info-wrap">
                                    <button className="blog-info print_btn">Print : <i className="fas fa-print"></i></button> <Link className="blog-info" href="mailto:">Email : <i className="fas fa-envelope"></i> </Link>
                                    <button className="blog-info ms-sm-auto">15k <i className="fas fa-thumbs-up"></i></button> <span className="blog-info">126k <i className="fas fa-eye"></i></span> <span className="blog-info">12k <i className="fas fa-share-nodes"></i></span></div>
                                <div className="content">
                                    <div className="blog-content">
                                        <p dangerouslySetInnerHTML={{ __html: newsDetails.description }}></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="blog-navigation mt-3">
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
                    </div>

                </div>
                <div className="col-lg-3">


                    <div className="mb-3">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Recent News</div>
                        </div>
                        {recetnNews.map((item) => (
                            <div
                                onClick={() => navigate(`/newsDetails/${item._id}`)}
                                className="righttopStory topleftimgcard SiderecentPost" key={item._id}>
                                <div className="imgside">
                                    <img src={banner4} width="" height="100%" alt={item.title} />
                                </div>
                                <div className="textside">
                                    <div className="categorybtn">{item.category_name}</div>
                                    <h4>{item.headline}</h4>
                                    <p>{dataFormatter(item.date)}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="mb-4 mt-4">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Popular Tags</div>
                        </div>
                        <div className="tagcloud"><Link to="/#">Trade</Link>  <Link to="/#">Shipping</Link><Link to="/#">Exports</Link> <Link to="/#">Special Reports</Link><Link to="/#">Indian Economy </Link> <Link to="/#">Tarnsport & logistic</Link><Link to="/#">Port</Link></div>

                    </div>
                    <img src={adsleftbannerimg} alt="hu" className="w-100" style={{ height: "348px" }} />
                    <div className="mt-4">
                        <div className="HeadlineList">
                            <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4"><i className="bi bi-fire me-2"></i> Top Headlines</div>
                            <ul>
                                {
                                    topHeadlines.map((headlineItem, index) => (
                                        <li key={index}>
                                            <div className="Headlinesingle" onClick={() => navigate(`/newsDetails/${headlineItem._id}`)}>
                                                <h3>{index + 1}</h3>
                                                <h5>{headlineItem.headline}</h5>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
export default NewsDetails