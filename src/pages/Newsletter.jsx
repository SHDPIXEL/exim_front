import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import newmsg from "../assets/images/Newsletter.svg";
import API from "../api";
import { useNotification } from "../context/NotificationContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const { showNotification } = useNotification();

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agree) {
            showNotification("Please agree to the terms and conditions.", "info");
            return;
        }

        setLoading(true);
        setStatus(null); // reset icon

        try {
            const response = await API.post('/newsletter/subscribe', {
                email: email,
            });

            console.log("Subscribed successfully:", response.data);
            showNotification(response.data.message || 'Thank you for subscribing!', "success");
            setStatus("success");
            setEmail("");
            setAgree(false);
        } catch (error) {
            console.error("Subscription failed:", error);
            showNotification(error.message || 'Something went wrong. Please try again later.', "error");
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="DilyNewsletter">
            <div>
                <img src={newmsg} alt="msg" />
                <h2>The Daily EXIM Newsletter</h2>
                <p>Brings you a selection of the latest news, trends, insights, and tips from around the world.</p>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <Form.Control
                                size="lg"
                                type="email"
                                className="customInput"
                                required
                                placeholder="*Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12 mb-3 text-dark">
                            <Form.Group controlId="formBasicCheckbox" className="d-flex chekmarh">
                                <Form.Check
                                    size="lg"
                                    type="checkbox"
                                    required
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                />
                                <span>
                                    I have read and agree to the <Link to="/">terms & conditions</Link>
                                </span>
                            </Form.Group>
                        </div>

                        <div className="col-md-12 mb-3 text-dark d-flex align-items-center gap-2">
                            <Button className="w-100 webBtn d-flex justify-content-center align-items-center gap-2" type="submit" disabled={loading}>
                                {loading && <Spinner animation="border" size="sm" />}
                                Subscribe for Free!
                            </Button>

                            {/* Status icon next to button */}
                            {status === "success" && <FaCheckCircle color="green" size={24} />}
                            {status === "error" && <FaTimesCircle color="red" size={24} />}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Newsletter;
