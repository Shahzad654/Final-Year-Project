import React , {useEffect} from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Cancel = () => {
    useEffect(() => {
      handleCancel();
    }, []);

  const handleCancel = async () => {
    try {
      console.log("Refno:", refno); 

      const response = await fetch(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/pay/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ refno }),
        }
      );

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Result
      status="info"
      title="Payment Canceled"
      subTitle="You have canceled the payment process."
      extra={[
        <Link to='/dashboard'>
          <Button type="primary" key="home">
            Go Dashboard
          </Button>
          ,
        </Link>,
      ]}
    />
  );
};

export default Cancel;
