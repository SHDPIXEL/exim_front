import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "../api";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); 
  const [searchParams] = useSearchParams();

  const expires = searchParams.get("expires");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Password
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await API.post(`/services/reset-password/${token}`, {
        newPassword,
        confirmNewPassword: confirmPassword,
        expires
      });

      if (response.status === 200) {
        alert("Password reset successful! Please log in with your new password.");
        navigate("/login"); // Redirect to login page
      } else {
        setError(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while resetting the password.");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="container border shadow-sm p-md-5 py-md-4 bg-light my-5"
    style={{
        maxWidth: "600px"
    }}
    >
      <h2 className="text-center fw-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
