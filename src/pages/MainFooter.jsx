import React from 'react';
import logo from "../assets/images/footerlogo.png"
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import sendicon from "../assets/images/sendIcon.svg";
import playStore from "../assets/images/playstore.png"
import AppStore from "../assets/images/appstore.png"

const MainFooter = () => {

    return (
        <>
            <div className="footersection">
                <div className="container-fluid">
                    <div className='row border-bottom pb-4 align-items-center'>
                        <div className='col-md-6'>
                            <div className='footerimgcontain'>
                                <img src={logo} alt='logo' className='mb-4' />
                                <div className='footsociallink'>
                                    <Link target='_blank' to="https://www.instagram.com/eximindia_"><i className="bi bi-instagram"></i></Link>
                                    <Link target='_blank' to="https://www.facebook.com/people/Exim-India/100064039290498/"><i className="bi bi-facebook"></i></Link>
                                    <Link target='_blank' to="https://www.linkedin.com/company/89659864/admin" ><i className='bi bi-linkedin'></i></Link>
                                    <Link to="https://x.com/Exim_India" target='_blank'><i className="bi bi-twitter-x"></i></Link>
                                    <Link target='_blank' to="https://www.youtube.com/@eximindia9046"><i className="bi bi-youtube"></i></Link>

                                </div>



                            </div>
                        </div>
                        <div className='col-md-6 d-flex justify-content-md-end justify-content-center '>
                            <div className='footerNewseltter mt-3 pt-0 text-white d-flex justify-content-end flex-column align-items-end' >
                                <h5>Quick Contact</h5>
                                <Link to="tel:02267571400" className='d-flex justify-content-end flex-column align-items-end text-white'>
                                    <span>Call Us</span>(022) 67571400
                                </Link>
                            </div>
                        </div>


                    </div>

                    <div className="row mt-5 border-bottom pb-3">

                        <div className='col-md-2 col-6'>
                            <div className='footernav'>
                                <h5>News Categories</h5>
                                <div className='botnav'>
                                    <Link to="/Category?category=TradeNews">Trade News</Link>
                                    <Link to="/Category?category=International" >International</Link>
                                    <Link to="/Category?category=IndianEconomy" >Indian Economy</Link>
                                    <Link to="/Category?category=PortNews">Ports News</Link>
                                    <Link to="/Category?category=SpecialReport">Special Reports</Link>
                                    <Link to="/Category?category=ShippingNews">Shipping News</Link>
                                    <Link to="/Category"><b>View All Categories</b></Link>


                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-6'>
                            <div className='footernav'>
                                <h5>EXIM India Digital Copy</h5>
                                <div className='botnav'>
                                    <Link to="/subscribePage" >Mumbai Edition</Link>
                                    <Link to="/subscribePage" >Chennai Edition</Link>
                                    <Link to="/subscribePage">Delhi Edition</Link>
                                    <Link to="/subscribePage">Kolkata Edition</Link>
                                    <Link to="/subscribePage" >Gujarat Edition</Link>
                                    <Link to="/subscribePage">Kochi Edition</Link>
                                    <Link to="/subscribePage"  >Tuticorin Edition</Link>


                                </div>
                            </div>
                        </div>
                        <div className='col-md-2 col-6'>
                            <div className='footernav'>
                                <h5>Useful Links</h5>
                                <div className='botnav'>
                                    <Link to="/">Home</Link>
                                    <Link to="/EximIndia">About Us</Link>
                                    <Link to="/rates">FER/ CER</Link>
                                    <Link to="/events">Events</Link>
                                    <Link to="/appointments">Appointments</Link>
                                    <Link to="/videoGallery">Video Gallery</Link>
                                    <Link to="/contact" >Contact</Link>


                                </div>
                            </div>
                        </div>

                        {/* <div className='col-md-2 col-6'>
                            <div className='footernav'>
                                <h5>Branch Offices</h5>
                                <div className='botnav'>
                                    <Link  to="/contact" >Agra</Link>
                                    <Link to="/contact" >Ahmedabad</Link>
                                    <Link to="/contact" >Bangalore</Link>
                                    <Link to="/contact" >Bhadohi</Link>
                                    <Link to="/contact" >Chennai</Link>
                                    <Link to="/contact" >Ghandidham</Link>
                                    
                                    <Link  to="/contact" >View All Branch Offices</Link>
                                </div>
                            </div>
                        </div> 
                     <div className='col-md-2 col-6'>
                            <div className='footernav'>
                                <h5 style={{ opacity: "0" }}>Branch Offices</h5>
                                <div className='botnav'>
                                    <Link to="/contact"  >Jamnagar</Link>
                                    <Link to="/contact" >Jodhpur</Link>
                                    <Link to="/contact" >Kanpur</Link>
                                    <Link to="/contact" >Kochi</Link>
                                    <Link to="/contact"  >Kolkata</Link>
                                    <Link to="/contact" >New Delhi</Link>
                                    <Link  to="/contact" >View All Branch Offices</Link>
                                </div>
                            </div>
                        </div> */}
                        <div className='col-md-3 col-6'>
                            <div className='footernav'>
                                <h5>Quick Links</h5>
                                <div className='botnav'>
                                    <Link to="/privacypolicy"  >Privacy policy</Link>
                                    <Link to="/termsandconditions" >Terms and Conditions</Link>
                                    <Link to="/shippingAndDeliveryPolicy" >Shipping and Delivery Policy</Link>
                                    <Link to="/cancellationAndRefundPolicy" >Cancellation and Refund Policy</Link>
                                </div>
                                <h5 className='my-3'>Exim Mobile App Available on</h5>

                                <Link to="https://play.google.com/store/apps/details?id=com.hv.eximindia&pli=1" target='_blank' className='mx-2 my-1' ><img src={playStore} width={100} className='rounded-1 mb-md-0 mb-3' /></Link>
                                <Link to="https://apps.apple.com/in/app/exim-india/id1225479989" target='_blank' className='mx-2 my-1' ><img src={AppStore} width={100} className='rounded-1' /></Link>
                            </div>
                        </div>
                        <div className='col-md-2 col-12 '>
                            <div className='footernav'>
                                <h5>Contact Us</h5>
                                <div className='botnav '>
                                    <Link to="tel:02267571400"><span>Call Us: </span><br />(022) 67571400</Link>
                                    <span className='text-white'>Write Us: </span> <span className='text-white-50'> Events</span> <br />
                                    <Link to="mailto:fairplay@exim-india.com">  fairplay@exim-india.com</Link>
                                    <span className='text-white'>Write Us: </span> <span className='text-white-50'> EXIM NewsLetters </span>
                                    <a href="mailto:mktg@exim-india.com" >mktg@exim-india.com</a> 
                                    <a href="mailto:infomumbai@exim-india.com" >infomumbai@exim-india.com</a> 
                                    <a href="mailto:newsmumbai@exim-india.com" >newsmumbai@exim-india.com</a>
                                    <span className='text-white'>Head Office:</span> <span className='text-white-50'>Mumbai-400053</span>
                                    <Link to="/contact" ><b>View All Branch Offices</b></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row pt-5 pb-1'>
                        <div className='col-md-12 text-center'>
                            <p className='copyrighttext'>© 2023 EXIM India. All Rights Reserved.</p>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}

export default MainFooter;