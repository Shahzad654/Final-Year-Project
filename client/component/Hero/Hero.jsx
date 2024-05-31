import React, { useState } from "react";
import "./hero.css";
import Navbarr from "../Navbar/Navbarr";
import GChatbot from "../Chatbot/GChatbot";
import {
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { Button, Tooltip, Space, Carousel } from "antd";
import {
  useDisclosure,
} from "@chakra-ui/react";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
  position: "relative",
};
const Hero = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  // const [showChatbot, setShowChatbot] = useState(false);
  // const toggleChatbot = () => {
  //   setShowChatbot(!showChatbot);
  // };

  return (
    <>
      <div className="overlay">
        <Navbarr />
      </div>

      <div className="carsousel_main">
        <Carousel autoplay>
          <div id="carsousel">
            <div
              style={{
                ...contentStyle,
                backgroundImage: "url('../src/assets/bghero2.jpg')",
                backgroundSize: "cover",
                height: "40vw",
              }}
            >
              <h3
                style={{
                  color: "white",
                  paddingTop: "14vw",
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  fontSize: "2.5vw",
                }}
              >
                Gujranwala Electric and Power Company Limited
              </h3>
              <p
                style={{
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  width: "50vw",
                  marginLeft: "24.3vw",
                  fontSize: "1.5vw",
                  lineHeight: "1.8",
                }}
              >
                Gujranwala Electric Power Company (GEPCO) is a prominent
                electric utility company in Pakistan, serving the region of
                Gujranwala and its surrounding areas. As one of the key players
                in the country's power distribution sector.
              </p>
            </div>
          </div>

          <div>
            <div
              style={{
                ...contentStyle,
                backgroundImage: 'url("../src/assets/bgso4.jpg")',
                backgroundSize: "cover",
                height: "40vw",
              }}
            >
              <h3
                style={{
                  color: "white",
                  paddingTop: "14vw",
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  fontSize: "2.5vw",
                }}
              >
                Net Metering
              </h3>
              <p
                style={{
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  width: "50vw",
                  marginLeft: "28vw",
                  fontSize: "1.5vw",
                  lineHeight: "1.8",
                }}
              >
                GEPCO's net metering lets customers in Gujranwala and nearby
                regions generate and share surplus renewable energy, reducing
                costs and promoting sustainability.
              </p>
            </div>
          </div>

          <div>
            <div
              style={{
                ...contentStyle,
                backgroundImage: 'url("../src/assets/bgso21.jpg")',
                backgroundSize: "cover",
                height: "40vw",
              }}
            >
              <h3
                style={{
                  color: "white",
                  paddingTop: "14vw",
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  fontSize: "2.5vw",
                }}
              >
                Service
              </h3>
              <p
                style={{
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 2)",
                  width: "50vw",
                  marginLeft: "28vw",
                  fontSize: "1.5vw",
                  lineHeight: "1.8",
                }}
              >
                GEPCO's customer service is dedicated to addressing your needs
                efficiently. Experience top-tier support for any inquiries or
                concerns, ensuring a seamless electricity service experience.
              </p>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="overlayhelp">
        <div className="chatbot">
          <Space wrap>
            <Tooltip title="Ask Questions?">
              <FloatButton
                id="chat-btn"
                onClick={onOpen}
                icon={<CustomerServiceOutlined />}
                type="primary"
                style={{
                  right: 24,
                }}
              />
            </Tooltip>
          </Space>
        </div>
      </div>

      <div className="chatbot-popover">
        <GChatbot
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          className="chatbot-mob" 
        />
      </div>
    </>
  );
};

export default Hero;
