import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import demo from '../assets/images/demo.jpg';
import { useUser } from '../context/UserContext';

const SubscribePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { user: userData, loading } = useUser();

  const [activeType, setActiveType] = useState('digital');
  const [selectedPackages, setSelectedPackages] = useState([]);

  const registernow = () => {
    navigate('/registrationPage');
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const handlePackageChange = (location, duration, price) => {
    // Skip location check if it's a digital subscription
    if (user && activeType !== "digital") {
      if (!userData || (!userData.city && !userData.state)) {
        alert("Your location details are missing. Please update your profile.");
        return;
      }
  
      const userLocationMatches =
        userData.city?.toLowerCase() === location.toLowerCase() ||
        userData.state?.toLowerCase() === location.toLowerCase();
  
      if (!userLocationMatches) {
        alert("You can only subscribe to packages available in your city or state.");
        return;
      }
    }
  
    const packageKey = `${location}-${duration}`;
    setSelectedPackages((prev) => {
      const existing = prev.find((pkg) => pkg.key === packageKey);
      return existing
        ? prev.filter((pkg) => pkg.key !== packageKey) // Unselect
        : [...prev, { location, duration, price, key: packageKey }]; // Select
    });
  };
  


  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      alert('Please select at least one package.');
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
    // Pass subscription data in the redirect state
    navigate('/login', {
      state: {
        from: location.pathname,
        subscriptionType: activeType,
        packages: selectedPackages,
      },
    });
  };

  const packagesData = [
    { location: 'Mumbai', options: [{ duration: '1 year', price: 3500 }, { duration: '2 Year', price: 6000 }] },
    { location: 'Gujarat', options: [{ duration: '1 year', price: 2500 }, { duration: '2 Year', price: 3500 }] },
    { location: 'Chennai', options: [{ duration: '1 year', price: 2400 }, { duration: '2 Year', price: 4000 }] },
    { location: 'Delhi / NCR', options: [{ duration: '1 year', price: 2400 }, { duration: '2 Year', price: 4000 }] },
    { location: 'Kolkata', options: [{ duration: '1 year', price: 1200 }] },
    { location: 'Tuticorin', options: [{ duration: '1 year', price: 1000 }] },
    { location: 'Kochi', options: [{ duration: '1 year', price: 1000 }] },
  ];

  return (
    <>
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
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i> Seamless access on desktop & mobile browser
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i> Archives for the past 1 month
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i> You can have up to 3 devices linked to your
                              exim digital Copy subscription at any time
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i> All devices compatible
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="newspaper-container mt-3 text-center">
                          <img alt="home" className="w-100 border shadow-sm rounded-3" src={demo} />
                          <h6 role="button" onClick={() => navigate('/viewpage')} className="mt-3">
                            Exim Digital Copy Demo
                          </h6>
                          <button
                            onClick={() => navigate('/viewpage')}
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
                      <i className="bi bi-chevron-right"></i>Select a Packages
                    </div>
                  </div>
                  {packagesData.map((pkg) => (
                    <div key={pkg.location} className="col-md-3 col-6 mt-4">
                      <div className="packbox">
                        <div className="toppack">{pkg.location}</div>
                        <div className="botpack">
                          {pkg.options.map((option) => (
                            <div key={option.duration} className="form-check packinput">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`${pkg.location}-${option.duration}`}
                                checked={selectedPackages.some(
                                  (selectedPkg) =>
                                    selectedPkg.location === pkg.location && selectedPkg.duration === option.duration
                                )} // Ensure it only checks the matching package
                                onChange={() => handlePackageChange(pkg.location, option.duration, option.price)}
                              />

                              <label className="form-check-label" htmlFor={`${pkg.location}-${option.duration}`}>
                                <h3>{option.duration}</h3> <h5>₹ {option.price.toLocaleString()}</h5>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                            {/* <div className="loginGoogleBtn mb-4 p-3 fw-normal" onClick={registernow}>
                              <img alt="" className="me-2" src={gicon} /> Login with Gmail
                            </div>
                            <div className="Orbtn">
                              <p>OR</p>
                            </div> */}
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