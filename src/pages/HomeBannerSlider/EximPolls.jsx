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
    const [email, setEmail] = useState({});
    const [resultMsg, setResultMsg] = useState({
        "message" : null,
        "status" : "danger"
    });
    
    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await API.post("/polls/get_poll_website");
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
        const activeMail = email[currentSlide];
        if (!activePoll || selectedAnswers[activePoll._id] === undefined) {
            showResultMsg({
                "message" : "Please select an option before submitting.",
                "status" : "warning"
            });
            //showNotification("Please select an option before submitting.", "warning");
            return;
        }

        if(!activeMail){
            showResultMsg({
                "message" : "Email is required.",
                "status" : "warning"
            });
            //showNotification("Email is required.", "warning");
            return;
        }

        const formattedResponse = {
            id: activePoll._id, // The poll ID
            optionIndex: selectedAnswers[activePoll._id], // The selected option index
            email: activeMail,
        };

        setIsSubmitting(true);

        try {
            const response = await API.post("/polls/submit_polls", formattedResponse);
            if (response.data.status === "error") {
                showResultMsg({
                    "message" : response.data.message,
                    "status" : "danger"
                });
               // showNotification(response.data.message, "danger");
            } else {
                // Extract the updated poll data from the response
                const updatedPoll = response.data.poll;

                // Update the pollResults state with the new data
                setPollResults((prevResults) => ({
                    ...prevResults,
                    [updatedPoll._id]: updatedPoll, // Replace only the submitted poll data
                }));

                showResultMsg({
                    "message" : "Your answer has been submitted!",
                    "status" : "success"
                });
               // showNotification("Your answer has been submitted!", "success");
            }

        } catch (error) {
            showResultMsg({
                "message" : "Failed to submit your answer. Try again later!",
                "status" : "danger"
            });
            //showNotification("Failed to submit your answer. Try again later!", "danger");
            console.error("Error submitting answers", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = (index, value) => {
        setEmail((prev) => ({
            ...prev,
            [index]: value
        }))
    }

    const showResultMsg = (arr) => {
        setResultMsg({ message: [arr.message],status: [arr.status] });
    
        // Auto-clear after 3 seconds
        setTimeout(() => {
            setResultMsg({ message: null, status: "danger" });
        }, 3000);
    };
    


    return (
        <div className="col-lg-12 col-md-12 mt-3">
            <div className="EximPollBox">
                <Form>
                    <Swiper
                        freeMode={false}
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
                        onSlideChange={(swiper) => {
                            SetCurrentSlide(swiper.activeIndex);
                            setResultMsg({ message: null, status: "danger" }); // clear previous result message
                        }}
                    >
                        {pollsData.map((pol, index) => {
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

                                    <Form.Group className="mt-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email[index] || ""}
                                            onChange={(e) => handleEmailChange(index, e.target.value)}
                                        />
                                    </Form.Group>
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
                    {isSubmitting ? 'Submitting' : 'View Results'}</button>

                    
                    {resultMsg.message && (
                    <div className={`alert alert-${resultMsg.status} mt-3`} role="alert">
                        {resultMsg.message}
                    </div>
                )}
                <div className='swiperbtn d-flex justify-content-center mt-4'>
                    <button className="Eximcustom-prev"><i className="bi bi-chevron-left"></i></button>
                    <button className="Eximcustom-next"><i className="bi bi-chevron-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default EximPolls;
