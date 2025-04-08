import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import contact_1 from "../assets/images/contact_1_1.svg";
import contact_2 from "../assets/images/contact_1_2.svg";
import contact_3 from "../assets/images/contact_1_3.svg";
import API from "../api";
import { useNotification } from '../context/NotificationContext';

const ContactPage = () => {

    const { showNotification } = useNotification();
    const [btnText, setBtnText] = useState('Submit Now');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        message: ''
      });
      


      const submitForm = async () => {
        setBtnText('Submitting');
        try {
          const response = await API.post('/services/send-contact-message', formData);
          showNotification('Form submitted successfully', 'success');
        } catch (error) {
          console.error("Error submitting form:", error);
          showNotification('Failed To Submit', 'danger');
          showNotification(error, 'danger');
        } finally {
            setBtnText('Submit Now');
        }
      };
      


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form submission
        submitForm();       // call the API
      };

    return (
        <>
            <div className="container ">
                <div className="contactSection">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-12 mb-4">
                                {/* <div className="webTittle"><i className="bi bi-chevron-right"></i> Contact US </div> */}
                                <h2 className="sec-title2">Get in Touch</h2>
                            </div>
                            <div className="col-xl-5">
                                <div className="pe-xxl-4 me-xl-3 text-center text-xl-start mb-40 mb-lg-0">
                                    <div className="contact-feature-wrap mt-3">
                                        <div className="contact-feature">
                                            <div className="box-icon">
                                                <img src={contact_1} alt="icon" />
                                            </div>
                                            <div className="box-content">
                                                <h3 className="box-title-22">Our Address </h3>
                                                <h6>Head Office :</h6>
                                                <p className="box-text">Kailashpati Bldg, Plot No .10,
                                                    Block 'A', 1st Floor,
                                                    Veera Desai Road Extension,
                                                    Behind Balaji Telefilms Ltd,
                                                    Andheri(West), Mumbai-400053.</p>
                                            </div>
                                        </div>
                                        <div className="contact-feature">
                                            <div className="box-icon">
                                                <img src={contact_2} alt="icon" />
                                            </div>
                                            <div className="box-content">
                                                <h3 className="box-title-22">Email :  Exim NewsLetters</h3>
                                                <p className="box-text">
                                                    <Link to="mailto:mktg@exim-india.com">mktg@exim-india.com</Link>
                                                    <Link to="mailto:infomumbai@exim-india.com">infomumbai@exim-india.com</Link>
                                                    <Link to="mailto:newsmumbai@exim-india.com">newsmumbai@exim-india.com</Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="contact-feature">
                                            <div className="box-icon">
                                                <img src={contact_2} alt="icon" />
                                            </div>
                                            <div className="box-content">
                                                <h3 className="box-title-22">Email :  Events</h3>
                                                <p className="box-text">
                                                    <Link to="mailto:fairplay@exim-india.com">fairplay@exim-india.com</Link>

                                                </p>
                                            </div>
                                        </div>
                                        <div className="contact-feature">
                                            <div className="box-icon">
                                                <img src={contact_3} alt="icon" />
                                            </div>
                                            <div className="box-content">
                                                <h3 className="box-title-22">Phone Number</h3>
                                                <p className="box-text">
                                                    <Link to="tel:022 67571400">(022) 67571400</Link>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="quote-form-box">
                                    <h4 className="form-title">Send Message</h4>
                                    <p className="sec-text mb-0">
                                        Please feel free to write us any queires about our services or for any other information that you would like us to provide. Our executive will get back to you.
                                    </p>
                                    <Row className="justify-content-md-center">
                                        <Col md={12}>
                                            <Form onSubmit={handleSubmit}>
                                                <Row>


                                                    <Col md={12}>
                                                        <Form.Group controlId="name" className="mt-3">
                                                            <Form.Label>Your Name *</Form.Label>
                                                            <Form.Control
                                                                type="name"
                                                                placeholder="Enter Your Name"
                                                                name="name"
                                                                value={formData.Name}
                                                                onChange={handleChange}
                                                                className='webinput'
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="email" className="mt-3">
                                                            <Form.Label>Email *</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="Enter Your email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}

                                                                className='webinput'
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="contactNumber" className="mt-3">
                                                            <Form.Label>Conatct No *</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Enter your Conatct No"
                                                                name="contactNumber"
                                                                value={formData.contactNumber}
                                                                onChange={handleChange}

                                                                className='webinput'
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Form.Group controlId="formPassword" className="mt-3">
                                                            <Form.Label>Message / Queries *</Form.Label>
                                                            <Form.Control
                                                                as={"textarea"}
                                                                row={12}
                                                                placeholder="Enter your Message / Queries"
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleChange}
                                                                className='webinput webTextarea'
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col md={12} >
                                                        <div className='text-start row justify-content-start'>
                                                            <div className='col-md-4'>
                                                                <button type="submit" className="mt-4 mb-3 dailySubscribebtn p-2 " style={{ height: "50px" }}>
                                                                    {btnText}
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </Form>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div className="borderbg my-5"></div>
            <div className="bg-light py-2 ">
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-12  text-center">
                            {/* <div className="webTittle"><i className="bi bi-chevron-right"></i> CONTACT US - BRANCH OFFICE </div> */}
                            <h2 className="sec-title2 fw-bold">Our Branch Office</h2>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> AGRA </div>
                            <div className="officeBox">
                                <p> Sunil Sharma</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919818837813">+91 9818837813, +91 8368025064</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:support@example.com" >support@example.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> AHMEDABAD </div>
                            <div className="officeBox">
                                <p> 703, 7th Floor, Sakar-V, Mithakhali Railway Crossing, Behind Natraj Cinema, Off Ashram Road, Ahmedabad - 380 009.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:07925625711">(079) 25625711 / 12 /13</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:ahmedabad@exim-india.com" >ahmedabad@exim-india.com</Link></p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> BANGALORE </div>
                            <div className="officeBox">
                                <p>Kanagaraj</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919952968903">+91 9952968903</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:kanagaraj@exim-india.com" >kanagaraj@exim-india.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> BHADOHI </div>
                            <div className="officeBox">
                                <p> Sunil Sharma</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919818837813">+91 9818837813, +91 8368025064</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:support@example.com" >support@example.com</Link> </p>
                            </div>
                        </div>

                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> CHENNAI </div>
                            <div className="officeBox">
                                <p> No.22, 1st Cross Street, VGP Murphy Square, St. Thomas Mount,Chennai - 600 016.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:044 22313126">(044) 22313126 / 22314689</Link></p>
                                <p><i className="bi bi-telephone-fill"></i> Kanagaraj : <Link to="tel:+919952968903">+91 9952968903</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:chennai@exim-india.com" >chennai@exim-india.com</Link> </p>

                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> GANDHIDHAM </div>
                            <div className="officeBox">
                                <p> Plot No. 105, DC-2, Near Vrudhi Enterprise & Sonal Mataji Temple, 9/B Chowkdi, Gandhidham – 370201, Kutch, Gujarat, India.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:02836233312">02836 233312 / 233313</Link></p>
                                <p><i className="bi bi-telephone-fill"></i> Bhumika Vadgama : <Link to="tel:+919979886855">+91 9979886855</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:gim@exim-india.com" >gim@exim-india.com , eximkdl@gmail.com</Link></p>
                            </div>
                        </div>

                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> JAIPUR </div>
                            <div className="officeBox">
                                <p> Sunil Sharma</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919818837813">+91 9818837813, +91 8368025064</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:support@example.com" >support@example.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> JAMNAGAR </div>
                            <div className="officeBox">
                                <p> Bhumika Vadgama  </p>
                                <p><i className="bi bi-telephone-fill"></i><Link to="tel:+919979886855"> +91 9979886855</Link></p>

                            </div>
                        </div>

                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> JODHPUR </div>
                            <div className="officeBox">
                                <p> Sunil Sharma</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919818837813">+91 9818837813, +91 8368025064</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:support@example.com" >support@example.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> KANPUR </div>
                            <div className="officeBox">
                                <p> Sunil Sharma</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919818837813">+91 9818837813, +91 8368025064</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:support@example.com" >support@example.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> KOCHI </div>
                            <div className="officeBox">
                                <p> VI/1609, New Star Road, Mattanchery, Kochi - 682 002.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:04842226469">(0484) 2226469</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:cochin@exim-india.com" >cochin@exim-india.com</Link></p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> KOLKATA </div>
                            <div className="officeBox">
                                <p> 51, Paddapukur Road, Ground Floor, Bhowanipore, Kolkata - 700 020.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:03324752245">(033) 2475 2245 / 2474 0199</Link></p>
                                <p><i className="bi bi-telephone-fill"></i> S. Debnath : <Link to="tel:+919979886855">+91 9163261899</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:kolkata@exim-india.com" >kolkata@exim-india.com</Link></p>
                            </div>
                        </div>

                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> LUDHIANA </div>
                            <div className="officeBox">
                                <p> No. 80, 1st Floor, Guru Nanak Dev Market, Gill Road, Ludhiana - 141 003.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+01614637840.">(0161) 4637840.</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:ludhiana@exim-india.com" >ludhiana@exim-india.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> NEW DELHI </div>
                            <div className="officeBox">
                                <p> 1/33-34 1st Floor, Gangaram Hospital Road, Old Rajinder Nagar,New Delhi-110060.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:01141101805">(011) 41101805 / 06 / 07</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:delhi@exim-india.com" >delhi@exim-india.com</Link></p>
                            </div>
                        </div>


                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> PUNE </div>
                            <div className="officeBox">
                                <p> Namdev</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+918983534857">+91 8983534857</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:infomumbai@exim-india.com" >infomumbai@exim-india.com </Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:newsmumbai@exim-india.com" >newsmumbai@exim-india.com</Link></p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> TUTICORIN </div>
                            <div className="officeBox">
                                <p> 247-A / 1&2, North Car Street, Tuticorin - 628 002.</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:04612336346">(0461) 2336346 / 4550346.</Link></p>
                               
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:tuticorin@exim-india.com" >tuticorin@exim-india.com</Link></p>
                            </div>
                        </div>

                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> VADODARA </div>
                            <div className="officeBox">
                                <p> A-1/45, Surbhi Park, Near Shree Hari Township, Opp.Pancham Party Plot, Sayaji Park, Ajwa Road, Vas Shreeji Avenue, Vadodara - 390 019.</p>
                                <p><i className="bi bi-telephone-fill"></i> Rajendra Nalawade : <Link to="tel:++918153014747">+91 8153014747</Link></p>
                                <p><i className="bi bi-envelope-fill"></i> <Link to="mailto:exim.rajendra@gmail.com" >exim.rajendra@gmail.com</Link> </p>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="officeLocationname"> VISAKHAPATNAM </div>
                            <div className="officeBox">
                                <p> Kutty</p>
                                <p><i className="bi bi-telephone-fill"></i> <Link to="tel:+919381201830">+91 9381201830</Link></p>
                                <p><i className="bi bi-envelope-fill"></i>  <Link to="mailto:vizagexim2019@gmail.com" >vizagexim2019@gmail.com</Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}
export default ContactPage;