import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Button } from "react-bootstrap";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import API from "../../api";
import { useNotification } from "../../context/NotificationContext";


const EximPolls = (props) => {

    const { showNotification } = useNotification();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [pollsData, setPollsData] = useState([]);
    const [pollResults, setPollResults] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentSlide, SetCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await API.post("/polls/get_poll");
                setPollsData(response.data.polls);
            } catch (error) {
                console.error("Error in fetching polls", error)
            }
        }
        fetchPolls();
    }, [])

    const handleChange = (questionId, optionIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex, // Store selected option index for each question
        }));
    };
    

    const handleSubmit = async () => {
        const activePoll = pollsData[currentSlide]; // Get the active poll based on the current slide index
    
        if (!activePoll || selectedAnswers[activePoll._id] === undefined) {
            showNotification("Please select an option before submitting.", "warning");
            return;
        }
    
        const formattedResponse = {
            id: activePoll._id, // The poll ID
            optionIndex: selectedAnswers[activePoll._id], // The selected option index
        };
    
        setIsSubmitting(true);
    
        try {
            const response = await API.post("/polls/submit_polls", formattedResponse);
    
            // Extract the updated poll data from the response
            const updatedPoll = response.data.poll;

            // Update the pollResults state with the new data
            setPollResults((prevResults) => ({
                ...prevResults,
                [updatedPoll._id]: updatedPoll, // Replace only the submitted poll data
            }));

            showNotification("Your answer has been submitted!", "success");
    
        } catch (error) {
            showNotification("Failed to submit your answer. Try again later!", "danger");
            console.error("Error submitting answers", error);
        } finally {
            setIsSubmitting(false);
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
                        onSlideChange={(Swiper) => {SetCurrentSlide(Swiper.activeIndex)}}
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
                                                                <span className="vote-count d-none">{percentage.toFixed(2)} %</span>
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
                <button 
                    className="viewResultbtn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, pointerEvents: isSubmitting ? "none" : "auto" }}>
                        {isSubmitting ? 'Submitting' : 'View Results' }</button>
                <div className='swiperbtn d-flex justify-content-center mt-4'>
                    <button className="Eximcustom-prev"><i className="bi bi-chevron-left"></i></button>
                    <button className="Eximcustom-next"><i className="bi bi-chevron-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default EximPolls;
