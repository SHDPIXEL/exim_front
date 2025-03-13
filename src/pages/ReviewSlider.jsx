import React from "react";
import arrowupimg from '../assets/images/arrow-right-Up-fil.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

// Sample Reviews Data
const reviews = [
    {
        name: "Mr. Xerrxes P. Master",
        rating: 5,
        title: "Joint Managing Director,Master Marine Service Pvt . Ltd.",
        details: "My compliments for kick dtsrting the post pandemic events with a bang. i wish you all the very best in your future endeavours."
    },
    {
        name: "Mr. Nityam Khosla",
        rating: 5,
        title: "Director Teamglobal Logiistics Pvt Ltd",
        details: "The event was very organised and immaculate as always."
    },
    {
        name: "Mr. Xerrxes P. Master",
        rating: 5,
        title: "Joint Managing Director,Master Marine Service Pvt . Ltd.",
        details: "My compliments for kick dtsrting the post pandemic events with a bang. i wish you all the very best in your future endeavours."
    },
    {
        name: "Mr. Nityam Khosla",
        rating: 5,
        title: "Director Teamglobal Logiistics Pvt Ltd",
        details: "The event was very organised and immaculate as always."
    },
];

const ReviewSlider = () => {

    // Function to Render Stars
    const renderStars = (count) => {
        return Array.from({ length: count }, (_, index) => (
            <i key={index} className="bi bi-star-fill"></i>
        ));
    };

    return (
        <section className='py-3 ReviewsSection'>
            <div className='row mx-0 text-center ReviewTittle'>
                <h5>Customers Reviews</h5>
                <h4>See What Our Clients Say About Us</h4>
            </div>

            <div className="row mt-5 justify-content-center">
                <div className="col-lg-12 col-md-8">
               
                    <div className='customerReview m-0'>
                        <Swiper
                            freeMode={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            breakpoints={{
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                                768: { slidesPerView: 2, spaceBetween: 20 },
                                400: { slidesPerView: 1, spaceBetween: 10 },
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className="mySwiper"
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div className='reviewbox text-center'>
                                    <h4 >{review.name}</h4>
                                       
                                       <p className='namereview mb-1'>{review.title}</p>
                                       <p className='starReview '>{renderStars(review.rating)}</p>
                                        <p>" {review.details}"</p>
                                       
                                       
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className='d-flex mt-3 swiperbtn justify-content-center mb-3'>
                            <button className="custom-prev" aria-label="Previous Slide">
                                <i className="bi bi-arrow-left-short"></i>
                            </button>
                            <button className="custom-next" aria-label="Next Slide">
                                <i className="bi bi-arrow-right-short"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSlider;
