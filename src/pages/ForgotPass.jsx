import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

import { useNotification } from "../context/NotificationContext"


const ForgotPass = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '' });
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);

        try {
            const response = await API.post('/services/forgot-password', { email: formData.username });

            if (response.status === 200) {
                showNotification("Password reset instructions sent to your email!", "info");
                setFormData({ username: '' });
                navigate('/login');
            } else {
                showNotification("Failed to send reset instructions.", "error");
            }
        } catch (error) {
            showNotification(error?.message, "error");
            console.error('Forgot password error:', error);
        }

        setButtonLoading(false);
    };

    return (
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center mb-3 fw-bold">Forgot your Password?</h2>
                    <p className="text-center">Enter your email and we'll help you reset your password.</p>
                    <div className="border p-md-5 py-md-4 p-3 rounded-4 bg-light mt-2">
                        <Row className="justify-content-md-center">
                            <Col md={12}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsername" className="mt-3">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your Email"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="webinput"
                                            required
                                        />
                                    </Form.Group>
                                    <div className="text-center row justify-content-center">
                                        <div className="col-md-6">
                                            <button
                                                type="submit"
                                                className="mt-4 mb-3 dailySubscribebtn p-2"
                                                style={{ height: '50px' }}
                                                disabled={buttonLoading}
                                            >
                                                {buttonLoading ? 'Sending...' : 'Send Link'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                                <div className="text-center mt-3">
                                    Back to <Link to="/login" className="text-decoration-none">Login</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
