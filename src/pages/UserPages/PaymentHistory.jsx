import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const PaymentHistory = () => {
  const payments = [
    {
      id: 'TXN12345',
      invoiceid: 'EXIM-1234',
      date: '2025-01-15',
      amount: '₹ 7,000',
      Service: 'Mumbai-Both for 1 year, Gujrat-Digital copy for 1 year' ,
      Expire:"2026-01-14",
      type:"Both",
      status: 'Completed',
    },
    {
      id: 'TXN13456',
      invoiceid: 'EXIM-2345',
      date: '2025-01-15',
      amount: '₹ 3,500',
      Service: 'Mumbai-Both for 1 year' ,
      Expire:"2026-01-14",
      type:"Hard copy",
      status: 'Failed',
    },
    {
      id: 'TXN12567',
      invoiceid: 'EXIM-4567',
      date: '2024-07-15',
      amount: '₹ 2,500',
      Service: 'Gujrat-Digital copy for 1 year' ,
      Expire:"2026-01-14",
      type:"Digital copy",
      status: 'Failed',
    },
    {
      id: 'TXN12666',
      invoiceid: 'EXIM-6789',
      date: '2024-09-05',
      amount: '₹ 4,000',
      Service: 'Chennai-Digital copy for 2 year' ,
      Expire:"2026-01-14",
      type:"Digital copy",
      status: 'Pending',
    },
    {
      id: 'TXN124454',
      invoiceid: 'EXIM-1234',
      date: '2023-01-15',
      amount: '₹ 4,900',
      Service: 'Chennai-Both , Gujrat-Digital copy for 1 year' ,
      Expire:"2026-01-14",
      type:"Digital copy",
      status: 'Completed',
    },
    
    
  ];

  const refundhistory = [
    {
      id: 'TXN12345',
      invoiceid: 'EXIM-1234',
      date: '2025-01-15',
      amount: '₹ 7,000',
      Service: 'Mumbai-Both for 1 year, Gujrat-Digital copy for 1 year' ,
      status: 'Completed',
      type:"both",
    },
    {
      id: 'TXN13456',
      invoiceid: 'EXIM-2345',
      date: '2025-01-15',
      amount: '₹ 3,500',
      Service: 'Mumbai-Both for 1 year' ,
      status: 'Failed',
      type:"Hard copy",
    },
    {
      id: 'TXN12567',
      invoiceid: 'EXIM-4567',
      date: '2024-07-15',
      amount: '₹ 2,500',
      Service: 'Gujrat-Digital copy for 1 year' ,
      status: 'Failed',
      type:"Digital copy",
    },
    {
      id: 'TXN12666',
      invoiceid: 'EXIM-6789',
      date: '2024-09-05',
      amount: '₹ 4,000',
      Service: 'Chennai-Digital copy for 2 year' ,
      status: 'Pending',
      type:"Digital copy",
    },
    {
      id: 'TXN124454',
      invoiceid: 'EXIM-1234',
      date: '2023-01-15',
      amount: '₹ 4,900',
      Service: 'Chennai-Both , Gujrat-Digital copy for 1 year' ,
      status: 'Completed',
      type:"Digital copy",
    },
    
    
  ];

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

          </Tabs>
        </div>



      </div>

    </div>
  )
}

export default PaymentHistory;