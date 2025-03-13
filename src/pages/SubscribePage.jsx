import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { Link, useNavigate } from "react-router-dom";

import demo from "../assets/images/demo.jpg";
import gicon from "../assets/images/gicon.png";


const SubscribePage = () => {

    const navigate = useNavigate();


    const registernow = () => {
        navigate('/registrationPage');
    }

    const [active, setActive] = useState('');

    const handleClick = (type) => {
        setActive(type);
    };
    return (
        <>
            <div className="container mt-4 mb-4 border1  shadow-sm1 rounded-3">

                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 className="mb-3 fw-bold">Our Digital Copy & Hard Copy Subscription Details</h3>
                    </div>
                    <div className="col-md-3">
                        <div className="row justify-content-center align-items-center">

                            <div className="col-md-12 mt-2 text-center ">
                                <h4>Select Subscription type </h4>
                            </div>
                            <div className="col-md-12 mt-2 col-6" >
                                <div className={`scribeBox ${active === 'digital' ? 'active' : ''}`} onClick={() => handleClick('digital')}><div>Digital Copy</div></div>
                            </div>
                            <div className="col-md-12 mt-3 col-6">
                                <div className={`scribeBox ${active === 'hard' ? 'active' : ''}`} onClick={() => handleClick('hard')}><div>Hard Copy</div></div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className={`scribeBox ${active === 'both' ? 'active' : ''}`} onClick={() => handleClick('both')}> <div className="text-center">Both <br />
                                    <span>Digital Copy & Hard Copy</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {active && <div className="col-md-9  mt-5 ">
                        <div className="border p-md-4 shadow-sm rounded-3 mt-1 p-2">
                            {active != "hard" && <><div className="row  mb-5 align-items-center">
                                <div className="col-lg-8">
                                    <div className="scridata">
                                        <h3 className="mb-4 text-webColor">You are a step away from unlocking the digital copy elevate your daily news experience with features :-</h3>
                                        <ul>
                                            <li><i className="bi bi-arrow-right-circle-fill"></i> Seamless access on desktop & mobile browser </li>
                                            <li><i className="bi bi-arrow-right-circle-fill"></i> Archives for the past 1 month</li>
                                            <li><i className="bi bi-arrow-right-circle-fill"></i> You can have upto 3 devices linked to your exim digital Copy subscription at any time</li>
                                            <li><i className="bi bi-arrow-right-circle-fill"></i > All devices compatible</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div class="newspaper-container mt-3 text-center">
                                        <img alt="home" class="w-100 border shadow-sm rounded-3" src={demo} />
                                        <h6 role="button" onClick={()=>{navigate("/viewpage")}} className="mt-3">Exim Digital Copy Demo</h6>
                                        <button  onClick={()=>{navigate("/viewpage")}} className="dailySubscribebtn mt-3 mx-auto p-2" style={{ width: "200px" }}>CLICK TO VIEW</button>
                                    </div>
                                </div>
                            </div>
                                <div className="borderbg mb-4"></div>
                            </>
                            }

                            <div className="row mb-5 ">
                                <div className="col-md-12 mb-3">
                                    <div className="webTittle"><i className="bi bi-chevron-right"></i>Select a Packages</div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Mumbai</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 3,500</h5>
                                                </label>
                                            </div>
                                            <div class="form-check packinput mb-0">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    <h3>2 Year</h3> <h5>₹ 6,000</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Gujrat</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 2,500</h5>
                                                </label>
                                            </div>
                                            <div class="form-check packinput mb-0">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    <h3>2 Year</h3> <h5>₹ 3,500</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Chennai</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 2,400</h5>
                                                </label>
                                            </div>
                                            <div class="form-check packinput mb-0">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    <h3>2 Year</h3> <h5>₹ 4,000</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Delhi / NCR</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 2,400</h5>
                                                </label>
                                            </div>
                                            <div class="form-check packinput mb-0">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    <h3>2 Year</h3> <h5>₹ 4,000</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Kolkata</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 1,200</h5>
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Tuticorin</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 1,000</h5>
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mt-4">
                                    <div className="packbox">
                                        <div className="toppack">Kochi</div>
                                        <div className="botpack">
                                            <div class="form-check packinput">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    <h3>1 year</h3> <h5>₹ 1,000</h5>
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>




                            </div>


                            <div className="borderbg"></div>
                            <div className="row mt-4 mt-5">
                                <div className="col-md-6 mb-3">
                                    <div className="webTittle"><i className="bi bi-chevron-right"></i>Signup Process</div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center  justify-content-md-end">
                                    <div className="d-flex align-items-center justify-content-between "><p className="me-2 mb-0">Already a member?  </p> <button className="loginbtns">Login</button></div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="signupform border p-4 text-center bg-light rounded-3">
                                        <h4 className="mb-3">New Registration</h4>
                                        <div className="row align-item-center justify-content-center  ">
                                            <div className="col-md-5">
                                                <div class="loginGoogleBtn mb-4 p-3 fw-normal " onClick={registernow}> <img alt="" class="me-2" src={gicon} /> Login with Gmail</div>
                                                <div class="Orbtn"><p>OR</p></div>
                                                <button className="dailySubscribebtn mt-4 fw-normal" onClick={registernow}>CUSTOM LOGIN</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>}
                </div>

                <div className="borderbg mt-5"></div>
              
                <div className="topFooter d-md-flex justify-content-center text-center ">
                <p ><i className="bi bi-envelope-fill"></i>  <Link to="mailto:subscription@exim-india.com">subscription@exim-india.com</Link></p>
                <p ><i className="bi bi-telephone-fill"></i>  <Link to="mailto:subscription@exim-india.com">022 67571400</Link></p>
                <p ><i className="bi bi-clock-fill"></i>  Monday to Sunday : 10AM to 6 PM</p>
                </div>
            </div>

        </>

    )
}
export default SubscribePage