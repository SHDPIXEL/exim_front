import React from "react";
import { Link } from "react-router-dom";
import scuityicon from "../../assets/images/scuityicon.png";

const MyDevice = () => {

 
  return (
    <div className="container border shadow-sm p-md-5 py-md-3">
      <div className="row mt-4 mb-4">
        <div className="col-md-12 mt-4 mb-2 text-center">
          <img src={scuityicon} alt="" width={100} />
          <h2 className='text-center mb-3 fw-bold'>Manage Access and Devices </h2>
          {/* <p className="text-center">These signed-in device have recently been active on this account. You can sign out <br /> any unfamiliar devices or <Link>Change your password</Link> for added security.</p> */}
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-6 mb-4">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between py-3 align-items-center">
              <h5 className="mb-0 d-flex align-items"><i class="bi bi-laptop me-2"></i> PC Chrome - Web browser</h5>
              <small className="btn btn-outline-info small text-uppercase fw-bold" style={{ fontSize: "12px" }}>Current Device</small>
            </div>
            <div class="card-body">
              <h6 class="card-title fw-bold"><i class="bi bi-person"></i> KOMAl (Last watched)</h6>
              <p class="card-text"><i class="bi bi-clock"></i> 10/01/25,10:07 am GMT</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between py-3 align-items-center">
              <h5 className="mb-0 d-flex align-items"><i class="bi bi-phone me-2"></i> Andoid Phone</h5>
              <small className="btn btn-primary small text-uppercase fw-bold" style={{ fontSize: "12px" }}>Sign out</small>
            </div>
            <div class="card-body">
              <h6 class="card-title fw-bold"><i class="bi bi-person "></i> Ajit (Last watched)</h6>
              <p class="card-text"><i class="bi bi-clock"></i> 17/01/25,10:07 am GMT</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between py-3 align-items-center">
              <h5 className="mb-0 d-flex align-items"><i class="bi bi-phone me-2"></i> Andoid Phone</h5>
              <small className="btn btn-primary small text-uppercase fw-bold" style={{ fontSize: "12px" }}>Sign out</small>
            </div>
            <div class="card-body">
              <h6 class="card-title fw-bold"><i class="bi bi-person "></i> Suraj (Last watched)</h6>
              <p class="card-text"><i class="bi bi-clock"></i> 17/01/25,10:07 am GMT</p>
            </div>
          </div>
        </div>

      </div>

      

    </div>
  )
}

export default MyDevice;