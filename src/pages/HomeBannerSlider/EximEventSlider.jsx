import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../../api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import dataFormatter from "../../helper/DateFormatter";

const EximEventsSlider = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.post("/events/get_home_events");
        console.log(response.data.data);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error in fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div className="col-md-10 mb-3">
        <div className="webTittle">
          <i className="bi bi-chevron-right"></i> EXIM Events
        </div>
      </div>
      <div className="col-md-2 mb-3 ">
        <div className="swiperbtn d-flex justify-content-end">
          <button className="custom-prev">
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <button className="custom-next">
            <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 mt-3">
        <Swiper
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            400: { slidesPerView: 1, spaceBetween: 10 },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, Navigation, FreeMode]}
          className="mySwiper"
        >
          {/* onClick={() => navigate("https://ctl.net.in/ctl-bhp-2025-default.aspx")} */}
          {events.map((event) => (
            <SwiperSlide key={events._id} role="button">
              {/* <div className="homeeventBox">
                                <img src={events.imgUrl} alt="eventsimg" className="w-100" />
                            </div> */}
              <div className="EventBox">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="EventBox-img-container d-block"
                >
                  <img src={event.image} alt={event.name} className="w-100" />
                </a>
                <div className="Event-content upcoming">
                  <h4>{event.name}</h4>
                  <h6>
                        {dataFormatter(event.date)}
                        {event.date_two && `, ${dataFormatter(event.date_two)}`}
                        {event.date_three && `, ${dataFormatter(event.date_three)}`}
                      </h6>
                  <p>{event.venue}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default EximEventsSlider;
