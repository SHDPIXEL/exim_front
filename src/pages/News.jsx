import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import API from "../api";
import BottomAds from "../components/BottomAds";
import dataFormatter from "../helper/DateFormatter";
import { FaInfoCircle } from "react-icons/fa"; // If you want to use react-icons

const News = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [repeatedNews, setRepeatedNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [headlines, SetHeadlines] = useState([]);

  // Fetch Top Headlines
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await API.post("/news/get_news_recent");
        const data = response.data.data;
        SetHeadlines(data.slice(0, 10));
      } catch (error) {
        console.error("Error in fetching Headlines", error);
      }
    };
    fetchHeadlines();
  }, []);

  // Fetch Paginated News
  const fetchNews = async (pageNumber = 1) => {
    if (pageNumber > totalPages && totalPages !== 0) return;

    setLoading(true);
    try {
      const response = await API.post(`/news/get_news_pagination`, {
        page: pageNumber,
      });

      setRepeatedNews((prev) =>
        pageNumber === 1 ? response.data.data : [...prev, ...response.data.data]
      );
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

  // Search Function with Pagination
  const handleSearch = async (pageNumber = 1) => {
    if (!searchTerm && !selectedDate) {
      return;
    }

    setLoading(true);
    try {
      const adjustedDate = selectedDate
        ? new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
          )
        : null;
      const response = await API.post("/news/search", {
        date: adjustedDate ? adjustedDate.toISOString().split("T")[0] : null,
        query: searchTerm,
        page: pageNumber,
      });

      if (pageNumber === 1) {
        setRepeatedNews(response.data.data);
      } else {
        setRepeatedNews((prev) => [...prev, ...response.data.data]);
      }

      setPage(pageNumber);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error in finding your search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMoreSearch = () => {
    if (page < totalPages) {
      handleSearch(page + 1);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row mb-4">
        <div className="col-md-9">
          <h2 className="text-center mb-3 fw-bold">News</h2>

          <div className="shadow-sm p-4 pb-2 border rounded-3 bg-white mb-4">
            <div className="row align-items-center">
              <div className="col-md-2 mb-1">
                <h5 className="fw-bold">Pick a Date -</h5>
              </div>

              <div className="col-md-3 mb-3">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  className="form-control webinput"
                />
              </div>

              <div className="col-auto mb-3 text-center">
                <span
                  className="fw-bold"
                  style={{ textDecoration: "underline", fontSize: "12px" }}
                >
                  OR
                </span>
              </div>

              <div className="col-md-3 mb-3 position-relative">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="webinput"
                  />
                  <InputGroup.Text className="bg-transparent border-dark">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                </InputGroup>

                {/* Responsive info text */}
                <div
                  className="d-none d-md-flex position-absolute start-0 small text-muted mt-1"
                  style={{}}
                >
                  <i className="bi bi-info-circle me-1"></i>
                  To get proper search results, please enter at least 2 words.
                </div>

                {/* Mobile version (stacked naturally below input) */}
                <div className="d-flex d-md-none mt-1 small text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  To get proper search results, please enter at least 2 words.
                </div>
              </div>

              <div className="col-md-2 mb-3">
                <button
                  onClick={() => handleSearch(1)}
                  className="dailySubscribebtn p-2"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-4">
              {repeatedNews.map((item) => (
                <div
                  key={item._id}
                  className="righttopStory topleftimgcard newsArchive"
                  onClick={() => navigate(`/newsDetails/${item._id}`)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(`/newsDetails/${item._id}`, "_blank");
                  }}
                >
                  {/* {item.image && (
                                        <div className="imgside">
                                            <img src={item.image} alt={item.headline} />
                                        </div>
                                    )} */}
                  <div className="textside">
                    <span className="categorybtn_1 mb-1">
                      {item.category_name}
                    </span>
                    <h4>{item.headline}</h4>
                    <p>{dataFormatter(item.date)}</p>
                  </div>
                </div>
              ))}

              {loading && <p>Loading...</p>}
              {page < totalPages && (
                <button
                  className="dailySubscribebtn mx-auto p-2"
                  style={{ width: "200px" }}
                  onClick={
                    searchTerm || selectedDate
                      ? handleViewMoreSearch
                      : handleViewMore
                  }
                  disabled={loading}
                >
                  View More
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mt-5 p-3 pt-5 pb-1 HeadlineList">
            {/* <h4>Top Headlines</h4> */}
            <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4">
              <i className="bi bi-fire me-2"></i> Top Headlines
            </div>
            <ul>
              {headlines.map((headlineItem, index) => (
                <li key={index}>
                  <div
                    className="Headlinesingle"
                    onClick={() => navigate(`/newsDetails/${headlineItem._id}`)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(`/newsDetails/${headlineItem._id}`, "_blank");
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
      <BottomAds
        leftPosition="News_Bottom_Left"
        rightPosition="News_Bottom_Right"
      />
    </div>
  );
};

export default News;
