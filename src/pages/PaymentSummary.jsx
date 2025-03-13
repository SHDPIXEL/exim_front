import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentSummary = () => {

    const navigate = useNavigate();

    const handlepayment = () => {
        navigate('/paymentDone');
    };

    return (
        <div className="container mb-4">
            <div className="row mt-5 mb-5">

                <div className="col-md-8 offset-md-2">
                    <h2 className='text-center mb-3 fw-bold'>Choose a Payment Method</h2>
                    <div className="row mt-4 ">

                        <div className="col-md-12">
                            <div className="SummarryBox">
                                <div className="SummarryBoxList">
                                    <div className="leftSummBox">Name - </div>
                                    <div className="rightSummBox">John Doe</div>
                                </div>
                                <div className="SummarryBoxList">
                                    <div className="leftSummBox">Designation - </div>
                                    <div className="rightSummBox">Admin</div>
                                </div>
                                <div className="SummarryBoxList">
                                    <div className="leftSummBox">Subscription Details - </div>
                                    <div className="rightSummBox">1 Year Mumbai , 2 Year Chennai</div>
                                </div>
                                <div className="SummarryBoxList">
                                    <div className="leftSummBox">Type - </div>
                                    <div className="rightSummBox">Digital</div>
                                </div>
                                <div className="SummarryBoxList">
                                    <div className="leftSummBox">Editions - </div>
                                    <div className="rightSummBox">Mumbai , Chennai</div>
                                </div>
                                <div className="SummarryBoxList bg-light">
                                    <div className="leftSummBox fs-4 m-0">Total</div>
                                    <div className="rightSummBox fw-bold fs-3 m-0 text-webColor">₹ 10,998</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='text-center row justify-content-center'>
                                <div className='col-md-5'>
                                    <button onClick={handlepayment} className="mt-4 dailySubscribebtn p-2" style={{ height: "50px" }}>
                                        PAY NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderbg mt-5"></div>
              
              <div className="topFooter d-md-flex justify-content-center text-center ">
              <p ><i className="bi bi-envelope-fill"></i>  <Link to="mailto:subscription@exim-india.com">subscription@exim-india.com</Link></p>
              <p ><i className="bi bi-telephone-fill"></i>  <Link to="tel:022 67571400">022 67571400</Link></p>
              <p ><i className="bi bi-clock-fill"></i>  Monday to Sunday : 10AM to 6 PM</p>
              </div>
        </div>
    )
}

export default PaymentSummary;