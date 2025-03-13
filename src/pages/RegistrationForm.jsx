import React, { useState } from 'react';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        businessNature: '',
        companyName: '',
        designation: '',
        address: '',
        pincode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        navigate('/paymentSummary');

    };


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable={true}
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Terms & conditions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> TERMS &amp; CONDITIONS
                        This website is maintained by Exim Multimedia (I) (Pvt). As a user of this website (referred to as "you/your") you acknowledge that any use of this website including any subscriptions you make ("use/using") is subject to our terms and conditions below (which includes any other important hyper-linked sections.  Please read through these terms and conditions carefully.
                        <br />
                        <br />
                        General<br />
                        1.1. We reserve the right to change these terms and conditions at any time. Any such changes will take effect when posted on the website (see date at the site) and it is responsibility  of the user  ‘use/using ’  to read the terms and conditions on each occasion you use this website and your continued use of the website shall signify your acceptance to be bound by the latest terms and conditions.
                        <br />
                        1.2. If you are not a subscriber, you confirm that you have authority to bind any business on whose behalf you use this website.<br />
                        <br />
                        Registration and Security<br />
                        When you register, you choose a username and a password and provide your email and other information. You're responsible for providing accurate registration information and for updating it as . You are responsible for maintaining the confidentiality of your password.
                        <br />
                        <br />
                        User Responsibilities<br />
                        You may only use Exim D-Copy Service (a) for lawful purposes, (b) in accordance with this Agreement, and any established operating rules published by EXIM. You will not use Exim D-Copy service in jurisdictions where such use is prohibited by applicable law.
                        <br />
                        <br />
                        Changes to Exim D-Copy Service and Pricing<br />
                        We may at any time, change or discontinue any aspect or feature of Exim D-Copy, including content, subscription plans and features, pricing, hours of availability, equipment or the software needed for access or use. We may also impose limits on certain features and services or restrict your access to parts or all of the service without notice or liability.
                        <br />
                        <br />
                        Intellectual Property<br />
                        You acknowledge and agree that all copyright, trademarks and all other intellectual property rights in all materials and/or content made available as part of your use of this website shall remain at all times vested in us or our licensors. You are permitted to use this material only as expressly authorized by us or our licensors.
                        <br />
                        You acknowledge and agree that the material and content contained within this website is made available for your personal non-commercial use only and that you may only download such material and content for the purpose of using this website. You further acknowledge that any other use of the material and content of this website is strictly prohibited and you agree not to (and agree not to assist or facilitate any third party to) copy, reproduce, transmit, publish, display, distribute, commercially exploit or create derivative works of such material and content.
                        <br />
                        <br />
                        Currency Conversion and Associated Fees
                        <br />
                        Once subscribed there will be no refunds. Exim D-Copy shows prices in INR. When you purchase a subscription plan to Exim D-Copy service, Exim D-Copy will charge you a price in INR. You may click here to see our current subscription plan. If your bank or a credit card company converts INR to your local currency, the resulting price may fluctuate depending on the changes in the conversion rate. Your credit card company may charge you a fee for this service. Exim D-Copy is not responsible for any fees that your bank or credit card company charges for performing currency conversion, conversion rate or changes in the conversion rate.
                        <br />
                        <br />
                        This D-Copy is best viewed on a 1024*768 resolution screen.

                    </p>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button style={{ width: "200px" }} onClick={props.onHide}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">

                    <div className="col-md-8 offset-md-2">
                        <h2 className='text-center mb-3 fw-bold'>Registration</h2>
                        <div className="RegistrationForm border p-md-5 py-md-3  p-3 pt-3 rounded-1 bg-light mt-2">
                            <Row className="justify-content-md-center">
                                <Col md={12}>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formCompanyName" className="mt-3">
                                                    <Form.Label>Company Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter company name"
                                                        name="companyName"
                                                        value={formData.companyName}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formBusinessNature" className="mt-3">
                                                    <Form.Label>Nature of Business *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter nature of business"
                                                        name="businessNature"
                                                        value={formData.businessNature}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formFullName" className="mt-3">
                                                    <Form.Label>Contact Person *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Contact Person name"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formDesignation" className="mt-3">
                                                    <Form.Label>Contact Person Designation *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Contact Person Designation"
                                                        name="designation"
                                                        value={formData.designation}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group controlId="formAddress" className="mt-3">
                                                    <Form.Label>Company Address *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Company Address"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPincode" className="mt-3">
                                                    <Form.Label>City *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter City"
                                                        name="city"
                                                        value={formData.pincode}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPincode" className="mt-3">
                                                    <Form.Label>Pincode *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter pincode"
                                                        name="pincode"
                                                        value={formData.pincode}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPincode" className="mt-3">
                                                    <Form.Label>State *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter State"
                                                        name="state"
                                                        value={formData.pincode}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPincode" className="mt-3">
                                                    <Form.Label>Country *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Country"
                                                        name="pincode"
                                                        value={"India"}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group controlId="formMobile" className="mt-3">
                                                    <Form.Label>Phone No.</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Phone number"
                                                        name="mobile"
                                                        value={formData.mobile}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formEmail" className="mt-3">
                                                    <Form.Label>Email *</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPassword" className="mt-3">
                                                    <Form.Label>Password *</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formConfirmPassword" className="mt-3">
                                                    <Form.Label>Confirm Password *</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}

                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>





                                            <Col md={12}>
                                                <Form.Group controlId="formBasicCheckbox" className="d-flex mt-4 align-items-center">
                                                    <Form.Check size="lg" type="checkbox" /><span>I have read and agree to the  <Link onClick={() => setModalShow(true)} className='text-dark'>terms & conditions </Link></span>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} >
                                                <div className='text-center row justify-content-center'>
                                                    <div className='col-md-6'>
                                                        <button type="submit" className="mt-4 mb-3 dailySubscribebtn p-2 " style={{ height: "50px" }}>
                                                            REGISTER NOW
                                                        </button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Form>


                                    <p className='text-center mt-3'>already have an account? <Link to="/login">Sign in</Link></p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default RegistrationForm;
