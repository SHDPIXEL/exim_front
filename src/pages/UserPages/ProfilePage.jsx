import React, { useState } from "react";
import googgleicon from "../../assets/images/Googleicon.png";
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useUser } from "../../context/UserContext";
import API from "../../api";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const { user, loading, userSubscription } = useUser();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true);
  };

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
  
    try {
      const response = await API.post("/services/forgot-password", { email });
  
      if (response.data.success) {
        alert("Password reset instructions sent to your email!");
        handleClose();  // Close the modal
        setEmail("");    // Clear the email field
      } else {
        alert(response.data.message || "Failed to send reset instructions.");
      }
    } catch (error) {
      alert(error?.message || "An error occurred while sending the reset request.");
      console.error("Forgot password error:", error);
    }
  
    setButtonLoading(false); // Stop loading
  };



  return (

    <div className="container border shadow-sm p-md-5 py-md-3">
      <div className="row mt-4">
        <div className="col-md-12 mt-4  text-center">
          <h2 className='text-center  fw-bold'>Account Information </h2>

        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-12 mb-4">
          <div class="card" >
            <div class="card-header py-3">
              <h5 className="mb-0 fw-bold"><i class="bi bi-person-rolodex text-webColor me-2"></i> Personal information</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Company Name  :</div><div>{user?.company_name}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Nature of Business :</div><div>{user?.nature_business}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Contact Person :</div><div>{user?.name}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Contact Person Designation :</div><div>{user?.contact_person_designation}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Company Address :</div><div>{user?.company_address}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Phone Number :</div><div>+91 {user?.mobile}</div> </li>
            </ul>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          <div class="card" >
            <div class="card-header py-3">
              <h5 className="mb-0 fw-bold"><i class="bi bi-person text-webColor me-2"></i> Account settings</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Email :</div><div>{user?.email}</div> </li>
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Password :</div><button className="btnlink text-webColor" onClick={() => handleShow()}>Change Password</button> </li>
              {/* <li class="list-group-item d-flex"><div className="w-50 fw-bold" >Manage two-factor authentication :</div><div><i class="bi bi-check-circle-fill text-success"></i> Enabled</div> </li> */}
              <li className="list-group-item d-flex">
                <div className="w-50 fw-bold">Member since:</div>
                <div>
                  {new Date(user?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          {/* <div class="card" >
            <div class="card-header py-3">
              <h5 className="mb-0 fw-bold"><i class="bi bi-share-fill  text-webColor me-2"></i> Social Logins</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex"><div className="w-50 fw-bold" ><img src={googgleicon} alt="" className="me-2" />Google :</div><div><i class="bi bi-check-circle-fill text-success"></i> Enabled</div></li>

            </ul>
          </div> */}
        </div>
        <div className="col-md-12 mb-4">
          <div class="card" >
            <div class="card-header py-3">
              <h5 className="mb-0 fw-bold"><i class="bi bi-person-lines-fill text-webColor me-2"></i> Account Activity</h5>
            </div>
            <div className="p-3 pb-0">

              <div className="table-responsive ">
                <table className="table table-bordered table-hover ">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Current login</th>
                      {/* <th scope="col">Device</th> */}
                      <th scope="col">Location</th>
                      <th scope="col">First login</th>
                      {/* <th scope="col">login type</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {user?.login_history?.map((log, index) => (
                      <tr key={index}>
                        {log?.timestamp ? <td>{log.timestamp}</td> : <td></td>}

                        <td>
                          {log.country || log.ip
                            ? `${log.country || ""}${log.country && log.ip ? " (" : ""}${log.ip || ""}${log.country && log.ip ? ")" : ""}`
                            : "N/A"}
                        </td>

                        <td>
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                            : "N/A"}
                        </td>
                      </tr>
                    ))}


                  </tbody>

                </table>
              </div>

            </div>

          </div>
        </div>


      </div>
      <Modal show={show} onHide={handleClose} centered size="lg"
        scrollable>
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

  )
}

export default ProfilePage;