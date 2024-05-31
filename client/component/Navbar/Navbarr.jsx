import React, { useState, useEffect } from "react";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logotext2.png";
import Login from "../../component/Login/Login";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Modal, Popconfirm } from "antd";
import tariffPDF from "../../assets/Tariff.pdf";
import PQM from '../../assets/PQM.pdf'
import GRC from '../../assets/GRC.pdf'
import Quota from '../../assets/DISABLE-QUOTA.png'

const Navbarr = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = tariffPDF;
    link.download = "tariff.pdf";
    link.click();
  };

  const downloadPQM = () => {
    const link = document.createElement("a");
    link.href = PQM;
    link.download = "PQM.pdf";
    link.click();
  };

  const downloadGRC = () => {
    const link = document.createElement("a");
    link.href = GRC;
    link.download = "GRC.pdf";
    link.click();
  };

  const handleOpenImage = () => {
    window.open(Quota, "_blank");
  };


  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        // className={`bg-custom ${scrolling ? "bg-blue" : ""}`}
        id="navbar-css"
        style={{ backgroundColor: "#007bff" }}
      >
        <Container>
          <div className="logo-img">
            <img src={Logo} alt="" />
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="homepage">
                <Nav.Link href="#home" id="home_link">
                  Home
                </Nav.Link>
              </Link>
              <NavDropdown title="Departments" id="basic-nav-dropdown" >
                <Link to="/technical">
                  <NavDropdown.Item href="#action/3.1">
                    Technical
                  </NavDropdown.Item>
                </Link>
                <Link to="/operations">
                  <NavDropdown.Item href="#action/3.2">
                    Operations
                  </NavDropdown.Item>
                </Link>
                <Link to="/finance">
                  <NavDropdown.Item href="#action/3.3">
                    Finance & Accounts
                  </NavDropdown.Item>
                </Link>

                {/* <NavDropdown.Item href="#action/3.3">
                  HR & Admin
                </NavDropdown.Item> */}
                <Link to="/pmu">
                  <NavDropdown.Item href="#action/3.3">
                    Project Management Unit
                  </NavDropdown.Item>
                </Link>
                <Link to="/material">
                  <NavDropdown.Item href="#action/3.3">
                    Material Management
                  </NavDropdown.Item>
                </Link>

                {/* <NavDropdown.Item href="#action/3.3">Legal</NavDropdown.Item> */}
                <NavDropdown.Item href="#action/3.3">
                  Information Technology
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Environment
                </NavDropdown.Item>
                <Link to="/about" id="aboutnav">
                  <NavDropdown.Item href="#action/3.3">
                    About Us
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
              <NavDropdown title="Customer Service" id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">
                  CNIC Registration
                </NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.2">
                  Mobile# Registration
                </NavDropdown.Item> */}
                <NavDropdown.Item onClick={downloadPdf}>
                  Electrcity Tariff
                </NavDropdown.Item>
                <NavDropdown.Item onClick={downloadPQM}>
                  Pre Qualified Manufactures
                </NavDropdown.Item>
                <NavDropdown.Item onClick={downloadGRC}>
                  Grievance Redressal Committee
                </NavDropdown.Item>
                <NavDropdown.Item>Financial Report</NavDropdown.Item>
                <NavDropdown.Item>Annual Report</NavDropdown.Item>
                <Link to="/faq" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="#action/3.2">FAQ's</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <NavDropdown title="Employee Corner" id="basic-nav-dropdown">
                <Link to="/policy" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="#action/3.1">
                    GEPCO Policies
                  </NavDropdown.Item>
                </Link>
                <Link to="/seniority">
                  {" "}
                  <NavDropdown.Item href="#action/3.2">
                    Seniority List
                  </NavDropdown.Item>
                </Link>
                <Link to="/accomd">
                  <NavDropdown.Item href="#action/3.3">
                    Accomodation List
                  </NavDropdown.Item>
                </Link>
                <Link to="/pension">
                  <NavDropdown.Item href="#action/3.3">
                    Pension Cell
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item
                  href="http://www.gepco.com.pk/Pension/FY2024-2025.pdf"
                  target="_blank"
                >
                  MIS Reports
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="News" id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">Blogs</NavDropdown.Item> */}
                <NavDropdown.Item href="#action/3.2" onClick={handleOpenImage}>
                  2% Disable Quota
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Career" id="basic-nav-dropdown">
                <Link to="/jobs">
                  <NavDropdown.Item href="#action/3.1">Jobs</NavDropdown.Item>
                </Link>

                {/* <NavDropdown.Item href="#action/3.3">News</NavDropdown.Item> */}
              </NavDropdown>

              <Button id="login-btn" onClick={showModal}>
                Login
              </Button>

              <Modal
                id="popover-login"
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
              >
                <Login />
              </Modal>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbarr;
