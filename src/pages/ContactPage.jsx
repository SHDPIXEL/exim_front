import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import { Button, Col, FormControl, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import contact_1 from "../assets/images/contact_1_1.svg";
import contact_2 from "../assets/images/contact_1_2.svg";
import contact_3 from "../assets/images/contact_1_3.svg";
import API from "../api";
import { useNotification } from "../context/NotificationContext";

const ContactPage = () => {
  const { showNotification } = useNotification();
  const [btnText, setBtnText] = useState("Submit Now");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [getintouch, setGetintouch] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  // Fetch Top Headlines
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.post("/contacts/get_website_contacts");

        const cityMap = {
          1: "AGRA",
          2: "AHMEDABAD",
          3: "BANGALORE",
          4: "BHADOHI",
          5: "CHENNAI",
          6: "GANDHIDHAM",
          7: "JAIPUR",
          8: "JAMNAGAR",
          9: "JODHPUR",
          10: "KANPUR",
          11: "KOCHI",
          12: "KOLKATA",
          13: "LUDHIANA",
          14: "MUMBAI (Branch)",
          15: "NEW DELHI",
          16: "PUNE",
          17: "TUTICORIN",
          18: "VADODARA",
          19: "VISAKHAPATNAM",
          100: "MUMBAI (Head)",
        };

        const sortedContacts = Object.keys(cityMap)
          .map((officeCode) => {
            const contact = response.data.data.find(
              (item) => item.office === officeCode
            );
            return contact
              ? { ...contact, cityName: cityMap[officeCode] }
              : null;
          })
          .filter(Boolean); // remove nulls

        setContacts(sortedContacts);
      } catch (error) {
        console.error("Error in fetching contacts", error);
      }
    };
    fetchContacts();
  }, []);

  // Fetch Top Headlines
  useEffect(() => {
    const fetchGetintouch = async () => {
      try {
        const response = await API.post("/getintouch/allgetintouch");
        setGetintouch(response.data.data);
      } catch (error) {
        console.error("Error in fetching contacts", error);
      }
    };
    fetchGetintouch();
  }, []);

  const submitForm = async () => {
    setBtnText("Submitting");
    setLoading(true);
    try {
      const response = await API.post(
        "/services/send-contact-message",
        formData
      );
      showNotification("Form submitted successfully", "success");
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("Failed To Submit", "danger");
      showNotification(error, "danger");
    } finally {
      setBtnText("Submit Now");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission
    submitForm(); // call the API
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
                    {/* Address Section */}
                    <div className="contact-feature">
                      <div className="box-icon">
                        <img src={contact_1} alt="icon" />
                      </div>
                      <div className="box-content">
                        <h3 className="box-title-22">Our Address </h3>
                        <h6>Head Office :</h6>
                        <p className="box-text">
                          {getintouch[0]?.address || "Address not available"}
                        </p>
                      </div>
                    </div>

                    {/* Email: Events Section */}
                    <div className="contact-feature">
                      <div className="box-icon">
                        <img src={contact_2} alt="icon" />
                      </div>
                      <div className="box-content">
                        <h3 className="box-title-22">Write Us : Events</h3>
                        <p className="box-text">
                          {getintouch[0]?.eventsEmails &&
                            getintouch[0]?.eventsEmails.map(
                              (eventEmail, index) => (
                                <Link key={index} to={`mailto:${eventEmail}`}>
                                  {eventEmail}
                                </Link>
                              )
                            )}
                        </p>
                      </div>
                    </div>

                    {/* Email: Exim Newsletters Section */}
                    <div className="contact-feature">
                      <div className="box-icon">
                        <img src={contact_2} alt="icon" />
                      </div>
                      <div className="box-content">
                        <h3 className="box-title-22">
                          Write Us : Exim NewsLetters
                        </h3>
                        <p className="box-text">
                          {getintouch[0]?.emails &&
                            getintouch[0]?.emails.map((email, index) => (
                              <Link key={index} to={`mailto:${email}`}>
                                {email}
                              </Link>
                            ))}
                        </p>
                      </div>
                    </div>

                    {/* Phone Number Section */}
                    <div className="contact-feature">
                      <div className="box-icon">
                        <img src={contact_3} alt="icon" />
                      </div>
                      <div className="box-content">
                        <h3 className="box-title-22">Phone Number</h3>
                        <p className="box-text">
                          <Link to={`tel:${getintouch[0]?.phoneNumber}`}>
                            {getintouch[0]?.phoneNumber ||
                              "(No phone number available)"}
                          </Link>
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
                    Please feel free to write us any queires about our services
                    or for any other information that you would like us to
                    provide. Our executive will get back to you.
                  </p>
                  <Row className="justify-content-md-center">
                    <Col md={12}>
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="name" className="mt-3">
                              <Form.Label>
                                Your Name<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="name"
                                placeholder="Enter Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="webinput"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="email" className="mt-3">
                              <Form.Label>
                                Email<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="email"
                                placeholder="Enter Your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="webinput"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group
                              controlId="contactNumber"
                              className="mt-3"
                            >
                              <Form.Label>
                                Conatct No<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                placeholder="Enter your Conatct No"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="webinput"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group
                              controlId="formPassword"
                              className="mt-3"
                            >
                              <Form.Label>
                                Message / Queries
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                as={"textarea"}
                                row={12}
                                placeholder="Enter your Message / Queries"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="webinput webTextarea"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="text-start row justify-content-start">
                              <div className="col-md-4">
                                <button
                                  type="submit"
                                  className="mt-4 mb-3 dailySubscribebtn p-2 d-flex justify-content-center align-items-center gap-2 "
                                  style={{ height: "50px" }}
                                >
                                  {loading && (
                                    <Spinner animation="border" size="sm" />
                                  )}
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
            {contacts.map((contact, index) => (
              <div className="col-md-4 mt-5" key={index}>
                <div className="officeLocationname">{contact.cityName}</div>
                <div className="officeBox">
                  {contact.address && <p>{contact.address}</p>}
                  {contact.telephone && (
                    <p>
                      <i className="bi bi-telephone-fill"></i>{" "}
                      <Link to={`tel:${contact.telephone}`}>
                        {contact.telephone}
                      </Link>
                    </p>
                  )}
                  {contact.fax && (
                    <p>
                      <i className="bi bi-printer-fill"></i>{" "}
                      <Link to={`fax:${contact.fax}`}>{contact.fax}</Link>
                    </p>
                  )}
                  {contact.emails.length > 0 && (
                    <div>
                      <i className="bi bi-envelope-fill me-2"></i>
                      {contact.emails.map((emailObj, idx) => (
                        <span key={idx} className="me-2">
                          <Link to={`mailto:${emailObj.email}`}>
                            {emailObj.email}
                          </Link>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;
