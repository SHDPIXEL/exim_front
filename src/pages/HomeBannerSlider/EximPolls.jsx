import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Button } from "react-bootstrap";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import API from "../../api";


const EximPolls = (props) => {

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [pollsData, setPollsData] = useState([]);
    const [pollResults, setPollResults] = useState({});

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await API.post("/polls/get_poll");
                setPollsData(response.data);

            } catch (error) {
                console.error("Error in fetching polls", error)
            }
        }
        fetchPolls();
    }, [])

    const handleChange = (questionId, optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: optionIndex,
        });
    };



    const handleSubmit = async () => {
        if (Object.keys(selectedAnswers).length === 0) {
            alert("Please select at least one option before submitting.");
            return;
        }
    
        const formattedResponses = Object.entries(selectedAnswers).map(([questionId, optionIndex]) => ({
            id: questionId,
            optionIndex: optionIndex
        }));
    
        try {
            const response = await API.post("/polls/submit_polls", { responses: formattedResponses });
            alert("Responses Submitted!");
            
            // Store poll results for displaying vote counts
            const resultsData = response.data.polls.reduce((acc, poll) => {
                acc[poll._id] = poll;
                return acc;
            }, {});
            setPollResults(resultsData);
    
        } catch (error) {
            console.error("Error submitting answers", error);
            alert("Error submitting answers");
        }
    };
    

    return (
        <div className="col-lg-12 col-md-12 mt-3">
            <div className="EximPollBox">
                <Form>
                    <Swiper
                        freeMode={false}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: false,
                        // }}
                        autoplay={false}
                        breakpoints={{
                            1024: { slidesPerView: 1, spaceBetween: 0 },
                            768: { slidesPerView: 1, spaceBetween: 0 },
                            400: { slidesPerView: 1, spaceBetween: 0 },
                        }}
                        navigation={{
                            nextEl: ".Eximcustom-next",
                            prevEl: ".Eximcustom-prev",
                        }}
                        modules={[Autoplay, Navigation, FreeMode]}
                        className="mySwiper"
                    >
                        {pollsData.map((pol) => {
                            const pollResult = pollResults[pol._id]; // Get result data if available
                            const totalVotes = pollResult ? pollResult.totalVotes : 0;

                            return (
                                <SwiperSlide key={pol._id}>
                                    <div className="p-2">
                                        <p><strong>{pol.question}</strong></p>
                                        <div className="answer-box">
                                            {pol.options.map((option, index) => {
                                                const votes = pollResult ? pollResult.options[index].votes : 0;
                                                const percentage = totalVotes ? (votes / totalVotes) * 100 : 0;

                                                return (
                                                    <div key={option._id} className="option-container">
                                                        <Form.Check
                                                            type="radio"
                                                            label={option.text}
                                                            name={`question-${pol._id}`}
                                                            id={`q${pol._id}-a${index}`}
                                                            value={index}
                                                            className="pollredioinput"
                                                            checked={selectedAnswers[pol._id] === index}
                                                            onChange={() => handleChange(pol._id, index)}
                                                        />

                                                        {/* Show vote count and bar only if results are available */}
                                                        {pollResult && (
                                                            <div className="vote-bar-container">
                                                                <div className="vote-bar" style={{ width: `${percentage}%` }}></div>
                                                                <span className="vote-count">{votes} votes</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>
                </Form>
                <button className="viewResultbtn" onClick={handleSubmit}>View Results</button>
                <div className='swiperbtn d-flex justify-content-center mt-4'>
                    <button className="Eximcustom-prev"><i className="bi bi-chevron-left"></i></button>
                    <button className="Eximcustom-next"><i className="bi bi-chevron-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default EximPolls;
