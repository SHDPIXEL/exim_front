import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import demo from '../assets/images/demo.jpg';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api';
import { Modal, Button } from 'react-bootstrap';


const SubscribePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { user: userData, loading } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [activeType, setActiveType] = useState('digital');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [subscribedPackages, setSubscribedPackages] = useState([]); // Store user's subscribed packages

  const packagesData = [
    { location: 'Mumbai', options: [{ duration: '1 year', price: 3500 }, { duration: '2 Year', price: 6000 }] },
    { location: 'Gujarat', options: [{ duration: '1 year', price: 2500 }, { duration: '2 Year', price: 3500 }] },
    { location: 'Chennai', options: [{ duration: '1 year', price: 2400 }, { duration: '2 Year', price: 4000 }] },
    { location: 'Delhi / NCR', options: [{ duration: '1 year', price: 2400 }, { duration: '2 Year', price: 4000 }] },
    { location: 'Kolkata', options: [{ duration: '1 year', price: 1200 }] },
    { location: 'Tuticorin', options: [{ duration: '1 year', price: 1000 }] },
    { location: 'Kochi', options: [{ duration: '1 year', price: 1000 }] },
  ];


  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenSubscribeModal');
    if (!hasSeenModal) {
      setShowModal(true);
      sessionStorage.setItem('hasSeenSubscribeModal', 'true');
    }
  }, []);

  // Fetch user's subscribed packages
  useEffect(() => {
    if (!user) return;

    const fetchSubscribedPackages = async () => {
      try {
        const response = await API.post(
          "/services/get_userSubscription",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const subscriptions = response.data.userSubscription.map((sub) => ({
          location: sub.location,
          duration: sub.duration,
          type: sub.type,
          price: sub.price,
          expiryDate: new Date(sub.expiryDate),
          status: sub.paymentStatus || "Pending",
        }));

        setSubscribedPackages(subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed packages:", error);
        setSubscribedPackages([]);
      }
    };

    fetchSubscribedPackages();
  }, [user]);

  const registernow = () => {
    navigate('/registrationPage');
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
    setSelectedPackages([]);
  };

  const handlePackageChange = (location, duration, price) => {
    if (user && activeType !== "digital") {
      if (!userData || (!userData.city && !userData.state)) {
        showNotification("Your location details are missing. Please update your profile.", "info");
        return;
      }

      const userLocationMatches =
        userData.city?.toLowerCase() === location.toLowerCase() ||
        userData.state?.toLowerCase() === location.toLowerCase();

      if (!userLocationMatches) {
        showNotification("You can only subscribe to packages available in your city or state.", "info");
        return;
      }
    }

    setSelectedPackages((prev) => {
      const isSelected = prev.some(
        (pkg) => pkg.location === location && pkg.duration === duration
      );

      if (isSelected) {
        return prev.filter(
          (pkg) => !(pkg.location === location && pkg.duration === duration)
        );
      } else {
        return [
          ...prev.filter((pkg) => pkg.location !== location),
          { location, duration, price }
        ];
      }
    });
  };

  const handleRenewClick = (location, type) => {
    navigate('/paymentHistory', {
      state: {
        subscriptionType: type,
        packages: [{ location }],
      },
    });
  };

  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      showNotification("Please select at least one package.", "info");
      return;
    }
    navigate('/paymentSummary', {
      state: {
        subscriptionType: activeType,
        packages: selectedPackages,
      },
    });
  };

  const handleLoginRedirect = () => {
    navigate('/login', {
      state: {
        from: location.pathname,
        subscriptionType: activeType,
        packages: selectedPackages,
      },
    });
  };

  // Check if a package is subscribed and active
  const isPackageSubscribed = (location) => {
    return subscribedPackages.some(
      (sub) =>
        sub.location === location &&
        sub.type === activeType &&
        sub.status === "success" &&
        sub.expiryDate > new Date()
    );
  };

  // Check if a package is renewable (expired or within 30 days of expiry)
  const isPackageRenewable = (location) => {
    const sub = subscribedPackages.find(
      (s) => s.location === location && s.type === activeType
    );
    if (!sub || sub.status !== "success") return false;

    const today = new Date();
    const daysLeft = (sub.expiryDate - today) / (1000 * 60 * 60 * 24);
    return sub.expiryDate < today || daysLeft <= 30;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>

        <Modal.Header closeButton>
          <span className='modal-head-text'>📢 All Editions Now Available!</span>
        </Modal.Header>
        <Modal.Body closeButton>
          <span className='modal-text'>Subscribe today by choosing your preferred format: <b> Digital Copy, Hard Copy, or Both. </b> </span>
        </Modal.Body>
      </Modal>

      <div className="container mt-4 mb-4 border1 shadow-sm1 rounded-3">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="mb-3 fw-bold">Our Digital Copy & Hard Copy Subscription Details</h3>
          </div>
          <div className="col-md-3">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-12 mt-2 text-center">
                <h4>Select Subscription type</h4>
              </div>
              <div className="col-md-12 mt-2 col-6">
                <div
                  className={`scribeBox ${activeType === 'digital' ? 'active' : ''}`}
                  onClick={() => handleTypeClick('digital')}
                >
                  <div>Digital Copy</div>
                </div>
              </div>
              <div className="col-md-12 mt-3 col-6">
                <div
                  className={`scribeBox ${activeType === 'hard' ? 'active' : ''}`}
                  onClick={() => handleTypeClick('hard')}
                >
                  <div>Hard Copy</div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div
                  className={`scribeBox ${activeType === 'both' ? 'active' : ''}`}
                  onClick={() => handleTypeClick('both')}
                >
                  <div className="text-center">
                    Both <br />
                    <span>Digital Copy & Hard Copy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {activeType && (
            <div className="col-md-9 mt-5">
              <div className="border p-md-4 shadow-sm rounded-3 mt-1 p-2">
                {activeType !== 'hard' && (
                  <>
                    <div className="row mb-5 align-items-center">
                      <div className="col-lg-8">
                        <div className="scridata">
                          <h3 className="mb-4 text-webColor">
                            You are a step away from unlocking the digital copy elevate your daily news experience with
                            features :-
                          </h3>
                          <ul>
                            <li><i className="bi bi-arrow-right-circle-fill"></i> Seamless access on desktop & mobile browser</li>
                            <li><i className="bi bi-arrow-right-circle-fill"></i> Archives for the past 1 month</li>
                            <li><i className="bi bi-arrow-right-circle-fill"></i> Up to 3 devices linked</li>
                            <li><i className="bi bi-arrow-right-circle-fill"></i> All devices compatible</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="newspaper-container mt-3 text-center">
                          <img alt="home" className="w-100 border shadow-sm rounded-3" src={demo} />
                          <h6 role="button" onClick={() => navigate('/demo/viewpage')} className="mt-3">
                            Exim Digital Copy Demo
                          </h6>
                          <button
                            onClick={() => navigate('/demo/viewpage')}
                            className="dailySubscribebtn mt-3 mx-auto p-2"
                            style={{ width: '200px' }}
                          >
                            CLICK TO VIEW
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="borderbg mb-4"></div>
                  </>
                )}

                <div className="row mb-5">
                  <div className="col-md-12 mb-3">
                    <div className="webTittle">
                      <i className="bi bi-chevron-right"></i>Select a {activeType === "digital" ? "Digital Copy" : ( activeType === "hard" ? "Hard Copy" : "" )} Package
                    </div>
                  </div>
                  {packagesData.map((pkg) => {
                    const isSubscribed = isPackageSubscribed(pkg.location);
                    const isRenewable = true || isPackageRenewable(pkg.location);
                    return (
                      <div key={pkg.location} className="col-md-3 col-6 mt-4 position-relative z-1" >
                        {isSubscribed && isRenewable && (
                          <button
                            className="btn btn-primary position-absolute"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 10,
                            }}
                            onClick={() => handleRenewClick(pkg.location)} // define this function
                          >
                            Renew
                          </button>
                        )}
                        <div style={{ filter: isSubscribed ? 'blur(0.5px)' : 'none', opacity: isSubscribed ? '0.5' : '1' }}>
                          <div className="packbox" style={{ backgroundColor: isSubscribed ? '#f0f8ff' : '#fff' }}>
                            <div className="toppack">{pkg.location}</div>
                            <div className="botpack">
                              {pkg.options.map((option) => {
                                return (
                                  <div
                                    style={{ backgroundColor: isSubscribed ? '#f0f8ff' : '#fff' }}
                                    key={option.duration}
                                    className="form-check packinput p-2 border rounded mb-3"
                                  >
                                    <div >
                                      <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id={`${pkg.location}-${option.duration}`}
                                        checked={selectedPackages.some(
                                          (selectedPkg) =>
                                            selectedPkg.location === pkg.location &&
                                            selectedPkg.duration === option.duration
                                        )}
                                        onChange={() => handlePackageChange(pkg.location, option.duration, option.price)}
                                        disabled={isSubscribed && !isRenewable} // Disable if subscribed and not renewable
                                      />
                                      <label className="form-check-label" htmlFor={`${pkg.location}-${option.duration}`}>
                                        <h3 className="mb-1">{option.duration}</h3>
                                        <h5>₹ {option.price.toLocaleString()}</h5>
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}

                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="borderbg"></div>

                {user ? (
                  <div className="text-center mt-4">
                    <h4 className="mb-3">Continue to Payment</h4>
                    <button className="dailySubscribebtn fw-normal" onClick={handleContinue}>
                      CONTINUE
                    </button>
                  </div>
                ) : (
                  <div className="row mt-4 mt-5">
                    <div className="col-md-6 mb-3">
                      <div className="webTittle">
                        <i className="bi bi-chevron-right"></i>Signup Process
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="me-2 mb-0">Already a member?</p>{' '}
                        <button className="loginbtns" onClick={handleLoginRedirect}>
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <div className="signupform border p-4 text-center bg-light rounded-3">
                        <h4 className="mb-3">New Registration</h4>
                        <div className="row align-item-center justify-content-center">
                          <div className="col-md-5">
                            <button className="dailySubscribebtn mt-4 fw-normal" onClick={registernow}>
                              CUSTOM LOGIN
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="borderbg mt-5"></div>
        <div className="topFooter d-md-flex justify-content-center text-center">
          <p>
            <i className="bi bi-envelope-fill"></i>{' '}
            <Link to="mailto:subscription@exim-india.com">subscription@exim-india.com</Link>
          </p>
          <p>
            <i className="bi bi-telephone-fill"></i>{' '}
            <Link to="tel:022 67571400">022 67571400</Link>
          </p>
          <p>
            <i className="bi bi-clock-fill"></i> Monday to Sunday : 10AM to 6 PM
          </p>
        </div>
      </div>
    </>
  );
};

export default SubscribePage;