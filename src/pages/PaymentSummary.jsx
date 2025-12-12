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
  const [offers, setOffers] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  const subscriptionType = state?.subscriptionType || 'digital';
  const packages = state?.packages || [];
  const formatAmount = (value) =>
    Number(value || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  
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

  // Use withoutgst when available for display calculations
  const exGstTotal = packages.reduce((sum, pkg) => {
    const price = Number(pkg.price ?? 0);
    const withoutGst = pkg.withoutgst != null ? Number(pkg.withoutgst) : price ? price / 1.18 : 0;
    return sum + withoutGst;
  }, 0);

  // Calculate discount from selected offers
  const calculateDiscount = () => {
    let discountAmount = 0;
    selectedOffers.forEach((offerId) => {
      const offer = offers.find((o) => o._id === offerId);
      if (offer) {
        // Assuming discount is a percentage
        discountAmount += (exGstTotal * offer.discount) / 100;
      }
    });
    return discountAmount;
  };

  const discountAmount = calculateDiscount();
  const finalTotal = exGstTotal - discountAmount;

  // Fetch offers for the user
  useEffect(() => {
    const fetchOffers = async () => {
      if (!authToken) return;
      
      setLoadingOffers(true);
      try {
        const response = await API.post(
          '/services/get_offers',
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data.success === 1) {
          setOffers(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
        // Don't show error notification as offers are optional
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchOffers();
  }, [authToken]);

  useEffect(() => {
    if (!user || !user.token) {
      console.error('Auth token is missing!');
      showNotification("Authentication error! Please log in again.", "danger")
      navigate('/login');
      return;
    }
  }, [state, user, userData, navigate, subscriptionType, packages]);

  // Handle offer selection
  const handleOfferToggle = (offerId) => {
    setSelectedOffers((prev) => {
      if (prev.includes(offerId)) {
        return prev.filter((id) => id !== offerId);
      } else {
        return [...prev, offerId];
      }
    });
  };

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
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
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
      const response = await API.post(
        '/services/order',
        {
          packageData: result,
          offerIds: selectedOffers, // Include selected offer IDs
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
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
                    {packages.length
                      ? packages
                          .map((pkg) => {
                            const price = Number(pkg.price ?? 0);
                            const withoutGst =
                              pkg.withoutgst != null
                                ? Number(pkg.withoutgst)
                                : price
                                  ? price / 1.18
                                  : 0;
                            return `${pkg.duration} ${pkg.location} - ₹ ${formatAmount(
                              withoutGst
                            )} (excl. GST)`;
                          })
                          .join(', ')
                      : 'N/A'}
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
                {discountAmount > 0 && (
                  <>
                    <div className="SummarryBoxList">
                      <div className="leftSummBox">Subtotal (excl. GST)</div>
                      <div className="rightSummBox">₹ {formatAmount(exGstTotal)}</div>
                    </div>
                    <div className="SummarryBoxList" style={{ color: '#28a745' }}>
                      <div className="leftSummBox">Discount</div>
                      <div className="rightSummBox">- ₹ {discountAmount.toFixed(2)}</div>
                    </div>
                  </>
                )}
                <div className="SummarryBoxList bg-light">
                  <div className="leftSummBox fs-4 m-0">Total (excl. GST)</div>
                  <div className="rightSummBox fw-bold fs-3 m-0 text-webColor">
                    ₹ {formatAmount(finalTotal)}
                  </div>
                </div>
                <div className="SummarryBoxList">
                  <div className="leftSummBox">GST (18%)</div>
                  <div className="rightSummBox">₹ {formatAmount(finalTotal * 0.18)}</div>
                </div>
                <div className="SummarryBoxList bg-light">
                  <div className="leftSummBox fw-bold">Total Payable (incl. GST)</div>
                  <div className="rightSummBox fw-bold">₹ {formatAmount(finalTotal * 1.18)}</div>
                </div>
                {/* {discountAmount === 0 && (
                  <div className="SummarryBoxList">
                    <div className="leftSummBox">Subtotal (excl. GST)</div>
                    <div className="rightSummBox">₹ {formatAmount(exGstTotal)}</div>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {/* Offers Section */}
          {offers.length > 0 && (
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="">
                  <h5 className="mb-3 p-2 fw-bold" style={{ color: '#1d75d9' }}>Available Offers</h5>
                  {loadingOffers ? (
                    <p className="text-center py-3">Loading offers...</p>
                  ) : (
                    <div
                      style={{
                        maxHeight: offers.length > 3 ? '450px' : 'none',
                        overflowY: offers.length > 3 ? 'auto' : 'visible',
                        overflowX: 'hidden',
                        paddingRight: offers.length > 3 ? '8px' : '0',
                      }}
                      className={offers.length > 3 ? 'custom-scrollbar' : ''}
                    >
                      {offers.map((offer) => (
                        <div
                          key={offer._id}
                          onClick={() => handleOfferToggle(offer._id)}
                          style={{
                            cursor: 'pointer',
                            border: selectedOffers.includes(offer._id) 
                              ? '2px solid #1d75d9' 
                              : '1px solid #dee2e6',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: selectedOffers.includes(offer._id) 
                              ? '#f0f7ff' 
                              : '#ffffff',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedOffers.includes(offer._id)) {
                              e.currentTarget.style.borderColor = '#1d75d9';
                              e.currentTarget.style.backgroundColor = '#f8f9fa';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedOffers.includes(offer._id)) {
                              e.currentTarget.style.borderColor = '#dee2e6';
                              e.currentTarget.style.backgroundColor = '#ffffff';
                            }
                          }}
                        >
                          <div className="d-flex align-items-start">
                            <div className="form-check" style={{ marginRight: '1rem', marginTop: '0.25rem' }}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedOffers.includes(offer._id)}
                                onChange={() => handleOfferToggle(offer._id)}
                                style={{ 
                                  cursor: 'pointer',
                                  width: '1.25rem',
                                  height: '1.25rem',
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1 fw-bold" style={{ color: '#212529', margin: 0 }}>
                                    {offer.name}
                                  </h6>
                                  {offer.description && (
                                    <p className="text-muted small mb-0" style={{ fontSize: '0.875rem' }}>
                                      {offer.description}
                                    </p>
                                  )}
                                </div>
                                <span 
                                  className="badge"
                                  style={{
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    fontSize: '0.875rem',
                                    padding: '0.5rem 0.75rem',
                                    fontWeight: '600'
                                  }}
                                >
                                  {offer.discount}% OFF
                                </span>
                              </div>
                              <div className="d-flex align-items-center flex-wrap gap-2 mt-2">
                                {offer.code && (
                                  <span 
                                    className="badge"
                                    style={{
                                      backgroundColor: '#17a2b8',
                                      color: '#fff',
                                      fontSize: '0.75rem',
                                      padding: '0.35rem 0.65rem',
                                    }}
                                  >
                                    <i className="bi bi-tag-fill me-1"></i>
                                    Code: {offer.code}
                                  </span>
                                )}
                                {offer.validTill && (
                                  <span 
                                    className="text-muted"
                                    style={{ fontSize: '0.75rem' }}
                                  >
                                    <i className="bi bi-calendar3 me-1"></i>
                                    Valid till: {new Date(offer.validTill).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
