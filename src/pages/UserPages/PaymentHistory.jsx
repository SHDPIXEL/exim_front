import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [renewableSubscriptions, setRenewableSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

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

        const renewableResponse = await API.post(
          "/services/get_user_renewal",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Map payment data
        const mappedSubscriptions = response.data.data.subscriptionHistory.map(
          (item) => ({
            location: item.location || "N/A",
            duration: item.duration || "N/A",
            type: item.type || "N/A",
            expiryDate: item.expiryDate
              ? (() => {
                  const date = new Date(item.expiryDate);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase();
                  const year = date.getFullYear();
                  return `${day} ${month} ${year}`;
                })()
              : "N/A",
            status: item.status || "Pending",
          })
        );

        const mappedPayments = response.data.data.paymentDetails.map(
          (item) => ({
            invoiceId: item.razorpayOrderId || "N/A",
            payment_id: item.razorpayPaymentId || "N/A",
            amount: item.amount || "N/A",
            type: item.type || "N/A",
            paid_at: item.paidAt
              ? (() => {
                  const date = new Date(item.paidAt);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = date
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase();
                  const year = date.getFullYear();
                  return `${day} ${month} ${year}`;
                })()
              : "N/A",
            status: item.paymentStatus || "Pending",
          })
        );

        setPayments(mappedPayments);
        setSubscriptions(mappedSubscriptions);

        setRenewableSubscriptions(renewableResponse.data);
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
        packages: [
          {
            location: payment.location,
            duration: payment.duration,
            price: parseInt(payment.amount),
            type: payment.type || null,
            id: payment.id || null,
          },
        ],
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
          <Tabs
            defaultActiveKey="SubcriptionHistory"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="SubcriptionHistory" title="Subcription History">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Edition</th>
                      <th>Duration</th>
                      <th>Type</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.length > 0 ? (
                      subscriptions.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment.location}</td>
                          <td>{payment.duration}</td>
                          <td>{payment.type}</td>
                          <td>{payment.expiryDate}</td>
                          <td>
                            <span
                              className={`badge ${
                                payment.status === "Active"
                                  ? "bg-success"
                                  : payment.status === "inactive"
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
            <Tab eventKey="PaymentHistory" title="Payment History">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Payment ID</th>
                      <th>Invoice ID</th>
                      <th>Type</th>
                      <th>Paid At</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={index}>
                          <td className="align-middle">{payment.payment_id}</td>
                          <td className="align-middle">
                            {/*                             to={`/invoice/${payment.invoiceId}`} */}
                            <Link target="_new" to="#" className="text-primary">
                              {payment.invoiceId}
                            </Link>
                          </td>

                          <td className="align-middle">{payment.type}</td>
                          <td className="align-middle">{payment.paid_at}</td>
                          <td className="align-middle">{payment.amount}</td>
                          <td className="align-middle">
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
                          <td>
                            <Link
                              target="_new"
                              to={`/invoice/${payment.invoiceId}`}
                              className="btn btn-sm btn-primary mx-2"
                            >
                              View
                            </Link>
                            <Link
                              target="_new"
                              to={`/invoice/${payment.invoiceId}?download=true`}
                              className="btn btn-sm btn-success"
                            >
                              Download
                            </Link>
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
            <Tab eventKey="Renew" title="Renewal">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Edition</th>
                      <th>Duration</th>
                      <th>Type</th>
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
                          <td>{payment?.amount || "N/A"}</td>
                          <td>
                            {payment.renewalDate
                              ? (() => {
                                  const date = new Date(payment.renewalDate);
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
                          </td>

                          <td>
                            <button
                              className={`btn btn-primary btn-sm ${
                                payment.renewalStatus !== "Active"
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={
                                payment.renewalStatus === "Active"
                                  ? false
                                  : true
                              }
                              onClick={() => handleRenewClick(payment)}
                            >
                              Renewal
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
