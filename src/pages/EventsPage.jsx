import React, { useState, useEffect } from "react";
import eventimg4 from "../assets/images/eventnew.jpg";
import { Form } from "react-bootstrap";
import API from "../api";
import dataFormatter from "../helper/DateFormatter";

const EventsPage = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [options, setOptions] = useState([]);

  const createOption = async () => {
    const optionResponse = await API.post(
      "/event_categories/get_event_categories_website"
    );
    setOptions(optionResponse.data.data);
  };
  // Fetch Events Function
  const fetchEvents = async (type, pageNumber) => {
    if (pageNumber > totalPages && totalPages !== 0) return;

    setLoading(true);
    setError(null);
    try {
      const response = await API.post("/events/get_events_website", {
        page: pageNumber,
        name: type || null, // Send null if no filter is applied
      });

      console.log("Events Page:", response.data.data);

      const eventsData = response.data.data || [];

      const current = eventsData.current || [];
      const upcoming = eventsData.upcoming || [];
      const past = eventsData.past || [];

      if (pageNumber === 1) {
        setCurrentEvents(current);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } else {
        setCurrentEvents((prev) => [...prev, ...current]);
        setUpcomingEvents((prev) => [...prev, ...upcoming]);
        setPastEvents((prev) => [...prev, ...past]);
      }
      setPage(pageNumber);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching events", error);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on page load and when event type changes
  useEffect(() => {
    async function init() {
      await createOption();
      setPage(1); // Reset page to 1 when event type changes
      fetchEvents(selectedEventType, 1);
    }
    init();
  }, [selectedEventType]);

  // Fetch more events when "View More" is clicked
  const handleViewMore = () => {
    if (page < totalPages) {
      fetchEvents(selectedEventType, page + 1);
    }
  };

 return (
  <>
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Events Heading */}
      <div className="row events-heading align-items-center">
        <div className="col-md-12 mb-2">
          <h2 className="text-center fw-bold">Exim Events</h2>
        </div>
        <div className="col-md-12 mb-5 w-100">
          <Form.Select
            aria-label="Select Event"
            className="webinput w-25 float-end"
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
          >
            <option value="">All Events</option>
            {options.map((option) => (
              <option key={option._id} value={option.category}>
                {option.category}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Current Events */}
      <div className="row align-items-center">
        {Array.isArray(currentEvents) && currentEvents.length > 0 ? (
          <>
            <div className="col-md-12 mb-3">
              <div className="webTittle">
                <i className="bi bi-chevron-right"></i> Current Events
              </div>
            </div>
            {currentEvents.map((event) => (
              <div className="col-md-3 col-6 mb-3" key={event._id}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="EventBox">
                    <img
                      src={event.image || eventimg4}
                      alt={event.name}
                      style={{
                        aspectRatio: 2,
                        objectFit: "cover",
                      }}
                      className="w-100"
                    />
                    <div className="Event-content">
                      <h4>{event.name}</h4>
                      <h6>
                        {dataFormatter(event.date)}
                        {event.date_two && `, ${dataFormatter(event.date_two)}`}
                        {event.date_three &&
                          `, ${dataFormatter(event.date_three)}`}
                      </h6>
                      <p>{event.venue}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </>
        ) : (
          <div className="col-md-12 mb-3 text-center">
            <h5>No events found in this category.</h5>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="row my-5 align-items-center">
          <div className="col-12 mb-3">
            <div className="webTittle">
              <i className="bi bi-chevron-right"></i> Upcoming Events
            </div>
          </div>
          {upcomingEvents.map((event) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              key={event._id}
            >
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="EventBox">
                  <img
                    src={event.image || eventimg4}
                    alt={event.name}
                    style={{
                      aspectRatio: 2,
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                    className="w-100"
                  />
                  <div className="Event-content upcoming">
                    <h4>{event.name}</h4>
                    <h6>{dataFormatter(event.date)}</h6>
                    <p>{event.venue}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Past Events */}
      <div className="mb-5">
        {pastEvents && pastEvents.length > 0 ? (
          <>
            <div className="row align-items-center">
              <div className="col-md-12 mb-3">
                <div className="webTittle">
                  <i className="bi bi-chevron-right"></i> Past Events
                </div>
              </div>
            </div>
            <div className="row">
              {pastEvents.map((event) => (
                <div className="col-md-3 col-6 mb-3" key={event._id}>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="EventBox">
                      <img
                        src={event.image || eventimg4}
                        style={{
                          aspectRatio: 2,
                          objectFit: "cover",
                        }}
                        alt={event.name}
                        className="w-100"
                      />
                      <div className="Event-content">
                        <h4>{event.name}</h4>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center py-5">No Event Found</p>
        )}
      </div>

      {/* View More Button */}
      {page < totalPages && (
        <div className="row mt-4">
          <div className="col-12 text-center">
            <button
              className="dailySubscribebtn mx-auto p-2"
              style={{ width: "200px" }}
              onClick={handleViewMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        </div>
      )}
    </div>
  </>
);

export default EventsPage;
