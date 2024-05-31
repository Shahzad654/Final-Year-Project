import React from 'react'
import Footer from '../Footer/Footer';
import Navbarr from '../Navbar/Navbarr';
import './finance.css'
import { Card } from "antd";
import F1 from '../../assets/f1.png'
import F2 from "../../assets/f2.webp";
import F3 from "../../assets/f3.png";
import F4 from "../../assets/f4.webp";
const { Meta } = Card;

const Finance = () => {
  return (
    <>
      <Navbarr />
      <div className="main_operation">
        <div>
          <h3 style={{ marginTop: "8vw", marginLeft: "2vw" }}>
            Finance Directorate
          </h3>
          <p id="op_para1">
            Finance Directorate The Chief Financial Officer heads the Finance
            Directorate GEPCO, Financial Advisor of the Company, Controls all
            financial activities of the Company and support management in
            Strategic Management decision making.
          </p>
          <p id="op_para2">
            Manager Corporate Accounting & Manager Finance (CPC) Assist the
            Chief Financial Officer to cope with the responsibilities and
            activities of Finance Directorate detailed as under:
          </p>
        </div>
        <div style={{ marginLeft: "6vw" }}>
          <div className="operation_card">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={F1} />}
            >
              <Meta
                title="Administration & Payroll"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={F2} />}
            >
              <Meta
                title=" Corporate Accounts"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={F3} />}
            >
              <Meta
                title="Budgeting"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={F4} />}
            >
              <Meta
                title="Pension & Funds"
                // description="www.instagram.com"
              />
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Finance
