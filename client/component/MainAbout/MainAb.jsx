import React from 'react'
import './mainab.css'
import { Card } from "antd";
import MAB1 from '../../assets/mab4.jpg'
import MAB2 from '../../assets/mab2.jpg'
import MAB3 from '../../assets/mab3.jpg'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

const MainAb = () => {
  const { Meta } = Card;
  return (
    <>
      <div className="mab_container">
        <h1>40+ Years of Generating Clean Energy</h1>
        <div className="main_cards_about">
          <div className="mainab_card1">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={MAB3} />}
            >
              <Meta
                title="Power Generation"
                description={
                  <span style={{ color: "black" }}>
                    Power generation transforms diverse energy sources into
                    electricity, crucial for meeting societal needs and
                    fostering economic development.
                  </span>
                }
              />
            </Card>
          </div>

          <div className="mainab_card2">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={MAB2} />}
            >
              <Meta
                title="Transmission"
                description={
                  <span style={{ color: "black" }}>
                    GEPCO efficiently manages the transmission of electricity
                    from sources to homes and businesses in the Gujranwala
                    region.
                  </span>
                }
              />
            </Card>
          </div>

          <div className="mainab_card3">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={MAB1} />}
            >
              <Meta
                title="Distribution"
                description={
                  <span style={{ color: "black" }}>
                    In power distribution, GEPCO ensures direct delivery of
                    electricity to homes, businesses, and industries in the
                    Gujranwala and respective region.
                  </span>
                }
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainAb
