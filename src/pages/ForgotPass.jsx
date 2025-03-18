import React, { useState } from 'react';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import gicon from "../assets/images/gicon.png";

const ForgotPass = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        username: '',
       
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');

    };


    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">

                    <div className="col-md-6 offset-md-3">
                        <h2 className='text-center mb-3 fw-bold'>Forgot your Password ?</h2>
                         <p className='text-center'>Enter your email or mobile no and we'll help you reset your password</p>
                        <div className="RegistrationForm border p-md-5 py-md-4  p-3 pt-3 rounded-4 bg-light mt-2">
                            <Row className="justify-content-md-center">
                                <Col md={12}>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>


                                            <Col md={12}>
                                                <Form.Group controlId="formEmail" className="mt-3">
                                                    <Form.Label>Username *</Form.Label>
                                                    <Form.Control
                                                        type="username"
                                                        placeholder="Enter username"
                                                        name="username"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className='webinput'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            
                                            
                                        </Row>
                                       

                                        <Row>
                                            <Col md={12} >
                                                <div className='text-center row justify-content-center'>
                                                    <div className='col-md-6'>
                                                        <button type="submit" className="mt-4 mb-3 dailySubscribebtn p-2 " style={{ height: "50px" }}>
                                                            Send  new Password
                                                        </button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Form>
                                     <div className="text-center mt-3">
                                     Back to <Link to="/login" className="text-decoration-none"> Login</Link>
                                    </div>
                                </Col>
                            </Row>
                           
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ForgotPass;
