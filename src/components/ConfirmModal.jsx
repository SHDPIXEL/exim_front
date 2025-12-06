import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message = "Are you sure?" }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Confirm Action</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
