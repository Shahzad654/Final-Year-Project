import React from "react";

const Success = ({ isPaid }) => {
  return (
    <div>
      <h1>Payment Status</h1>
      {isPaid ? <p>Hurry! Payment is Successful</p> : <p>Payment Pending</p>}
    </div>
  );
};

export default Success;
