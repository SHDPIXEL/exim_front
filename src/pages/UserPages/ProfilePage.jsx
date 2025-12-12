import React, { useEffect, useState } from "react";
import googgleicon from "../../assets/images/Googleicon.png";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import API from "../../api";
import { useNotification } from "../../context/NotificationContext";
import ConfirmModal from "../../components/ConfirmModal";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const { user, loading, userSubscription } = useUser();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [showGstInput, setShowGstInput] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstLoading, setGstLoading] = useState(false);

  const [devices, setDevices] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const { showNotification } = useNotification();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      const response = await API.post("/services/forgot-password", { email });

      if (response.status === 200) {
        showNotification(
          "Password reset instructions sent to your email!",
          "info"
        );
        handleClose();
        setEmail("");
      } else {
        showNotification("Failed to send reset instructions.", "error");
      }
    } catch (error) {
      showNotification(error?.message, "error");
    }

    setButtonLoading(false); // Stop loading
  };

  const handleLogoutClick = (id) => {
    console.log("clicked : " + id);
    setSelectedDeviceId(id);
    setConfirmVisible(true);
  };

  const handleGstinSubmit = async () => {
    if (!gstNumber.trim()) {
      showNotification("Please enter GST Number", "error");
      return;
    }

    setGstLoading(true);

    try {
      const response = await API.post(
        "/app_users/update_gstin",
        { gstin: gstNumber.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data?.success) {
        showNotification("GST Number updated successfully!", "success");

        // Re-fetch ONLY gstin
        const details = await API.get("/app_users/getUserDetails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (details.data?.success) {
          // Update only GSTIN in context
          user.gstin = details.data.user.gstin;
        }

        setShowGstInput(false); // hide input
        setGstNumber(""); // reset input
      } else {
        showNotification("Failed to update GST", "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Error updating GST", "error");
    }

    setGstLoading(false);
  };

  const logoutDevice = async () => {
    setConfirmVisible(false);

    try {
      const response = await API.post(
        "/services/logout",
        { _id: selectedDeviceId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data?.success) {
        showNotification(
          "Successfully logged out from: " +
            (response.data?.loggedOutDevice?.device_name || selectedDeviceId),
          "success"
        );

        // Remove auth token and device info from localStorage no matter which device
        localStorage.removeItem("authToken");
        localStorage.removeItem("deviceId");
        localStorage.removeItem("deviceName");

        // Redirect to login page
        window.location.href = "/login";
      } else {
        showNotification(
          response.data?.message || "Failed to logout device",
          "error"
        );
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Show notification based on error type
      if (
        error.response?.status === 404 ||
        error.response?.data?.message?.includes("not found")
      ) {
        showNotification("Device was already logged out.", "info");
      } else {
        showNotification("Failed to logout device. Try again later", "error");
      }

      // Also remove auth token on error to force logout
      localStorage.removeItem("authToken");
      localStorage.removeItem("deviceId");
      localStorage.removeItem("deviceName");

      // Redirect to login page anyway
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    async function init() {
      try {
        const response = await API.post(
          "/services/get_device_name",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.data?.success) {
          setDevices(response.data.devices || []);
        } else {
          showNotification("Failed to fetch devices", "error");
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
        showNotification(
          "Something went wrong while fetching devices.",
          "error"
        );
      }
    }

    if (user) {
      init();
    }
  }, [user]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={logoutDevice}
        message="Are you sure you want to logout from this device?"
      />

      <div className="container border shadow-sm p-md-5 py-md-3">
        <div className="row mt-4">
          <div className="col-md-12 mt-4  text-center">
            <h2 className="text-center  fw-bold">Account Information </h2>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-person-rolodex text-webColor me-2"></i>{" "}
                  Personal information
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Company Name :</div>
                  <div>{user?.company_name}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Nature of Business :</div>
                  <div>{user?.nature_business}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Contact Person :</div>
                  <div>{user?.name}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">
                    Contact Person Designation :
                  </div>
                  <div>{user?.contact_person_designation}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Company Address :</div>
                  <div>{user?.company_address}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">GSTIN :</div>

                  {/* If GSTIN exists → show it */}
                  {user?.gstin ? (
                    <div>{user.gstin}</div>
                  ) : (
                    <>
                      {/* If GST input is hidden → show Add button */}
                      {!showGstInput && (
                        <Button size="sm" onClick={() => setShowGstInput(true)}>
                          Add GST Number
                        </Button>
                      )}

                      {/* Show Input + Submit */}
                      {showGstInput && (
                        <div
                          className="d-flex mt-2 align-items-center gap-2"
                          style={{ transition: "0.3s" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter GST Number"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value)}
                            style={{ maxWidth: "250px" }}
                          />

                          <Button
                            size="sm"
                            variant="success"
                            onClick={handleGstinSubmit}
                            disabled={gstLoading}
                          >
                            {gstLoading ? "Saving..." : "Submit"}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => setShowGstInput(false)}
                            disabled={gstLoading}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Phone Number :</div>
                  <div>+91 {user?.mobile}</div>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-person text-webColor me-2"></i> Account
                  settings
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Email :</div>
                  <div>{user?.email}</div>{" "}
                </li>
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Password :</div>
                  <button
                    className="btnlink text-webColor"
                    onClick={() => handleShow()}
                  >
                    Change Password
                  </button>{" "}
                </li>
                {/* <li className="list-group-item d-flex"><div className="w-50 fw-bold" >Manage two-factor authentication :</div><div><i className="bi bi-check-circle-fill text-success"></i> Enabled</div> </li> */}
                <li className="list-group-item d-flex">
                  <div className="w-50 fw-bold">Member since:</div>
                  <div>
                    {user?.createdAt
                      ? (() => {
                          const date = new Date(user.createdAt);
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const month = date
                            .toLocaleString("en-US", { month: "short" })
                            .toUpperCase();
                          const year = date.getFullYear();
                          return `${day} ${month} ${year}`;
                        })()
                      : "N/A"}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            {/* <div className="card" >
            <div className="card-header py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-share-fill  text-webColor me-2"></i> Social Logins</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex"><div className="w-50 fw-bold" ><img src={googgleicon} alt="" className="me-2" />Google :</div><div><i className="bi bi-check-circle-fill text-success"></i> Enabled</div></li>

            </ul>
          </div> */}
          </div>
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-person-lines-fill text-webColor me-2"></i>{" "}
                  Account Activity
                </h5>
              </div>
              <div className="p-3 pb-0">
                <div className="table-responsive ">
                  <table className="table table-bordered table-hover ">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Location</th>
                        <th scope="col">Login Time</th>
                        <th scope="col">Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.login_history?.map((log, index) => (
                        <tr key={index}>
                          <td>
                            {log.country || "N/A"}
                            {/* {log.country || log.ip
                            ? `${log.country || ""}${log.country && log.ip ? " (" : ""}${log.ip || ""}${log.country && log.ip ? ")" : ""}`
                            : "N/A"} */}
                          </td>
                          {log?.timestamp ? (
                            <td>{log.timestamp}</td>
                          ) : (
                            <td></td>
                          )}
                          {log?.device_name ? (
                            <td>{log.device_name}</td>
                          ) : (
                            <td>-</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-person-lines-fill text-webColor me-2"></i>{" "}
                  Devices (LoggedIn)
                </h5>
              </div>
              <div className="p-3 pb-0">
                <div className="row justify-content-center align-items-center py-4">
                  {devices.map((device) => (
                    <div className="col-md-4 justify-content-center align-items-center text-center d-flex flex-column">
                      <div className="d-flex justify-content-center align-items-center">
                        {device.os_name.toLowerCase() === "android" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 16.28125 0.03125 C 16.152344 0.0546875 16.019531 0.078125 15.90625 0.15625 C 15.449219 0.464844 15.347656 1.105469 15.65625 1.5625 L 17.8125 4.78125 C 14.480469 6.546875 11.996094 9.480469 11.1875 13 L 38.8125 13 C 38.003906 9.480469 35.519531 6.546875 32.1875 4.78125 L 34.34375 1.5625 C 34.652344 1.105469 34.550781 0.464844 34.09375 0.15625 C 33.632813 -0.152344 32.996094 -0.0195313 32.6875 0.4375 L 30.3125 3.9375 C 28.664063 3.335938 26.875 3 25 3 C 23.125 3 21.335938 3.335938 19.6875 3.9375 L 17.3125 0.4375 C 17.082031 0.09375 16.664063 -0.0429688 16.28125 0.03125 Z M 19.5 8 C 20.328125 8 21 8.671875 21 9.5 C 21 10.332031 20.328125 11 19.5 11 C 18.667969 11 18 10.332031 18 9.5 C 18 8.671875 18.667969 8 19.5 8 Z M 30.5 8 C 31.332031 8 32 8.671875 32 9.5 C 32 10.332031 31.332031 11 30.5 11 C 29.671875 11 29 10.332031 29 9.5 C 29 8.671875 29.671875 8 30.5 8 Z M 8 15 C 6.34375 15 5 16.34375 5 18 L 5 32 C 5 33.65625 6.34375 35 8 35 C 8.351563 35 8.6875 34.925781 9 34.8125 L 9 15.1875 C 8.6875 15.074219 8.351563 15 8 15 Z M 11 15 L 11 37 C 11 38.652344 12.347656 40 14 40 L 36 40 C 37.652344 40 39 38.652344 39 37 L 39 15 Z M 42 15 C 41.648438 15 41.3125 15.074219 41 15.1875 L 41 34.8125 C 41.3125 34.921875 41.648438 35 42 35 C 43.65625 35 45 33.65625 45 32 L 45 18 C 45 16.34375 43.65625 15 42 15 Z M 15 42 L 15 46 C 15 48.207031 16.792969 50 19 50 C 21.207031 50 23 48.207031 23 46 L 23 42 Z M 27 42 L 27 46 C 27 48.207031 28.792969 50 31 50 C 33.207031 50 35 48.207031 35 46 L 35 42 Z"></path>
                          </svg>
                        ) : device.os_name.toLowerCase() === "windows" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                          >
                            <path d="M19.852 7.761l-15 2.25C4.362 10.085 4 10.505 4 11v12c0 .553.448 1 1 1h15c.552 0 1-.447 1-1V8.75c0-.291-.127-.567-.348-.758C20.432 7.803 20.139 7.721 19.852 7.761zM45.652 4.242c-.22-.189-.512-.271-.801-.231l-21 3.15C23.362 7.235 23 7.655 23 8.15V23c0 .553.448 1 1 1h21c.552 0 1-.447 1-1V5C46 4.709 45.873 4.433 45.652 4.242zM20 26H5c-.552 0-1 .447-1 1v12c0 .495.362.915.852.989l15 2.25c.05.007.099.011.148.011.238 0 .47-.085.652-.242C20.873 41.817 21 41.541 21 41.25V27C21 26.447 20.552 26 20 26zM45 26H24c-.552 0-1 .447-1 1v14.85c0 .495.362.915.852.989l21 3.15C44.901 45.996 44.951 46 45 46c.238 0 .47-.085.652-.242C45.873 45.567 46 45.291 46 45V27C46 26.447 45.552 26 45 26z"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 16 3 C 9.38 3 4 8.38 4 15 L 4 35 C 4 41.62 9.38 47 16 47 L 36 47 C 42.62 47 48 41.62 48 35 L 48 15 C 48 8.38 42.62 3 36 3 L 16 3 z M 12.619141 18.070312 C 13.319141 18.070312 13.839844 18.570469 13.839844 19.230469 C 13.839844 19.880469 13.319141 20.380859 12.619141 20.380859 C 11.909141 20.380859 11.390625 19.880469 11.390625 19.230469 C 11.390625 18.570469 11.909141 18.070312 12.619141 18.070312 z M 23.039062 18.640625 C 26.689062 18.640625 28.939453 21.189297 28.939453 25.279297 C 28.939453 29.359297 26.709062 31.929688 23.039062 31.929688 C 19.349062 31.929688 17.109375 29.369297 17.109375 25.279297 C 17.109375 21.179297 19.399062 18.640625 23.039062 18.640625 z M 35.970703 18.640625 C 38.540703 18.640625 40.419062 20.139297 40.539062 22.279297 L 38.619141 22.279297 C 38.429141 21.109297 37.419453 20.380859 35.939453 20.380859 C 34.379453 20.380859 33.349609 21.119531 33.349609 22.269531 C 33.349609 23.169531 34.009922 23.690078 35.669922 24.080078 L 37.060547 24.419922 C 39.670547 25.029922 40.740234 26.080234 40.740234 27.990234 C 40.740234 30.420234 38.859609 31.939453 35.849609 31.939453 C 33.039609 31.939453 31.149766 30.490703 31.009766 28.220703 L 32.960938 28.220703 C 33.130938 29.420703 34.31 30.189453 36 30.189453 C 37.58 30.189453 38.740234 29.370234 38.740234 28.240234 C 38.740234 27.280234 38.010078 26.700781 36.330078 26.300781 L 34.689453 25.910156 C 32.399453 25.370156 31.349609 24.260391 31.349609 22.400391 C 31.349609 20.140391 33.200703 18.640625 35.970703 18.640625 z M 23.039062 20.470703 C 20.649062 20.470703 19.130859 22.339297 19.130859 25.279297 C 19.130859 28.209297 20.599062 30.099609 23.039062 30.099609 C 25.449062 30.099609 26.929688 28.209297 26.929688 25.279297 C 26.929688 22.339297 25.449063 20.470703 23.039062 20.470703 z M 11.679688 22.060547 L 13.560547 22.060547 L 13.560547 31.630859 L 11.679688 31.630859 L 11.679688 22.060547 z"></path>
                          </svg>
                        )}
                      </div>
                      <p className="mt-2">{device.device_name}</p>

                      <button
                        className="pasdatbox px-2 py-1 bg-danger border-0 hover:bg-danger-10"
                        style={{ height: "auto" }}
                        onClick={() => {
                          handleLogoutClick(device._id);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
            <Modal.Header closeButton className="py-2">
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-md-5 py-md-4 p-3 bg-light">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Enter your Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="webinput"
                  />
                </Form.Group>
                <button
                  className="mt-4 mb-4 dailySubscribebtn p-2 w-50 w-100 mx-auto d-table"
                  type="submit"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? "Submitting..." : "Submit"}
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
