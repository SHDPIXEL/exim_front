import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import demo from "../assets/images/demo.jpg";
import { useUser } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import API from "../api";
import { Modal, Button } from "react-bootstrap";

const SubscribePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { user: userData, loading } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [activeType, setActiveType] = useState("digital");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showHardCopyInfo, setShowHardCopyInfo] = useState(false);
  const [subscribedPackages, setSubscribedPackages] = useState([]); // Store user's subscribed packages

  const [hardSD, setHardSD] = useState([]);
  const [digitalSD, setDigitalSD] = useState([]);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenSubscribeModal");
    if (!hasSeenModal) {
      setShowModal(true);
      sessionStorage.setItem("hasSeenSubscribeModal", "true");
    }
  }, []);

  // Fetch user's subscribed packages
  useEffect(() => {
    const fetchSubscribedPackages = async () => {
      try {
        const response = await API.get("/services/get_packages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        setHardSD(response.data?.hard || []);
        setDigitalSD(response.data?.digital || []);
      } catch (error) {
        console.error("Error fetching subscribed packages:", error);
        setSubscribedPackages([]);
      }
    };

    fetchSubscribedPackages();
  }, [user]);

  const registernow = () => {
    navigate("/registrationPage");
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
    setSelectedPackages([]);
  };

  const userLocationMatches = (location) => {
    return (
      userData.city?.toLowerCase() === location.toLowerCase() ||
      userData.state?.toLowerCase() === location.toLowerCase()
    );
  };

  const handlePackageChange = (location, duration, price, type = null, id) => {
    setSelectedPackages((prev) => {
      const filtered = prev.filter(
        (pkg) => !(pkg.location === location && pkg.type === type)
      );

      // Add the new one
      return [...filtered, { location, duration, price, type, id }];
    });
  };

  const handleRenewClick = (location, type) => {
    navigate("/paymentHistory", {
      state: {
        subscriptionType: type,
        packages: [{ location }],
      },
    });
  };

  const packageData = (activeType) => {
    return activeType === "digital" ? digitalSD : hardSD;
  };

  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      showNotification("Please select at least one package.", "info");
      return;
    }

    if (activeType === "hard") {
      setShowHardCopyInfo(true); // Show the info modal
      return; // Prevent navigation
    }

    navigate("/paymentSummary", {
      state: {
        subscriptionType: activeType,
        packages: selectedPackages,
      },
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login", {
      state: {
        redirect: "/subscribePage",
        from: location.pathname,
        subscriptionType: activeType,
        packages: selectedPackages,
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Modal
        show={showHardCopyInfo}
        onHide={() => setShowHardCopyInfo(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Important Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            For <strong>hard copy subscriptions</strong>, kindly reach out to
            the branch office.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowHardCopyInfo(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-4 mb-4 border1 shadow-sm1 rounded-3">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="mb-3 fw-bold">
              Our Digital Copy & Hard Copy Subscription Details
            </h3>
          </div>
          <div className="col-md-3">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-12 mt-2 text-center">
                <h4>Select Subscription type</h4>
              </div>
              <div className="col-md-12 mt-2 col-6">
                <div
                  className={`scribeBox ${
                    activeType === "digital" ? "active" : ""
                  }`}
                  onClick={() => handleTypeClick("digital")}
                >
                  <div>Digital Copy</div>
                </div>
              </div>
              <div className="col-md-12 mt-3 col-6">
                <div
                  className={`scribeBox ${
                    activeType === "hard" ? "active" : ""
                  }`}
                  onClick={() => handleTypeClick("hard")}
                >
                  <div>Hard Copy</div>
                </div>
              </div>
            </div>
          </div>

          {activeType && (
            <div className="col-md-9 mt-5">
              {activeType === "digital" ? (
                <>
                  {/* DIGITAL COPY CONTENT START */}
                  <div className="border p-md-4 shadow-sm rounded-3 mt-1 p-2">
                    <div className="row mb-5 align-items-center">
                      <div className="col-lg-8">
                        <div className="scridata">
                          <h3 className="mb-4 text-webColor">
                            You are a step away from unlocking the digital copy
                            elevate your daily news experience with features :-
                          </h3>
                          <ul>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i>{" "}
                              Seamless access on desktop & mobile browser
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i>{" "}
                              Archives for the past 1 month
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i>{" "}
                              Up to 3 devices linked
                            </li>
                            <li>
                              <i className="bi bi-arrow-right-circle-fill"></i>{" "}
                              All devices compatible
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="newspaper-container mt-3 text-center">
                          <img
                            alt="home"
                            className="w-100 border shadow-sm rounded-3"
                            src={demo}
                          />
                          <h6
                            role="button"
                            onClick={() => navigate("/demo/viewpage")}
                            className="mt-3"
                          >
                            Exim Digital Copy Demo
                          </h6>
                          <button
                            onClick={() => navigate("/demo/viewpage")}
                            className="dailySubscribebtn mt-3 mx-auto p-2"
                            style={{ width: "200px" }}
                          >
                            CLICK TO VIEW
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="mb-3 col-md-12">
                        <div className="webTittle">
                          <i className="bi bi-chevron-right"></i>Select a
                          Digital Copy Package
                        </div>
                      </div>

                      {packageData("digital").map((pkg) => {
                        const isRenewable = pkg.isRenewable;
                        const canSubscribe = pkg.canSubscribe;

                        return (
                          <div
                            key={pkg.location}
                            className="col-md-3 col-6 mt-4 position-relative z-1"
                          >
                            {isRenewable && (
                              <button
                                className="btn btn-primary position-absolute"
                                style={{
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  zIndex: 10,
                                }}
                                onClick={() =>
                                  handleRenewClick(pkg.location, "digital")
                                }
                              >
                                Renew
                              </button>
                            )}
                            <div
                              style={{
                                filter: canSubscribe
                                  ? "none"
                                  : "blur(0.5px) grayscale(100%)",
                                opacity: canSubscribe ? "1" : "0.4",
                                pointerEvents: canSubscribe ? "all" : "none",
                              }}
                            >
                              <div
                                className="packbox"
                                style={{
                                  backgroundColor: canSubscribe
                                    ? "#fff"
                                    : "#f0f8ff",
                                }}
                              >
                                <div className="toppack">{pkg.location}</div>
                                <div className="botpack">
                                  {pkg.options.map((option) => (
                                    <div
                                      style={{
                                        backgroundColor: canSubscribe
                                          ? "#fff"
                                          : "#f0f8ff",
                                      }}
                                      key={option.duration}
                                      className="form-check packinput p-2 border rounded mb-3"
                                    >
                                      <div>
                                        <input
                                          className="form-check-input me-2"
                                          type="radio"
                                          name={`${pkg.location}-digital`}
                                          id={`${pkg.locationId}-${option.id}-digital`}
                                          checked={selectedPackages.some(
                                            (selectedPkg) =>
                                              selectedPkg.location ===
                                                pkg.location &&
                                              selectedPkg.duration ===
                                                option.duration &&
                                              selectedPkg.type === "digital"
                                          )}
                                          onChange={() =>
                                            handlePackageChange(
                                              pkg.location,
                                              option.duration,
                                              option.price,
                                              "digital",
                                              `${pkg.locationId}:${option.id}`
                                            )
                                          }
                                          disabled={!canSubscribe}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`${pkg.locationId}-${option.id}-digital`}
                                        >
                                          <h3 className="mb-1">
                                            {option.duration}
                                          </h3>
                                          <h5>
                                            ₹ {option.withoutgst.toLocaleString()}
                                          </h5>
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="borderbg"></div>

                    {user ? (
                      <div className="text-center mt-4">
                        <h4 className="mb-3">Continue to Payment</h4>
                        <button
                          className="dailySubscribebtn fw-normal"
                          onClick={handleContinue}
                        >
                          CONTINUE
                        </button>
                      </div>
                    ) : (
                      <div className="row mt-4 mt-5">
                        <div className="col-md-6 mb-3">
                          <div className="webTittle">
                            <i className="bi bi-chevron-right"></i>Signup
                            Process
                          </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="me-2 mb-0">Already a member?</p>{" "}
                            <button
                              className="loginbtns"
                              onClick={handleLoginRedirect}
                            >
                              Login
                            </button>
                          </div>
                        </div>
                        <div className="col-md-12 mt-3">
                          <div className="signupform border p-4 text-center bg-light rounded-3">
                            <h4 className="mb-3">New Registration</h4>
                            <div className="row align-item-center justify-content-center">
                              <div className="col-md-5">
                                <button
                                  className="dailySubscribebtn mt-4 fw-normal"
                                  onClick={registernow}
                                >
                                  Register
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* DIGITAL COPY CONTENT END */}
                </>
              ) : (
                <div className="text-center p-5">
                  <h4>
                    {" "}
                    <p>
                      For <strong>Hard copy subscriptions</strong>, kindly reach
                      out to the branch office.
                    </p>
                  </h4>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="borderbg mt-5"></div>
        <div className="topFooter d-md-flex justify-content-center text-center">
          <p>
            <i className="bi bi-envelope-fill"></i>{" "}
            <Link to="mailto:subscription@exim-india.com">
              subscription@exim-india.com
            </Link>
          </p>
          <p>
            <i className="bi bi-telephone-fill"></i>{" "}
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

// return (
//   <>
//     {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//       <Modal.Header closeButton>
//         <span className="modal-head-text">
//           📢 All Editions Now Available!
//         </span>
//       </Modal.Header>
//       <Modal.Body closeButton>
//         <span className="modal-text">
//           Subscribe today by choosing your preferred format:{" "}
//           <b> Digital Copy, Hard Copy, or Both. </b>{" "}
//         </span>
//       </Modal.Body>
//     </Modal> */}

//     <Modal
//       show={showHardCopyInfo}
//       onHide={() => setShowHardCopyInfo(false)}
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Important Information</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           For <strong>hard copy subscriptions</strong>, kindly reach out to
//           the branch office.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="primary" onClick={() => setShowHardCopyInfo(false)}>
//           OK
//         </Button>
//       </Modal.Footer>
//     </Modal>

//     <div className="container mt-4 mb-4 border1 shadow-sm1 rounded-3">
//       <div className="row">
//         <div className="col-lg-12 text-center">
//           <h3 className="mb-3 fw-bold">
//             Our Digital Copy & Hard Copy Subscription Details
//           </h3>
//         </div>
//         <div className="col-md-3">
//           <div className="row justify-content-center align-items-center">
//             <div className="col-md-12 mt-2 text-center">
//               <h4>Select Subscription type</h4>
//             </div>
//             <div className="col-md-12 mt-2 col-6">
//               <div
//                 className={`scribeBox ${
//                   activeType === "digital" ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("digital")}
//               >
//                 <div>Digital Copy</div>
//               </div>
//             </div>
//             <div className="col-md-12 mt-3 col-6">
//               <div
//                 className={`scribeBox ${
//                   activeType === "hard" ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("hard")}
//               >
//                 <div>Hard Copy</div>
//               </div>
//             </div>
//             {/* <div className="col-md-12 mt-3">
//               <div
//                 className={`scribeBox ${activeType === 'both' ? 'active' : ''}`}
//                 onClick={() => handleTypeClick('both')}
//               >
//                 <div className="text-center">
//                   Both <br />
//                   <span>Digital Copy & Hard Copy</span>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//         {activeType && (
//           <div className="col-md-9 mt-5">
//             <div className="border p-md-4 shadow-sm rounded-3 mt-1 p-2">
//               {activeType !== "hard" && (
//                 <>
//                   <div className="row mb-5 align-items-center">
//                     <div className="col-lg-8">
//                       <div className="scridata">
//                         <h3 className="mb-4 text-webColor">
//                           You are a step away from unlocking the digital copy
//                           elevate your daily news experience with features :-
//                         </h3>
//                         <ul>
//                           <li>
//                             <i className="bi bi-arrow-right-circle-fill"></i>{" "}
//                             Seamless access on desktop & mobile browser
//                           </li>
//                           <li>
//                             <i className="bi bi-arrow-right-circle-fill"></i>{" "}
//                             Archives for the past 1 month
//                           </li>
//                           <li>
//                             <i className="bi bi-arrow-right-circle-fill"></i>{" "}
//                             Up to 3 devices linked
//                           </li>
//                           <li>
//                             <i className="bi bi-arrow-right-circle-fill"></i>{" "}
//                             All devices compatible
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="newspaper-container mt-3 text-center">
//                         <img
//                           alt="home"
//                           className="w-100 border shadow-sm rounded-3"
//                           src={demo}
//                         />
//                         <h6
//                           role="button"
//                           onClick={() => navigate("/demo/viewpage")}
//                           className="mt-3"
//                         >
//                           Exim Digital Copy Demo
//                         </h6>
//                         <button
//                           onClick={() => navigate("/demo/viewpage")}
//                           className="dailySubscribebtn mt-3 mx-auto p-2"
//                           style={{ width: "200px" }}
//                         >
//                           CLICK TO VIEW
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="borderbg mb-4"></div>
//                 </>
//               )}

//               {activeType !== "both" && (
//                 <div className="row mb-5">
//                   <div
//                     className={
//                       activeType === "digital"
//                         ? "mb-3 col-md-12"
//                         : "mb-1 col-md-12"
//                     }
//                   >
//                     <div className="webTittle">
//                       <i className="bi bi-chevron-right"></i>Select a{" "}
//                       {activeType === "digital"
//                         ? "Digital Copy"
//                         : "Hard Copy"}{" "}
//                       Package
//                     </div>
//                   </div>
//                   {activeType === "hard" && (
//                     <small className="mb-3">
//                       Hard copies for this state or city will only be
//                       delivered if your address is within that location.{" "}
//                     </small>
//                   )}

//                   {packageData(activeType).map((pkg) => {
//                     const isRenewable = pkg.isRenewable;
//                     const canSubscribe = pkg.canSubscribe;

//                     return (
//                       <div
//                         key={pkg.location}
//                         className="col-md-3 col-6 mt-4 position-relative z-1"
//                       >
//                         {isRenewable && (
//                           <button
//                             className="btn btn-primary position-absolute"
//                             style={{
//                               top: "50%",
//                               left: "50%",
//                               transform: "translate(-50%, -50%)",
//                               zIndex: 10,
//                             }}
//                             onClick={() => handleRenewClick(pkg.location)} // define this function
//                           >
//                             Renew
//                           </button>
//                         )}
//                         <div
//                           style={{
//                             filter: canSubscribe
//                               ? "none"
//                               : "blur(0.5px) grayscale(100%)",
//                             opacity: canSubscribe ? "1" : "0.4",
//                             pointerEvents: canSubscribe ? "all" : "none",
//                           }}
//                         >
//                           <div
//                             className="packbox"
//                             style={{
//                               backgroundColor: canSubscribe
//                                 ? "#fff"
//                                 : "#f0f8ff",
//                             }}
//                           >
//                             <div className="toppack">{pkg.location}</div>
//                             <div className="botpack">
//                               {pkg.options.map((option) => {
//                                 return (
//                                   <div
//                                     style={{
//                                       backgroundColor: canSubscribe
//                                         ? "#fff"
//                                         : "#f0f8ff",
//                                     }}
//                                     key={option.duration}
//                                     className="form-check packinput p-2 border rounded mb-3"
//                                   >
//                                     <div>
//                                       <input
//                                         className="form-check-input me-2"
//                                         type="radio"
//                                         name={`${pkg.location}-${activeType}`}
//                                         id={`${pkg.locationId}-${option.id}-${activeType}`}
//                                         checked={selectedPackages.some(
//                                           (selectedPkg) =>
//                                             selectedPkg.location ===
//                                               pkg.location &&
//                                             selectedPkg.duration ===
//                                               option.duration &&
//                                             selectedPkg.type === activeType
//                                         )}
//                                         onChange={() =>
//                                           handlePackageChange(
//                                             pkg.location,
//                                             option.duration,
//                                             option.price,
//                                             activeType,
//                                             `${pkg.locationId}:${option.id}`
//                                           )
//                                         }
//                                         disabled={!canSubscribe} // Disable if subscribed and not renewable
//                                       />
//                                       <label
//                                         className="form-check-label"
//                                         htmlFor={`${pkg.locationId}-${option.id}-${activeType}`}
//                                       >
//                                         <h3 className="mb-1">
//                                           {option.duration}
//                                         </h3>
//                                         <h5>
//                                           ₹ {option.price.toLocaleString()}
//                                         </h5>
//                                       </label>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {activeType === "both" && (
//                 <>
//                   <div className="row mb-5">
//                     <div className="col-md-12 mb-3">
//                       <div className="webTittle">
//                         <i className="bi bi-chevron-right"></i>Select a
//                         Digital Copy Package
//                       </div>
//                     </div>
//                     {packageData("digital").map((pkg) => {
//                       const isRenewable = pkg.isRenewable;
//                       const canSubscribeDigital = pkg.canSubscribe;
//                       return (
//                         <div
//                           key={pkg.location}
//                           className="col-md-3 col-6 mt-4 position-relative z-1"
//                         >
//                           {isRenewable && (
//                             <button
//                               className="btn btn-primary position-absolute"
//                               style={{
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                                 zIndex: 10,
//                               }}
//                               onClick={() => handleRenewClick(pkg.location)} // define this function
//                             >
//                               Renew
//                             </button>
//                           )}
//                           <div
//                             style={{
//                               filter: canSubscribeDigital
//                                 ? "none"
//                                 : "blur(0.5px) grayscale(100%)",
//                               opacity: canSubscribeDigital ? "1" : "0.4",
//                               pointerEvents: canSubscribeDigital
//                                 ? "all"
//                                 : "none",
//                             }}
//                           >
//                             <div
//                               className="packbox"
//                               style={{
//                                 backgroundColor: canSubscribeDigital
//                                   ? "#fff"
//                                   : "#f0f8ff",
//                               }}
//                             >
//                               <div className="toppack">{pkg.location}</div>
//                               <div className="botpack">
//                                 {pkg.options.map((option) => {
//                                   return (
//                                     <div
//                                       style={{
//                                         backgroundColor: canSubscribeDigital
//                                           ? "#fff"
//                                           : "#f0f8ff",
//                                       }}
//                                       key={option.duration}
//                                       className="form-check packinput p-2 border rounded mb-3"
//                                     >
//                                       <div>
//                                         <input
//                                           className="form-check-input me-2"
//                                           type="radio"
//                                           name={`${pkg.location}-both-digital`}
//                                           id={`${pkg.locationId}-${option.id}-digital`}
//                                           checked={selectedPackages.some(
//                                             (selectedPkg) =>
//                                               selectedPkg.location ===
//                                                 pkg.location &&
//                                               selectedPkg.duration ===
//                                                 option.duration &&
//                                               selectedPkg.type === "digital"
//                                           )}
//                                           onChange={() =>
//                                             handlePackageChange(
//                                               pkg.location,
//                                               option.duration,
//                                               option.price,
//                                               "digital",
//                                               `${pkg.locationId}:${option.id}`
//                                             )
//                                           }
//                                           disabled={!canSubscribeDigital} // Disable if subscribed and not renewable
//                                         />
//                                         <label
//                                           className="form-check-label"
//                                           htmlFor={`${pkg.location}-${option.id}-digital`}
//                                         >
//                                           <h3 className="mb-1">
//                                             {option.duration}
//                                           </h3>
//                                           <h5>
//                                             ₹ {option.price.toLocaleString()}
//                                           </h5>
//                                         </label>
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* <div className="row mb-5">
//                     <div className="col-md-12 mb-1">
//                       <div className="webTittle">
//                         <i className="bi bi-chevron-right"></i>Select a Hard
//                         Copy Package
//                       </div>
//                     </div>
//                     <small className="mb-3">
//                       Hard copies for this state or city will only be
//                       delivered if your address is within that location.{" "}
//                     </small>
//                     {packageData("hard").map((pkg) => {
//                       const isRenewable = pkg.isRenewable;
//                       const canSubscribeHard = pkg.canSubscribe;
//                       return (
//                         <div
//                           key={pkg.location}
//                           className="col-md-3 col-6 mt-4 position-relative z-1"
//                         >
//                           {isRenewable && (
//                             <button
//                               className="btn btn-primary position-absolute"
//                               style={{
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                                 zIndex: 10,
//                               }}
//                               onClick={() => handleRenewClick(pkg.location)} // define this function
//                             >
//                               Renew
//                             </button>
//                           )}
//                           <div
//                             style={{
//                               filter: canSubscribeHard
//                                 ? "none"
//                                 : "blur(0.5px) grayscale(100%)",
//                               opacity: canSubscribeHard ? "1" : "0.4",
//                               pointerEvents: canSubscribeHard
//                                 ? "all"
//                                 : "none",
//                             }}
//                           >
//                             <div
//                               className="packbox"
//                               style={{
//                                 backgroundColor: canSubscribeHard
//                                   ? "#fff"
//                                   : "#f0f8ff",
//                               }}
//                             >
//                               <div className="toppack">{pkg.location}</div>
//                               <div className="botpack">
//                                 {pkg.options.map((option) => {
//                                   return (
//                                     <div
//                                       style={{
//                                         backgroundColor: canSubscribeHard
//                                           ? "#fff"
//                                           : "#f0f8ff",
//                                       }}
//                                       key={option.duration}
//                                       className="form-check packinput p-2 border rounded mb-3"
//                                     >
//                                       <div>
//                                         <input
//                                           className="form-check-input me-2"
//                                           type="radio"
//                                           name={`${pkg.location}-both-hard`}
//                                           id={`${pkg.locationId}-${option.id}-hard`}
//                                           checked={selectedPackages.some(
//                                             (selectedPkg) =>
//                                               selectedPkg.location ===
//                                                 pkg.location &&
//                                               selectedPkg.duration ===
//                                                 option.duration &&
//                                               selectedPkg.type === "hard"
//                                           )}
//                                           onChange={() =>
//                                             handlePackageChange(
//                                               pkg.location,
//                                               option.duration,
//                                               option.price,
//                                               "hard",
//                                               `${pkg.locationId}:${option.id}`
//                                             )
//                                           }
//                                           disabled={!canSubscribeHard} // Disable if subscribed and not renewable
//                                         />
//                                         <label
//                                           className="form-check-label"
//                                           htmlFor={`${pkg.location}-${option.id}-both-hard`}
//                                         >
//                                           <h3 className="mb-1">
//                                             {option.duration}
//                                           </h3>
//                                           <h5>
//                                             ₹ {option.price.toLocaleString()}
//                                           </h5>
//                                         </label>
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div> */}
//                 </>
//               )}

//               <div className="borderbg"></div>

//               {user ? (
//                 <div className="text-center mt-4">
//                   <h4 className="mb-3">Continue to Payment</h4>
//                   <button
//                     className="dailySubscribebtn fw-normal"
//                     onClick={handleContinue}
//                   >
//                     CONTINUE
//                   </button>
//                 </div>
//               ) : (
//                 <div className="row mt-4 mt-5">
//                   <div className="col-md-6 mb-3">
//                     <div className="webTittle">
//                       <i className="bi bi-chevron-right"></i>Signup Process
//                     </div>
//                   </div>
//                   <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <p className="me-2 mb-0">Already a member?</p>{" "}
//                       <button
//                         className="loginbtns"
//                         onClick={handleLoginRedirect}
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </div>
//                   <div className="col-md-12 mt-3">
//                     <div className="signupform border p-4 text-center bg-light rounded-3">
//                       <h4 className="mb-3">New Registration</h4>
//                       <div className="row align-item-center justify-content-center">
//                         <div className="col-md-5">
//                           <button
//                             className="dailySubscribebtn mt-4 fw-normal"
//                             onClick={registernow}
//                           >
//                             Register
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="borderbg mt-5"></div>
//       <div className="topFooter d-md-flex justify-content-center text-center">
//         <p>
//           <i className="bi bi-envelope-fill"></i>{" "}
//           <Link to="mailto:subscription@exim-india.com">
//             subscription@exim-india.com
//           </Link>
//         </p>
//         <p>
//           <i className="bi bi-telephone-fill"></i>{" "}
//           <Link to="tel:022 67571400">022 67571400</Link>
//         </p>
//         <p>
//           <i className="bi bi-clock-fill"></i> Monday to Sunday : 10AM to 6 PM
//         </p>
//       </div>
//     </div>
//   </>
// );
