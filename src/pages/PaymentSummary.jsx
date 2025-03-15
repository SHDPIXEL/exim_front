import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const PaymentSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem("authToken") || "";

  // Redirect to login if user or token is missing
  if (!user || !user.token) {
    console.error('Auth token is missing!');
    alert('Authentication error! Please log in again.');
    navigate('/login');
    return null;
  }

  const subscriptionType = state?.subscriptionType || 'digital';
  const packages = state?.packages || [];
  const total = packages.reduce((sum, pkg) => sum + pkg.price, 0);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Razorpay SDK failed to load');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    // Ensure Razorpay is available
    if (!window.Razorpay) {
      alert('Razorpay SDK is not available. Please try again.');
      console.error('window.Razorpay is undefined');
      return;
    }

    setIsLoading(true);

    try {
      const subscriptionData = {
        type: subscriptionType,
        subscription_details: packages.map((pkg) => ({
          location: pkg.location,
          duration: pkg.duration,
          price: pkg.price,
        })),
        amount: total,
      };

      const response = await API.post('/services/order', subscriptionData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('Backend response:', response.data);

      // Correct destructuring based on response structure
      const { amount, id: order_id, currency } = response.data.razorpayOrder;
      const userId = user.id;

      const options = {
        key: 'rzp_test_TmUiraAoARSPLC', // Verify this key in Razorpay dashboard
        amount: amount.toString(),
        currency: currency,
        name: 'Exim',
        description: 'News membership',
        image: '', // Add logo URL if available
        order_id: order_id,
        handler: async function (response) {
          setIsLoading(true);
          const paymentData = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            user: userId,
            amount,
          };

          try {
            const verificationResponse = await API.post('/services/order-success', paymentData, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });

            if (verificationResponse.status === 200) {
              navigate('/paymentDone', {
                state: { order_id: order_id, amount: amount / 100 },
              });
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            alert('Error verifying payment: ' + (error.response?.data?.message || error.message));
            console.error('Verification error:', error);
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: user?.name || 'John Doe',
          email: user?.email || 'user@example.com',
          contact: user?.mobile ? `+91${user.mobile}` : '+919999999999',
        },
        notes: {
          address: 'Exim',
        },
        theme: {
          color: '#61dafb',
        },
      };

      console.log('Razorpay options:', options);

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
        setIsLoading(false);
      });
      paymentObject.open();
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while initiating payment.');
      console.error('Payment initiation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    displayRazorpay();
  };

  return (
    <div className="container mb-4">
      <div className="row mt-5 mb-5">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-3 fw-bold">Choose a Payment Method</h2>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="SummarryBox">
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Name - </div>
                  <div className="rightSummBox">{user?.name || 'John Doe'}</div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Designation - </div>
                  <div className="rightSummBox">{user?.designation || 'Admin'}</div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Subscription Details - </div>
                  <div className="rightSummBox">
                    {packages.map((pkg) => `${pkg.duration} ${pkg.location}`).join(', ') || 'N/A'}
                  </div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Type - </div>
                  <div className="rightSummBox">
                    {subscriptionType === 'both'
                      ? 'Digital & Hard Copy'
                      : subscriptionType.charAt(0).toUpperCase() + subscriptionType.slice(1)}
                  </div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Editions - </div>
                  <div className="rightSummBox">{packages.map((pkg) => pkg.location).join(', ') || 'N/A'}</div>
                </div>
                <div className="SummarryBoxList bg-light">
                  <div className="leftSummBox fs-4 m-0">Total</div>
                  <div className="rightSummBox fw-bold fs-3 m-0 text-webColor">
                    ₹ {total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center row justify-content-center">
                <div className="col-md-5">
                  <button
                    onClick={handlePayment}
                    className="mt-4 dailySubscribebtn p-2"
                    style={{ height: '50px' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'PAY NOW'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="borderbg mt-5"></div>
      <div className="topFooter d-md-flex justify-content-center text-center">
        <p>
          <i className="bi bi-envelope-fill"></i>{' '}
          <Link to="mailto:subscription@exim-india.com">subscription@exim-india.com</Link>
        </p>
        <p>
          <i className="bi bi-telephone-fill"></i> <Link to="tel:022 67571400">022 67571400</Link>
        </p>
        <p>
          <i className="bi bi-clock-fill"></i> Monday to Sunday : 10AM to 6 PM
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;