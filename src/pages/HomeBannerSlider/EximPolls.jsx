import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Button } from "react-bootstrap";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';


const EximPolls = (props) => {

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const ExmiPollSlider = [
        {
            id: 1,
            Ques: "Which logistical challenge poses the greatest hurdle for business?",
            Ans: [
                "Supply chain disruptions",
                "Last-mile delivery efficiency",
                "Attracting & retaining talent",
                "Transport cost and efficiency"
            ]
        },
        {
            id: 2,
            Ques: "What is the primary factor affecting supply chain efficiency?",
            Ans: [
                "Technological integration",
                "Workforce training",
                "Infrastructure development",
                "Cost management"
            ]
        },
        {
            id: 3,
            Ques: "Which market trend is impacting global trade the most?",
            Ans: [
                "Digital transformation",
                "E-commerce growth",
                "Trade regulations",
                "Environmental policies"
            ]
        },
        {
            id: 4,
            Ques: "What strategy helps mitigate supply chain disruptions?",
            Ans: [
                "Diversifying suppliers",
                "Increasing inventory",
                "Automating processes",
                "Building stronger partnerships"
            ]
        }
    ];

    // Handle Answer Selection
    const handleChange = (questionId, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer
        });
    };

    const handleSubmit = () => {
        console.log("Selected Answers:", selectedAnswers);
        alert("Responses Submitted!");
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
                        {ExmiPollSlider.map((pol) => (
                            <SwiperSlide key={pol.id}>
                                <div className="p-2">
                                    <p><strong>{pol.Ques}</strong></p>
                                    <div className="answer-box">
                                        {pol.Ans.map((answer, index) => (
                                            <Form.Check
                                                key={index}
                                                type="radio"
                                                label={answer}
                                                name={`question-${pol.id}`}
                                                id={`q${pol.id}-a${index}`}
                                                value={answer}
                                                className="pollredioinput"
                                                checked={selectedAnswers[pol.id] === answer}
                                                onChange={() => handleChange(pol.id, answer)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
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
