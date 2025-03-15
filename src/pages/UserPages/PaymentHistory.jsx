import React, { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import API from "../../api";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [refundhistory, setRefundHistory] = useState([]); // Placeholder for future refund logic

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await API.post("/services/get_payments", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("Payment details:", response.data);

        // Map backend data to match table structure
        const mappedPayments = response.data.payments.map(payment => ({
          id: payment.razorpayPaymentId || "N/A", // Payment ID
          invoiceid: payment.razorpayOrderId || "N/A", // Invoice ID
          Service: payment.subscription_details, // Needs parsing if object
          type: payment.type || "N/A",
          date: new Date(payment.createdAt).toISOString().split("T")[0], // Format date
          amount: `₹ ${payment.amount.toLocaleString()}`, // Format amount
          Expire: "N/A", // Placeholder; calculate if duration is available
          status: payment.paymentStatus || payment.status || "Pending", // Use paymentStatus or status
        }));

        setPayments(mappedPayments);
        // For now, refundhistory is not populated; adjust if backend provides refund data
        setRefundHistory([]); // Placeholder until refund logic is clarified
      } catch (error) {
        console.error("Error in fetching details:", error);
        setPayments([]); // Empty array on error
        setRefundHistory([]);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="container border shadow-sm p-md-5 py-md-3">
      <div className="row mt-4 ">
        <div className="col-md-12 mt-4 mb-2 text-center">
          <h2 className='text-center mb-3 fw-bold'>Subscription History  </h2>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-12 mb-4">
          <Tabs
            defaultActiveKey="PaymentHistory"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="PaymentHistory" title="Payment History">
              <div className="table-responsive ">
                <table className="table table-bordered table-hover ">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" style={{minWidth:"120px"}}>Payment ID</th>
                      <th scope="col" style={{minWidth:"120px"}}>Invoice ID</th>
                      <th scope="col" style={{minWidth:"200px"}}>Subscription </th>
                      <th scope="col" style={{minWidth:"100px"}}>Type </th>
                      <th scope="col" style={{minWidth:"120px"}}>Paid at</th>
                      <th scope="col">Amount</th>
                      <th scope="col" style={{minWidth:"110px"}}>Expiry Date </th>
                      <th scope="col" style={{minWidth:"120px"}}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.id}</td>
                        <td>{payment.invoiceid}</td>
                        <td>{payment.Service}</td>
                        <td>{payment.type}</td>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.Expire}</td>
                        <td>
                          <span
                            className={`badge ${payment.status === 'Completed'
                                ? 'bg-success'
                                : payment.status === 'Pending'
                                  ? 'bg-warning text-dark'
                                  : 'bg-danger'
                              }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab eventKey="RefundHistory" title="Refund History">
              <div className="table-responsive ">
                <table className="table table-bordered table-hover ">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" style={{minWidth:"120px"}}>Payment ID</th>
                      <th scope="col" style={{minWidth:"120px"}}>Invoice ID</th>
                      <th scope="col" style={{minWidth:"200px"}}>Subscription</th>
                      <th scope="col" style={{minWidth:"100px"}}>Type </th>
                      <th scope="col" style={{minWidth:"120px"}}>Paid at</th>
                      <th scope="col" style={{minWidth:"120px"}}>Amount</th>
                      <th scope="col" style={{minWidth:"120px"}}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundhistory.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.id}</td>
                        <td>{payment.invoiceid}</td>
                        <td>{payment.Service}</td>
                        <td>{payment.type}</td>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                        <td>
                          <span
                            className={`badge ${payment.status === 'success'
                                ? 'bg-success'
                                : payment.status === 'Pending'
                                  ? 'bg-warning text-dark'
                                  : 'bg-danger'
                              }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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