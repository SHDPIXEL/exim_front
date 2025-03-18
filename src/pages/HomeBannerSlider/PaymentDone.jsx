import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PaymentDone = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Extract payment data from navigation state with fallbacks
  const orderId = state?.order_id;
  const transactionId = state?.razorpayPaymentId || '123456'; 

  const handlelogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-md-6 offset-md-3">
          <div className="orderSummary">
            <i className="bi bi-check-circle-fill"></i>
            <h2>Payment Successful !</h2>
            <p>Thank you for your payment.</p>
            <div className="bg-white p-4 mx-auto d-table rounded-3">
              <h5>Order id : #{orderId}</h5>
              {/* <h5 className="mb-0">Transaction id : {transactionId}</h5> */}
            </div>
            <div className="text-center">
              <button
                onClick={handlelogin}
                className="mt-4 dailySubscribebtn p-2 mx-auto"
                style={{ height: '50px', width: '200px' }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDone;