import React from 'react'
import './operations.css'
import Footer from '../Footer/Footer'
import Navbarr from '../Navbar/Navbarr'
import { Card } from "antd";
import OP1 from '../../assets/op1.jpg'
import OP2 from "../../assets/op2.jpg";
import OP3 from "../../assets/op3.jpg";
import OP4 from "../../assets/op4.jpg";

const { Meta } = Card;

const Operations = () => {
  return (
    <>
      <Navbarr />
      <div className="main_operation">
        <div>
          <h3 style={{ marginTop: "8vw", marginLeft: "2vw" }}>
            Operation Directorate
          </h3>
          <p id="op_para1">
            Operation Directorate The backbone of the company almost more than
            80% staff of the company working under this directorate. The core
            responsibility of the directorate is management, controlling &
            maintenance of all distribution system for around the clock supply
            of electricity to our esteems customers. The other responsibility is
            to Operation and maintenance of sub-transmission and grid systems.
          </p>
          <p id="op_para2">
            The Operation Directorate is functioning under General Manager /
            Operation Director. The Directorate consists of the following
            departments:
          </p>
        </div>
        <div style={{ marginLeft: "6vw" }}>
          <div className="operation_card">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={OP1} />}
            >
              <Meta
                title="Operation & Maintenance"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={OP2} />}
            >
              <Meta
                title="Technical Services"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={OP3} />}
            >
              <Meta
                title="Load Management"
                // description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={OP4} />}
            >
              <Meta
                title="Safety Department"
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

export default Operations
