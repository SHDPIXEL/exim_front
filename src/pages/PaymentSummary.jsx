import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';

const PaymentSummary = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { state } = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentObject, setPaymentObject] = useState(null); // Store Razorpay payment object
  const authToken = localStorage.getItem("authToken") || "";
  const { user: userData, loading } = useUser();

  const subscriptionType = state?.subscriptionType || 'digital';
  const packages = state?.packages || [];
  
const result = packages.reduce(
  (acc, pkg) => {
    if (pkg.type === 'digital') {
      acc.digital.push(pkg.id);
    } else if (pkg.type === 'hard') {
      acc.hard.push(pkg.id);
    }
    return acc;
  },
  {
    digital: [],
    hard: [],
    type: subscriptionType,
  }
);

  const total = packages.reduce((sum, pkg) => sum + pkg.price, 0);

  useEffect(() => {
    if (!user || !user.token) {
      console.error('Auth token is missing!');
      showNotification("Authentication error! Please log in again.", "danger")
      navigate('/login');
      return;
    }
  }, [state, user, userData, navigate, subscriptionType, packages]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error('Razorpay SDK failed to load');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const closeRazorpayModal = () => {
    if (paymentObject) {
      paymentObject.close(); // Close the modal if it exists
      setPaymentObject(null); // Clear the reference
    }
  };
//https://checkout.razorpay.com/v1/checkout.js
  const displayRazorpay = async () => {
    const res = await loadScript('');
  
    if (!res) {
      showNotification("Razorpay SDK failed to load. Please check your internet connection.", "danger");
      navigate('/subscribePage');
      return;
    }
  
    if (!window.Razorpay) {
      showNotification("Razorpay SDK is not available. Please try again.", "danger");
      navigate('/subscribePage');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await API.post('/services/order', { "packageData" : result }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      const { amount, razorpayOrderId, currency, razorpayKey} = response.data;
      const userId = user.id;
  
      const options = {
        key: razorpayKey,
        amount: amount.toString(),
        currency: currency,
        name: 'Exim',
        description: 'News membership',
        image: '',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const paymentData = {
              orderCreationId: razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              user: userId,
              amount,
            };
  
            const verificationResponse = await API.post('/services/order-success', paymentData, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
  
            if (verificationResponse.status === 200) {
              closeRazorpayModal(); // Close modal before success navigation
              navigate('/paymentDone', {
                state: { order_id: razorpayOrderId, amount: amount / 100 },
              });
            } else {
              showNotification("Payment verification failed. Please contact support.", "danger");
              closeRazorpayModal();
              navigate('/subscribePage');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            showNotification("Error verifying payment. Please try again.", "danger");
            closeRazorpayModal();
            navigate('/subscribePage');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.mobile ? `+91${userData.mobile}` : null,
        },
        notes: {
          address: 'Exim',
        },
        theme: {
          color: '#61dafb',
        },
        method: {
          netbanking: '1', 
          card: '1',       
          upi: '1',        
          wallet: '1',     
          emi: '0',        
          paylater: '0',   
      },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      setPaymentObject(razorpayInstance); // Store the payment object
  
      razorpayInstance.on('payment.failed', function (response) {
        showNotification('Payment failed: ' + response.error.description, "danger");
        setIsLoading(false);
        closeRazorpayModal(); // Close modal on payment failure
        navigate('/subscribePage');
      });
  
      razorpayInstance.open();
    } catch (error) {
      showNotification(error?.message, "danger");
      setIsLoading(false);
      closeRazorpayModal(); // Close modal if it was opened
      navigate('/subscribePage');
    }
  };  

  const handlePayment = (e) => {
    e.preventDefault();
    displayRazorpay();
  };

  // Cleanup on unmount to ensure modal is closed if component is left unexpectedly
  useEffect(() => {
    return () => {
      closeRazorpayModal(); // Cleanup on unmount
    };
  }, [paymentObject]);

  if (loading) return <p>Loading...</p>;

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
                  <div className="rightSummBox">{userData?.name || 'John Doe'}</div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">Designation - </div>
                  <div className="rightSummBox">{userData?.contact_person_designation || 'Admin'}</div>
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
