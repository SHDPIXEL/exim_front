import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TopBannerSlider from "./HomeBannerSlider/TopBannerSlider";
import TopStorySlider from "./HomeBannerSlider/TopStorySlider";
import Newsletter from "./Newsletter";
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import EximEventsSlider from "./HomeBannerSlider/EximEventSlider";
import homenewpaper from "../assets/images/homenewpaper.png";
import ads6 from "../assets/images/ads6.png";
import NewsFocus from "./HomeBannerSlider/NewsFocus";
import NewCategories from "./HomeBannerSlider/NewCategories";
import EximPolls from "./HomeBannerSlider/EximPolls";
import VideoGallery from "./HomeBannerSlider/VideoGallery";
import ads7 from "../assets/images/ads7.png";
import jobimg from "../assets/images/Job.svg"
import FacebookPost from "./HomeBannerSlider/FacebookPost";
import TwitterPost from "./HomeBannerSlider/TwitterPost";
import HomeAdvertise from "./HomeBannerSlider/HomeAdvertise";
import API from "../api";

const Home = () => {

    const navigate = useNavigate();
    const [headlines, SetHeadlines] = useState([]);
    const [TopNews, setTopNews] = useState([]);

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



    return (
        <>
            <div className='container  mt-3'>

                <div className="row mb-4">
                    <div className="col-md-6 mt-2 mb-2">
                        <img src={ads4} alt="adsv" className="w-100" />
                    </div>
                    <div className="col-md-6 my-2 mb-2">
                        <img src={ads5} alt="adsv" className="w-100" />
                    </div>
                </div>
                <div className="borderbg"></div>
                <div className="row mb-4 mt-4">
                    <div className="col-lg-9">
                        <TopBannerSlider topNews={TopNews} headlines={headlines} />

                    </div>
                    <div className="col-lg-3">
                        <HomeAdvertise />

                        <div className="mt-4">
                            <div className="HeadlineList">
                                <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4"><i className="bi bi-fire me-2"></i> Top Headlines</div>
                                <ul>
                                    {
                                        headlines.map((headlineItem, index) => (
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
                <div className="borderbg"></div>
                <div className="row mt-4">
                    <div className="col-md-12 mb-3">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Top Stories</div>
                    </div>
                    <div className="col-md-9">
                        <TopStorySlider />
                    </div>
                    <div className="col-md-3 mb-4">
                        <Newsletter />
                    </div>
                </div>
                <div className="borderbg"></div>
                <div className="row">
                    <div className="col-md-6 my-4">
                        <img src={ads4} alt="adsv" className="w-100" />
                    </div>
                    <div className="col-md-6 my-4">
                        <img src={ads5} alt="adsv" className="w-100" />
                    </div>
                </div>
                <div className="borderbg"></div>

                <div className="row my-4 ">
                    <EximEventsSlider />
                </div>

                <div className="borderbg"></div>
                <div className="row my-4">
                    <div className="col-md-12 mb-4">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Subscribe to EXIM India Digital Copy</div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="newspaper-container" role="button" onClick={() => navigate("/subscribePage")}>
                            <img src={homenewpaper} alt="home" className="w-100" />
                            <h4>EXIM India Digital Copy includes all latest news & insights coverage you need </h4>
                            <p>Our yearly charges to subscribe with EXIM India Digital Copy, that varies with costs as well as number of copies with respect to locations.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="homedailyEximbtn">
                            <ul>
                                <li><Link to="/subscribePage">Mumbai</Link></li>
                                <li><Link to="/subscribePage">Chennai</Link></li>
                                <li><Link to="/subscribePage">Gujarat</Link></li>
                                <li><Link to="/subscribePage">Kolkata</Link></li>
                                <li><Link to="/subscribePage">Delhi</Link></li>
                                <li><Link to="/subscribePage">Kochi</Link></li>
                                <li><Link to="/subscribePage">Tutikorin</Link></li>
                            </ul>
                            <button className="dailySubscribebtn" onClick={() => navigate("/subscribePage")}>Subscribe to EXIM India Digital Copy</button>
                        </div>
                    </div>
                    <div className="col-md-3  mb-3">
                        <img src={ads6} alt="adsnews" className="w-100 h-100" />
                    </div>

                </div>
                <div className="borderbg"></div>
                <div className="row my-4">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> News In Focus</div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <NewsFocus />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> Follow Us</div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="sociallinks">
                                    <Link to="https://www.facebook.com/people/Exim-India/100064039290498/" target="_blank"><div><i className="bi bi-facebook"></i> facebook </div><div>Like</div></Link>
                                    <Link to="https://x.com/Exim_India" target="_blank"><div><i className="bi bi-twitter-x"></i> twitter </div><div>Follow</div></Link>
                                    <Link to="https://www.youtube.com/" target="_blank"><div><i className="bi bi-youtube"></i> youtube</div><div>Subscribe</div></Link>
                                    <Link to="https://www.instagram.com/" target="_blank"><div><i className="bi bi-instagram"></i> instagram</div><div>Follow</div></Link>
                                    <Link to="https://in.linkedin.com/" target="_blank"><div><i className="bi bi-linkedin"></i> linkedin</div><div>Follow</div></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 ">

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> News Categories</div>
                            </div>
                            <NewCategories />
                        </div>

                    </div>
                    <div className="col-md-3 mb-4 ">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> EXIM Polls</div>
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
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> Video Gallery</div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <VideoGallery />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-5">

                        <img src={ads7} className="w-100 h-100 ps-2" alt="" />

                    </div>
                </div>
                <div className="borderbg"></div>
                <div className="row my-4">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> EXIM India on <i className="bi bi-facebook"></i> </div>
                                <h5 className="mt-3 mb-3">@Exim_India - a reputed and all-India recognised premier publishing house.</h5>
                                <div className="w-100">
                                    <FacebookPost />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="webTittle"><i className="bi bi-chevron-right"></i> EXIM India on <i className="bi bi-twitter-x"></i> </div>
                                <h5 className="mt-3 mb-3">@Exim_India - a reputed and all-India recognised premier publishing house.</h5>
                                <div className="w-100 ">
                                    <TwitterPost tweetUrl="https://twitter.com/TwitterDev/status/1524561551162716161" />

                                </div>
                            </div>
                            <div className="col-md-12 mb-3">

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="EximAppoBoxMain">
                            <img src={jobimg} alt="msg" />
                            <h4>EXIM Appointments</h4>
                            <p>Join us in the extraordinary journey of a reputed and all-India recognised premier publishing house.</p>
                            <div className="EximAppoBox">
                                <h6>Mumbai</h6>
                                <p>CUSTOMER SERVICE ( AIR & SEA IMPORTS )</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Chennai</h6>
                                <p>Senior Accounts Executive</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Gujarat</h6>
                                <p>Billing Executive</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Kolkata</h6>
                                <p>Marketing Manager</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Delhi</h6>
                                <p>Senior Sale Manager</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Kochi</h6>
                                <p>Branch Head - Sales</p>
                            </div>
                            <div className="EximAppoBox">
                                <h6>Tutikorin</h6>
                                <p>No appointments yet!</p>
                            </div>
                            <button className="viewResultbtn mb-0 mt-1" onClick={() => navigate("/appointments")}>View all appointments</button>
                        </div>
                    </div>
                </div>
                <div className="borderbg"></div>
                <div className="row mb-4">
                    <div className="col-md-6 mt-4 mb-2">
                        <img src={ads4} alt="adsv" className="w-100" />
                    </div>
                    <div className="col-md-6 my-4 mb-2">
                        <img src={ads5} alt="adsv" className="w-100" />
                    </div>
                </div>
            </div>



        </>
    )
}

export default Home;