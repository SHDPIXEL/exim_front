import React from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import newmsg from "../assets/images/Newsletter.svg"

const Newsletter = () => {
    return (
        <div className="DilyNewsletter ">
            <div>
            <img src={newmsg} alt="msg" />
            <h2>The Daily EXIM Newsletter</h2>
            <p>Brings you a selection of the latest news, trends, insights, and tips from around the world.</p>
            <Form>
                <div className="row ">

                    <div className="col-md-12 mb-3">
                        <Form.Control size="lg" type="email" className="customInput" required placeholder="*Your email address" />
                    </div>

                    <div className="col-md-12 mb-3 text-dark">
                        <Form.Group controlId="formBasicCheckbox" className="d-flex chekmarh">
                            <Form.Check size="lg" type="checkbox" required /><span>I have read and agree to the  <Link to="/">terms & conditions </Link></span>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 mb-3 text-dark">
                        <Button className="w-100 webBtn" type="submit">Subscribe for Free!  </Button>
                    </div>

                    


                </div>

            </Form>
            </div>
        </div>
    )
}
export default Newsletter