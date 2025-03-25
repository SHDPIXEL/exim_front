import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [renewableSubscriptions, setRenewableSubscriptions] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
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

        // Map payment data
        const mappedPayments = response.data.userSubscription.map((payment) => ({
          id: payment.razorpayPaymentId || "N/A",
          invoiceId: payment.razorpayOrderId || "N/A",
          location: payment.location || "N/A",
          duration: payment.duration || "N/A",
          type: payment.type || "N/A",
          date: new Date(payment.createdAt).toISOString().split("T")[0],
          amount: `₹ ${payment.price?.toLocaleString()}`,
          expiryDate: new Date(payment.expiryDate).toISOString().split("T")[0],
          status: payment.paymentStatus || "Pending",
        }));

        setPayments(mappedPayments);

        // Filter expired or expiring within a month
        const today = new Date();
        const renewable = mappedPayments.filter((payment) => {
          const expiryDate = new Date(payment.expiryDate);
          const daysLeft = (expiryDate - today) / (1000 * 60 * 60 * 24);

          return (
            payment.status === "success" &&
            (expiryDate < today || daysLeft <= 30)
          );
        });

        setRenewableSubscriptions(renewable);
      } catch (error) {
        console.error("Error in fetching payment details:", error);
        setPayments([]);
        setRenewableSubscriptions([]);
      }
    };

    fetchDetails();
  }, []);

  const handleRenewClick = (payment) => {
    navigate("/paymentSummary", {
      state: {
        subscriptionType: payment.type,
        packages: [{ location: payment.location, duration: payment.duration, price: parseInt(payment.amount.replace(/[^0-9]/g, "")) }],
      },
    });
  };

  return (
    <div className="container border shadow-sm p-md-5 py-md-3">
      <div className="row mt-4">
        <div className="col-md-12 mt-4 mb-2 text-center">
          <h2 className="text-center mb-3 fw-bold">Subscription History</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <Tabs defaultActiveKey="PaymentHistory" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="PaymentHistory" title="Payment History">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Payment ID</th>
                      <th>Invoice ID</th>
                      <th>Edition</th>
                      <th>Duration</th>
                      <th>Type</th>
                      <th>Paid At</th>
                      <th>Amount</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment.id}</td>
                          <td>{payment.invoiceId}</td>
                          <td>{payment.location}</td>
                          <td>{payment.duration}</td>
                          <td>{payment.type}</td>
                          <td>{payment.date}</td>
                          <td>{payment.amount}</td>
                          <td>{payment.expiryDate}</td>
                          <td>
                            <span
                              className={`badge ${
                                payment.status === "success"
                                  ? "bg-success"
                                  : payment.status === "pending"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No payment records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab eventKey="Renew" title="Renew">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Edition</th>
                      <th>Duration</th>
                      <th>Type</th>
                      <th>Paid At</th>
                      <th>Amount</th>
                      <th>Expiry Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renewableSubscriptions.length > 0 ? (
                      renewableSubscriptions.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment.location}</td>
                          <td>{payment.duration}</td>
                          <td>{payment.type}</td>
                          <td>{payment.date}</td>
                          <td>{payment.amount}</td>
                          <td>{payment.expiryDate}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleRenewClick(payment)}
                            >
                              Renew
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No subscriptions available for renewal.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
