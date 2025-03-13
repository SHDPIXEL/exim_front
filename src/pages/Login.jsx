import React, { useState } from 'react';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import gicon from "../assets/images/gicon.png";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        navigate('/dashboard');

    };


    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">

                    <div className="col-md-6 offset-md-3">
                        <h2 className='text-center mb-3 fw-bold'>Login</h2>
                       
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
                                            <Col md={12}>
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

                                            
                                        </Row>
                                        <Row className='align-items-center d-flex'>
                                        <Col md={6}>
                                                <Form.Group controlId="formBasicCheckbox" className="d-flex mt-4 align-items-center">
                                                    <Form.Check size="lg" type="checkbox" /><span className='mt-1'>Remember me  </span>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className='justify-content-end d-md-flex'>
                                               <Link to="/Forgotpass" className="d-flex forgotPass mt-4" >Forgot Password</Link>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col md={12} >
                                                <div className='text-center row justify-content-center'>
                                                    <div className='col-md-6'>
                                                        <button type="submit" className="mt-5 mb-3 dailySubscribebtn p-2 " style={{ height: "50px" }}>
                                                            LOGIN
                                                        </button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Form>
                                  
                                </Col>
                            </Row>
                            <div class="Orbtn"><p>OR</p></div>
                            <div class="loginGoogleBtn mb-3 mt-5 p-3 fw-normal " > <img alt="" class="me-2" src={gicon} /> Login with Gmail</div>
                            <p className='text-center mt-1'>Doesn't have an account yet ? <Link to="/registrationPage">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;
