import React from 'react';
import eventimg4 from "../assets/images/eventnew.jpg";
import ReviewSlider from './ReviewSlider';
import { Form } from 'react-bootstrap';
const EventsPage = () => {
    return (
        <>
            <div className='container '>
                <div className='row my-5'>

                    <div className="col-md-12 mb-4">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Current Events</div>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="borderbg"></div>
                <div className='row my-5'>

                    <div className="col-md-12 mb-4">
                        <div className="webTittle"><i className="bi bi-chevron-right"></i> Upcoming Events</div>
                    </div>
                    <div className='col-md-3 mb-4'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content upcoming'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-4'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content upcoming'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-4'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content upcoming'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-4'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content upcoming'>
                                <h4>ECMF 2025</h4>
                                <h5> Fri 10th Jan,2025</h5>
                                <p>Nicco Parks & Resorts Ltd., Royal Courtyard,Kolkata, India</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='bg-light py-5'>
                <div className='container '>
                    <ReviewSlider />

                </div>
            </div> */}
            <div className='container my-5'>

                <div className="row mt-5 align-items-center mb-3">
                    <div className="col-md-2 mb-1">
                        <h4>Past Events -</h4>
                    </div>
                    <div className="col-md-3 mb-1">
                        <Form.Select aria-label="Default select example" className='webinput'>
                            <option>Select Events</option>
                            <option value="1">ECMF</option>
                            <option value="2">MALA</option>
                            <option value="3">Conquest</option>
                            <option value="1">Gujrat Junction</option>
                            <option value="2">SECC</option>
                            <option value="3">GMH</option>
                        </Form.Select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 col-6 mt-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2024</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 col-6 mt-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2023</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 col-6 mt-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2022</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 col-6 mt-3'>
                        <div className='EventBox'>
                            <img src={eventimg4} alt='' className='w-100' />
                            <div className='Event-content'>
                                <h4>ECMF 2021</h4>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </>
    )
}

export default EventsPage;