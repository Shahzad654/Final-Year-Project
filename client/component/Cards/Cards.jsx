import { React, useState } from "react";
import "./card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Meter from "../../assets/meter.jpg";
import Bill from "../../assets/bill.png";
import Understand from "../../assets/understand.webp";
import Complaint from "../../assets/complaint.webp";
import TrackingIcon from "../../assets/tracking app.jpg";
import Net from "../../assets/net.png";
import MNO from "../../assets/mno.jpg";
import { Link } from "react-router-dom";
import { Card, Button, Modal } from "antd";
import Application from "../UserApplication/Application";
import Trackapp from "../TrackApp/Trackapp";
import Knowbill from "../KnowBill/Knowbill";
import BillIcon from "../../assets/billicon.jpg";
import Login from "../Login/Login";

const Cards = () => {
  const { Meta } = Card;
  const [open, setOpen] = useState(false);
  const [isModalAppOpen, setIsModalAppOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalHelpOpen, setIsModalHelpOpen] = useState(false);
  const [isModalsignOpen, setIsModalsignOpen] = useState(false);
  const [isModalpayOpen, setIsModalpayOpen] = useState(false);
  const [isModalcompOpen, setIsModalcompOpen] = useState(false);
  
  const showHelpModal = () => {
    setIsModalHelpOpen(true);
  };
  
  const showModal = () => {
  setIsModalAppOpen(true);
  };

  const showsignModal = () => {
    setIsModalsignOpen(true);
  };

  const showpayModal = () => {
    setIsModalpayOpen(true);
  };
  const showcompModal = () => {
    setIsModalcompOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const hideAppModal = () => {
    setIsModalAppOpen(false);
  };

  const hidepayModal = () => {
    setIsModalpayOpen(false);
  };

  const hidecompModal = () => {
    setIsModalcompOpen(false);
  };
  
  const hidesignModal = () => {
    setIsModalsignOpen(false);
  };

  const showModals = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleHelpOk = () => {
    setIsModalHelpOpen(false);
  };
  const handleHelpCancel = () => {
    setIsModalHelpOpen(false);
  };

  return (
    <>
      <h3 className="card_heading">Services We Offer</h3>

      <div className="cards">
        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={Meter} />}
          actions={[
            <>
              <Button type="primary" onClick={showModal}>
                Apply Now
              </Button>
              <Modal
                title={
                  <span
                    style={{
                      color: "#007bff",
                      fontSize: "2vw",
                      marginLeft: "6vw",
                      marginBottom: "5vw",
                    }}
                  >
                    Apply for new connection
                  </span>
                }
                open={isModalAppOpen}
                onCancel={hideAppModal}
                cancelText="cancel"
                footer={null}
              >
                <Application hideAppModal={hideAppModal} />
              </Modal>
            </>,
          ]}
        >
          <Meta
            title="New Connection"
            description={
              <span style={{ color: "black" }}>
                Energizing the Future, Meter by Meter
              </span>
            }
          />
        </Card>

        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={Bill} id="bill-card" />}
          actions={[
            <>
              <Button type="primary" onClick={showsignModal}>
                View Bill
              </Button>
              <Modal
                id="popover-login"
                open={isModalsignOpen}
                footer={null}
                onCancel={hidesignModal}
              >
                <Login />
              </Modal>
            </>,
          ]}
        >
          <Meta
            title="Duplicate Bill"
            description={
              <span style={{ color: "black" }}>
                Your Duplicate Bill, Your Convenience
              </span>
            }
          />
        </Card>

        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={Complaint} />}
          actions={[
            <>
              <Button type="primary" onClick={showcompModal}>
                File Complaint
              </Button>
              <Modal
                open={isModalcompOpen}
                footer={null}
                onCancel={hidecompModal}
              >
                <Login/>
              </Modal>
            </>,
          ]}
        >
          <Meta
            title="Complaint"
            description={
              <span style={{ color: "black" }}>
                File your complaint smoothly
              </span>
            }
          />
        </Card>
      </div>

      <div className="card2">
        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={TrackingIcon} />}
          actions={[
            <Button type="primary" onClick={showModals}>
              Check Status
            </Button>,
          ]}
        >
          <Modal
            title="Track your Application"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Trackapp />
            <br />
          </Modal>

          <Meta
            title="Track Application"
            description={
              <span style={{ color: "black" }}>
                Track with ease – Your application journey simplified
              </span>
            }
          />
        </Card>

        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={Net} id="net-card" />}
          actions={[
            <>
              <Link to="https://roshanpakistan.pk/net_metering/index.php">
                <Button type="primary">Apply Now</Button>
              </Link>
            </>,
          ]}
        >
          <Meta
            title="Net Metering"
            description={
              <span style={{ color: "black" }}>
                Seamless Net Metering Registration Save Energy
              </span>
            }
          />
        </Card>

        <Card
          style={{
            width: 300,
          }}
          cover={<img alt="example" src={BillIcon} id="number-card" />}
          actions={[
            <>
              <Button type="primary" onClick={showpayModal}>
                Pay
              </Button>
              <Modal
                id="popover-login"
                open={isModalpayOpen}
                footer={null}
                onCancel={hidepayModal}
              >
                <Login />
              </Modal>
            </>,
          ]}
        >
          <Meta
            title="Bill E-Payment "
            description={
              <span style={{ color: "black" }}>
                Effortless Online Bill Payment
              </span>
            }
          />
        </Card>
      </div>
    </>
  );
};

export default Cards;
