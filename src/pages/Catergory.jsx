import React, { useState, useEffect } from 'react';
import ads4 from "../assets/images/ads4.png";
import ads5 from "../assets/images/ads5.png";
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import API from '../api';
import banner4 from "../assets/images/banner4.png";
import dataFormatter from '../helper/DateFormatter';
import { useLocation } from "react-router-dom";
import BottomAds from "../components/BottomAds";

const Category = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const categories = [
        { id: 1, name: "ShippingNews", title: "Shipping News" },
        { id: 2, name: "TradeNews", title: "Trade News" },
        { id: 3, name: "PortNews", title: "Port News" },
        { id: 4, name: "TransportNews", title: "Transport News" },
        { id: 5, name: "IndianEconomy", title: "Indian Economy" },
        { id: 6, name: "SpecialReport", title: "Special Report" },
        { id: 7, name: "International", title: "International" },
        { id: 8, name: "AviationcargoExpress", title: "Aviation cargo Express" }
    ];

    const [newsData, setNewsData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Fetch news by category (initial load or tab switch)
    const fetchNews = async (categoryId, pageNumber = 1) => {
        if (pageNumber > totalPages && totalPages !== 0) return;

        setLoading(true);
        try {
            const response = await API.post(`/news/get_news_by_category`, {
                categoryId: categoryId,
                page: pageNumber
            });
            setNewsData((prev) => {
                if (pageNumber === 1) return response.data.data;
                return [...prev, ...response.data.data];
            });
            setPage(pageNumber);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching news:', error);
            setNewsData([]);
        } finally {
            setLoading(false);
        }
    };

    // Search news with category, date, and term
    const handleSearch = async (categoryId, pageNumber = 1) => {
        if (!searchTerm && !selectedDate) {
            alert("Please select a date or enter a search term.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/news/get_search_news_categoryId", {
                categoryId: categoryId,
                date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
                query: searchTerm,
                page: pageNumber,
            });

            setNewsData((prev) => {
                if (pageNumber === 1) return response.data.data;
                return [...prev, ...response.data.data];
            });
            setPage(pageNumber);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error in finding your search:", error);
            setNewsData([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch for the first category
    useEffect(() => {
        const firstCategoryId = categories[0].id;
        fetchNews(firstCategoryId, 1);
    }, []);

    // Handle category tab change
    const handleCategoryChange = (categoryName) => {
        setActiveCategory(categoryName);
        const selectedCategory = categories.find(cat => cat.name === categoryName);
        setNewsData([]);
        setPage(1);
        setTotalPages(0);
        setSearchTerm(""); // Reset search term
        setSelectedDate(null); // Reset date
        fetchNews(selectedCategory.id, 1);
    };

    // Handle "View More" for both fetchNews and handleSearch
    const handleViewMore = () => {
        const selectedCategory = categories.find(cat => cat.name === activeCategory);
        if (page < totalPages) {
            if (searchTerm || selectedDate) {
                handleSearch(selectedCategory.id, page + 1);
            } else {
                fetchNews(selectedCategory.id, page + 1);
            }
        }
    };

    // Handle search button click
    const handleSearchClick = () => {
        const selectedCategory = categories.find(cat => cat.name === activeCategory);
        setNewsData([]);
        setPage(1);
        setTotalPages(0);
        handleSearch(selectedCategory.id, 1);
    };

    return (
        <div className='container mt-3'>
            <div className="row mb-4">
                <div className='col-md-12'>
                    <div className="row mb-4">
                        <div className="col-md-12 mt-4 mb-2">
                            <h2 className='text-center mb-3 fw-bold'>Categories</h2>
                        </div>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={activeCategory}
                            onSelect={handleCategoryChange}
                            className="mb-3"
                            variant="pills"
                        >
                            {categories.map(category => (
                                <Tab 
                                    key={category.id}
                                    eventKey={category.name} 
                                    title={category.title}
                                >
                                    <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 mb-1">
                                                <h5 className='fw-bold'>Pick a Date -</h5>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    placeholderText="Select a date"
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control webinput w-100 dateiconimg"
                                                />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className='webinput border-end-0'
                                                    />
                                                    <InputGroup.Text className='bg-transparent border-dark border-start-0'>
                                                        <i className="bi bi-search"></i>
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                            <div className="col-md-2 mb-3 col-4">
                                                <button 
                                                    className='dailySubscribebtn mx-auto p-2'
                                                    onClick={handleSearchClick}
                                                    disabled={loading}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>

                                        <div className='row mt-4'>
                                            <div className="col-md-12">
                                                {loading && page === 1 ? (
                                                    <div className="text-center">Loading news...</div>
                                                ) : newsData.length === 0 ? (
                                                    <div className="text-center">No news found</div>
                                                ) : (
                                                    newsData.map((item) => (
                                                        <div 
                                                            className="righttopStory topleftimgcard newsArchive" 
                                                            key={item.id} 
                                                            onClick={() => navigate(`/newsDetails/${item._id}`)}
                                                        >
                                                            {item.image && (
                                                                <div className="imgside">
                                                                    <img 
                                                                        src={item.image} 
                                                                        width="" 
                                                                        height="100%" 
                                                                        alt={item.headline} 
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="textside">
                                                                <h4>{item.headline}</h4>
                                                                <p>{dataFormatter(item.date)}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}

                                                {page < totalPages && (
                                                    <div className="col-12 text-center mt-4 mb-3">
                                                        <button 
                                                            className='dailySubscribebtn mx-auto p-2' 
                                                            style={{ width: "200px" }} 
                                                            onClick={handleViewMore}
                                                            disabled={loading}
                                                        >
                                                            {loading ? 'Loading...' : 'View More'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>

            <div className="borderbg"></div>
            <BottomAds leftPosition={"Category_Bottom_Left"} rightPosition={"Category_Bottom_Right"} />
        </div>
    );
};

export default Category;