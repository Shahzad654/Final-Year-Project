import React from 'react'
import './technical.css'
import Footer from '../Footer/Footer';
import Navbarr from '../Navbar/Navbarr';
import { Card } from "antd";
import Plan from "../../assets/planing.jpg";
import Mat from "../../assets/materials.jpg";
import Con from "../../assets/construction.jpg";

const { Meta } = Card;

const Technical = () => {
  return (
    <>
      <Navbarr />
      <h4 className="tech_heading">Technical Directorate</h4>
      <div>
        <p id="tech_p1">
          The Directorate is headed by Chief Engineer BPS-20 officer and located
          at GEPCO HQ, The tasks assigned to Technical Directorate GEPCO are:
        </p>
        <ul id="tech_p2">
          <li>
            Planning and Design of electricity distribution, sub-transmission
            and grid stations.
          </li>
          <li>
            Procurement of material for these development and system expansion
            works.
          </li>
          <li>Construction of the development and system expansion works.</li>
        </ul>

        <h6 style={{ marginLeft: "3vw" }}>
          The directorate consists on following Departments:
        </h6>
      </div>
      <div className="depart_main">
        <div className="departments">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={Plan} />}
          >
            <Meta
              title="Planning & Engineering"
              // description="www.instagram.com"
            />
          </Card>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={Mat} />}
          >
            <Meta
              title="Material Management"
              // description="www.instagram.com"
            />
          </Card>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={Con} />}
          >
            <Meta
              title="Project Construction"
              // description="www.instagram.com"
            />
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Technical
