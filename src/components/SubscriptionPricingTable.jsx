import React from "react";

const SubscriptionPricingTable = ({ data }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Edition</th>
            <th>Duration</th>
            <th>Price (₹)</th>
            <th>Price incl. GST (18%)</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) =>
            item.plans.map((plan, index) => (
              <tr key={`${i}-${index}`}>
                {index === 0 && (
                  <td rowSpan={item.plans.length} className="fw-bold">
                    {item.edition}
                  </td>
                )}
                <td>{plan.duration}</td>
                <td>₹ {plan.price}</td>
                <td>₹ {plan.gstPrice}</td>
                {index === 0 && (
                  <td rowSpan={item.plans.length}>{item.frequency}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionPricingTable;
