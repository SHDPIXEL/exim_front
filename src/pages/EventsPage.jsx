import React, { useState, useEffect } from 'react';
import eventimg4 from "../assets/images/eventnew.jpg";
import ReviewSlider from './ReviewSlider';
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

    const fetchEvents = async (pageNumber) => {
        if (pageNumber > totalPages && totalPages !== 0) return;

        setLoading(true);
        setError(null);
        try {
            const response = await API.post("/events/get_events_website", {
                page: pageNumber
            });
            const eventsData = response.data.data;

            const now = new Date();
            const current = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                const diffDays = (eventDate - now) / (1000 * 60 * 60 * 24);
                return diffDays >= 0 && diffDays <= 7 && event.status === "current"; // Within 7 days
            });
            const upcoming = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > now || event.status === "upcoming";
            });
            const past = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate < now && event.status !== "upcoming";
            });

            setCurrentEvents(prev => pageNumber === 1 ? current : [...prev, ...current]);
            setUpcomingEvents(prev => pageNumber === 1 ? upcoming : [...prev, ...upcoming]);
            setPastEvents(prev => pageNumber === 1 ? past : [...prev, ...past]);

            setPage(pageNumber);
            setTotalPages(Math.ceil(response.data.recordsTotal / eventsData.length));
        } catch (error) {
            console.error("Error in fetching events", error);
            setError("Failed to load events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(1);
    }, []);

    const handleViewMore = () => {
        if (page < totalPages) {
            fetchEvents(page + 1);
        }
    };

    const filteredPastEvents = selectedEventType
        ? pastEvents.filter(event => event.name.includes(selectedEventType))
        : pastEvents;

    return (
        <>
            <div className='container'>
                {error && <div className="alert alert-danger">{error}</div>}

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
                        ))}htto
                        <div className="borderbg"></div>

                    </div>
                )}


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

            <div className='container my-5'>
                {pastEvents.length > 0 && (
                    <>
                        <div className="row mt-5 align-items-center mb-3">
                            <div className="col-md-2 mb-1">
                                <h4>Past Events -</h4>
                            </div>
                            <div className="col-md-3 mb-1">
                                <Form.Select
                                    aria-label="Default select example"
                                    className='webinput'
                                    value={selectedEventType}
                                    onChange={(e) => setSelectedEventType(e.target.value)}
                                >
                                    <option value="">Select Events</option>
                                    <option value="ECMF">ECMF</option>
                                    <option value="MALA">MALA</option>
                                    <option value="Conquest">Conquest</option>
                                    <option value="Gujrat Junction">Gujrat Junction</option>
                                    <option value="SECC">SECC</option>
                                    <option value="GMH">GMH</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='row'>
                            {filteredPastEvents.map(event => (
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
                    </>
                )}

                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <button
                            className="dailySubscribebtn mx-auto p-2"
                            style={{ width: "200px" }}
                            onClick={handleViewMore}
                            disabled={loading || page >= totalPages}
                        >
                            {loading ? "Loading..." : "View More"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventsPage;