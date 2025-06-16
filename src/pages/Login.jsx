import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gicon from '../assets/images/gicon.png';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();

  useEffect(() => {
    // Only redirect to dashboard if user exists AND there's no subscription redirect pending
    if (user && (!location.state?.from || location.state.from !== '/subscribePage')) {
      navigate('/dashboard');
    }
  }, [user, navigate, location.state]);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Fetch the user's IP address
      const ipResponse = await fetch('https://api64.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      // Send login request with IP /services/login
      const response = await API.post('/services/login', {
        email: data.username,
        password: data.password,
        ip: userIp,
      });

      const { token } = response.data;
      if (token) {
        login(token);
        if (location.state?.redirect) {
          navigate(location.state.redirect);
        } else if (location.state?.from === '/subscribePage' && location.state?.subscriptionType && location.state?.packages) {
          navigate('/paymentSummary', {
            state: {
              subscriptionType: location.state.subscriptionType,
              packages: location.state.packages,
            },
          });
        } else {
          navigate('/dashboard');
        }
      } else {
        console.warn('No token received from backend');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      showNotification('Login failed. ' + error?.message, "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-3 fw-bold">Login</h2>
            <div className="RegistrationForm border p-md-5 py-md-4 p-3 pt-3 rounded-4 bg-light mt-2">
              <Row className="justify-content-md-center">
                <Col md={12}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="formEmail" className="mt-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            {...register('username', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address',
                              },
                            })}
                            className={`webinput ${errors.username ? 'is-invalid' : ''}`} // Fixed template literal syntax
                          />
                          {errors.username && (
                            <div className="invalid-feedback">{errors.username.message}</div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group controlId="formPassword" className="mt-3">
                          <Form.Label>Password *</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                              required: 'Password is required',
                              minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                              },
                            })}
                            className={`webinput ${errors.password ? 'is-invalid' : ''}`} // Fixed template literal syntax
                          />
                          {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="align-items-center d-flex">
                      <Col md={6}>
                        <Form.Group controlId="formBasicCheckbox" className="d-flex mt-4 align-items-center">
                          <Form.Check size="lg" type="checkbox" />
                          <span className="mt-1">Remember me</span>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="justify-content-end d-md-flex">
                        <Link to="/Forgotpass" className="d-flex forgotPass mt-4">
                          Forgot Password
                        </Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="text-center row justify-content-center">
                          <div className="col-md-6">
                            <Button
                              type="submit"
                              className="mt-5 mb-3 dailySubscribebtn p-2 d-flex justify-content-center align-items-center gap-2"
                              style={{ height: '50px' }}
                            >
                              {loading && <Spinner animation="border" size="sm" />}
                              LOGIN
                            </Button>
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
    </>
  );
};

export default Login;
