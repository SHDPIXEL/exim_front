import React, { useState, useEffect } from 'react';
import eventimg4 from "../assets/images/eventnew.jpg";
import { Form } from 'react-bootstrap';
import API from '../api';

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
        const optionResponse = await API.post("/event_categories/get_event_categories_website");
        console.log(optionResponse.data.data);
        setOptions(optionResponse.data.data);
    }
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

            const eventsData = response.data.data || [];
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            const current = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return (eventDate - now) / (1000 * 60 * 60 * 24) >= 0 && (eventDate - now) / (1000 * 60 * 60 * 24) <= 7;
            });

            const upcoming = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate > now;
            });

            const past = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate < now;
            });

            if (pageNumber === 1) {
                setCurrentEvents(current);
                setUpcomingEvents(upcoming);
                setPastEvents(past);
            } else {
                setCurrentEvents(prev => [...prev, ...current]);
                setUpcomingEvents(prev => [...prev, ...upcoming]);
                setPastEvents(prev => [...prev, ...past]);
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
            <div className='container'>
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Current Events */}
                {currentEvents.length > 0 && (
                    <div className='row my-5'>
                        <div className="col-md-12 mb-4">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i> Current Events</div>
                        </div>
                        {currentEvents.map(event => (
                            <div className='col-md-4 mb-3' key={event._id}>
                                <div className='EventBox'>
                                    <img src={event.image || eventimg4} alt={event.name} className='w-100' />
                                    <div className='Event-content'>
                                        <h4>{event.name}</h4>
                                        <h5>{new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</h5>
                                        <p>{event.venue}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <div className='row my-5'>
                        <div className="col-md-12 mb-4">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i> Upcoming Events</div>
                        </div>
                        {upcomingEvents.map(event => (
                            <div className='col-md-3 mb-4' key={event._id}>
                                <div className='EventBox'>
                                    <img src={event.image || eventimg4} alt={event.name} className='w-100' />
                                    <div className='Event-content upcoming'>
                                        <h4>{event.name}</h4>
                                        <h5>{new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</h5>
                                        <p>{event.venue}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Events */}
            <div className='container my-5'>

                <>
                    <div className="row mt-5 align-items-center mb-3">
                        <div className="col-md-2 mb-1">
                            <h4>Past Events -</h4>
                        </div>
                        <div className="col-md-3 mb-1">
                            <Form.Select
                                aria-label="Select Event"
                                className='webinput'
                                value={selectedEventType}
                                onChange={(e) => setSelectedEventType(e.target.value)}
                            >
                                <option value="">All Events</option>
                                {options.map(option => (
                                    <option key={option._id} value={option.category}>{option.category}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>

                    {pastEvents.length > 0 ? (
                        <div className='row'>
                            {pastEvents.map(event => (
                                <div className='col-md-3 col-6 mt-3' key={event._id}>
                                    <div className='EventBox'>
                                        <img src={event.image || eventimg4} alt={event.name} className='w-100' />
                                        <div className='Event-content'>
                                            <h4>{event.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Event Found</p>
                    )}
                </>

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
};

export default EventsPage;
