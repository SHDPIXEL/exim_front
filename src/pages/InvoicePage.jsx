import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { invoiceId } = useParams(); // Get invoiceId from the URL
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(); // Reference to the invoice div

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await API.post(
          "/services/get_invoice",
          { invoiceId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) return <p>Loading invoice...</p>;
  if (!invoiceData) return <p>No invoice found.</p>;

  // Function to download the invoice as a PDF
  const DownloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoiceId}.pdf`);
    });
  };

  return (
    <div className="invoice-container-m">
      {/* Invoice Div to Capture */}
      <div className="invoice-container" ref={invoiceRef}>
        {/* Invoice Header */}
        <div
          className="header"
          style={{
            background: "#1d75d9",
            padding: "1rem",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <div className="logo-section" style={{ textAlign: "left", width: "100%" }}>
            <img
              src="https://exim.demo.shdpixel.com/static/media/logo-exim.14c9676bee1b10e8401a.png"
              alt="Breboot Logo"
              style={{ maxHeight: "60px" }}
            />
          </div>
        </div>

        {/* Invoice Title */}
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "700",
            marginTop: "0.8rem",
            color: "var(--text-primary)",
            paddingBottom: "1rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Tax Invoice
        </div>

        {/* Supplier & Customer Info */}
        <div
          className="info-container"
          style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}
        >
          <div className="supplier-info" style={{ flex: 1, textAlign: "left" }}>
            <p><strong>Supplier Name:</strong> Exim India</p>
            <p><strong>Supplier Address:</strong> 123 Street, City, State, 456789</p>
            <p><strong>GSTIN:</strong> 29AABCT3518Q1ZV</p>
          </div>
          <div className="customer-info" style={{ flex: 1, textAlign: "right" }}>
            <p><strong>Name:</strong> {invoiceData.name}</p>
            <p><strong>Phone:</strong> {invoiceData.phoneNumber}</p>
            <p><strong>Address:</strong> {invoiceData.customerAddress}</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="invoice-details-container">
          <div className="left-details">
            <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate} {invoiceData.invoiceTime}</p>
            <p><strong>Transaction ID:</strong> {invoiceData.transactionId}</p>
          </div>
          <div className="right-details" style={{ textAlign: "right" }}>
            <p><strong>Order ID:</strong> {invoiceData.orderId}</p>
            <p><strong>Payment Method:</strong> UPI/DIGITAL </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="table-container">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Edition</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{invoiceData.locations}</td>
                <td>₹{invoiceData.prices}</td>
                <td>{invoiceData.durations}</td>
                <td>₹{invoiceData.prices}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div
          className="total-section"
          style={{
            borderBottom: "2px solid var(--border)",
            paddingBottom: "1rem",
          }}
        >
          <div
            className="total-row final"
            style={{ fontSize: "1.1rem" }}
          >
            <span style={{ fontWeight: "bold", color: "#1d75d9" }}>
              Total Paid Amount: ₹{invoiceData.amount}
            </span>
          </div>
          <div
            className="total-row"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-primary)",
              fontWeight: "500",
            }}
          >
            <span>Total Amount in Words: {invoiceData.amountInWords}</span>
          </div>
        </div>

        {/* Footer */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "2rem",
            border: "1px solid var(--border)",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "50%",
                  padding: "8px",
                  borderRight: "1px solid var(--border)",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  verticalAlign: "bottom",
                  textAlign: "left",
                }}
              >
                <p>www.exim.demo.shdpixel.com</p>
              </td>
              <td
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  verticalAlign: "bottom",
                  textAlign: "right",
                }}
              >
                <p>E&OE</p>
                <p style={{ marginTop: "2rem" }}>Authorized Signatory</p>
                <p>Exim India</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button onClick={DownloadPDF} className="btn btn-primary mb-3">Download Invoice</button>
    </div>
  );
};

export default Invoice;
