
import React, { useEffect, useState } from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import adsleftbannerimg from "../assets/images/topleftads.png";
import DatePicker from 'react-datepicker';
import banner4 from "../assets/images/banner7.png";
import { Link, useNavigate } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import API from '../api';
import { useAds } from "../context/AdContext";


const News = () => {

    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [repeatedNews, setRepeatedNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [headlines, SetHeadlines] = useState([]);
    const { ads } = useAds();


    const getActiveMedia = (ad) => {
        if (ad?.status === "Active") {
            const activeImage = ad.images?.find(image => image.status === "Active");
            if (activeImage) {
                return { type: "image", src: activeImage.filePath };
            }

            const activeVideo = ad.videos?.find(video => video.status === "Active");
            if (activeVideo) {
                return { type: "video", src: activeVideo.filePath };
            }
        }
        return null;
    };


    const bottomRightAd = ads?.find(ad => ad.position === "EximNews_Bottom_Right");
    const bottomLeftAd = ads?.find(ad => ad.position === "EximNews_Bottom_Left");

    const bottomRightMedia = getActiveMedia(bottomLeftAd);
    const bottomLeftMedia = getActiveMedia(bottomLeftAd);




    // const { headlines } = location.state || {};

    const handleSearch = () => {
        console.log("Search Term:", searchTerm);
        // Add your search logic here
    };

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await API.post("/news/get_news_recent");
                const data = response.data.data;
                SetHeadlines(data.slice(11));
            } catch (error) {
                console.error("Error in fetching Headlines", error);
            }
        };
        fetchHeadlines();
    }, []);


    const fetchNews = async (pageNumber) => {
        if (pageNumber > totalPages && totalPages !== 0) return;

        setLoading(true);
        try {
            const response = await API.post(`/news/get_news_pagination`, {
                page: pageNumber
            });
            setRepeatedNews((prev) => {
                if (pageNumber === 1) {
                    return response.data.data;
                }
                return [...prev, ...response.data.data];
            });
            setPage(pageNumber);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchNews(1);
    }, []);

    const handleViewMore = () => {
        if (page < totalPages) {
            fetchNews(page + 1);
        }
    };


    return (
        <div className='container mt-3'>
            <div className="row mb-4">

                <div className='col-md-9'>

                    <div className="row mb-4">
                        <div className="col-md-12 mt-4 mb-2">
                            <h2 className='text-center mb-3 fw-bold'>News</h2>
                        </div>
                        <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white">
                            <div className="row align-items-center ">
                                <div className="col-md-2 mb-1">
                                    <h5 className='fw-bold'>Pick a Date  -</h5>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="datepicker-container w-100">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            placeholderText="Select a date"
                                            dateFormat="DD/MM/YYYY"
                                            className="form-control webinput w-100 dateiconimg"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3 ">
                                    <div className="d-flex justify-content-center ">
                                        <InputGroup>

                                            <Form.Control
                                                type="text"
                                                placeholder="Search..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className='webinput border-end-0'
                                            />
                                            <InputGroup.Text className='bg-transparent border-dark border-start-0'>
                                                <i className="bi bi-search"></i> {/* Bootstrap Icon */}
                                            </InputGroup.Text>

                                        </InputGroup>
                                    </div>

                                </div>
                                <div className="col-md-2 mb-3 col-4">
                                    <button onClick={handleSearch} className='dailySubscribebtn mx-auto p-2'>Search</button>

                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className="col-md-12">
                                    {/* <h5 className='text-webColor fw-bolder mb-3'>Date : 10 Jan 2025</h5> */}
                                    {repeatedNews.map((item) => (
                                        <div className="righttopStory topleftimgcard newsArchive" key={item._id} onClick={() => navigate(`/newsDetails/${item._id}`)}>
                                            {item.imgUrl && <div className="imgside">
                                                <img src={item.imgUrl} width="" height="100%" alt={item.headline} />
                                            </div>}
                                            <div className="textside">
                                                <h4>{item.headline}</h4>
                                                <p>{new Date(item.date).toLocaleDateString(
                                                    "en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                }
                                                )}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className='dailySubscribebtn mx-auto p-2'
                                        style={{ width: "200px" }}
                                        onClick={handleViewMore}
                                        disabled={loading || page >= totalPages}
                                    >
                                        {loading ? "Loading..." : "View More"}
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-md-3' >

                    <div className="mt-5 p-3 pt-5 pb-1">
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
                    <div className="mb-4  p-3">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Popular Tags</div>
                        </div>
                        <div className="tagcloud"><Link to="/#">Trade</Link>  <Link to="/#">Shipping</Link><Link to="/#">Exports</Link> <Link to="/#">Special Reports</Link><Link to="/#">Indian Economy </Link> <Link to="/#">Tarnsport & logistic</Link><Link to="/#">Port</Link></div>

                    </div>

                </div>
            </div>

            <div className="borderbg"></div>

            <div className="row mb-4">
                {bottomRightMedia && (
                    <div className="col-md-6 mt-2 mb-2">
                        {bottomRightMedia.type === "image" ? (
                            <img
                                src={bottomRightMedia.src}
                                alt="Top Right Advertisement"
                                className="w-100 ad-image-top"
                            />
                        ) : (
                            <video controls={false} autoPlay muted className="w-100 ad-image-top">
                                <source src={bottomRightMedia.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                )}

                {bottomLeftMedia && (
                    <div className="col-md-6 my-2 mb-2">
                        {bottomLeftMedia.type === "image" ? (
                            <img
                                src={bottomLeftMedia.src}
                                alt="Top Left Advertisement"
                                className="w-100 ad-image-top"
                            />
                        ) : (
                            <video controls={false} autoPlay={true} muted className="w-100 ad-image-top">
                                <source src={bottomLeftMedia.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                )}
            </div>


        </div>


    )
}

export default News;