import React, { useState, useContext } from "react";
import "./complaint.css";
import DashHead from "../DashboardHeader/DashHead";
import Sidebar from "../DashSidebar/Sidebar";
import UserContext from "../Usercontext/Usercontext";
import { Button, Input, Select, Form, message } from "antd";
import axios from "axios";
import { Breadcrumb, Layout, theme } from "antd";
const { Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Complaint = () => {
  const { TextArea } = Input;
  const { userName, refno, email } = useContext(UserContext);
  const [cellno, setCellno] = useState("");
  const [city, setCity] = useState("");
  const [division, setDivision] = useState("");
  const [nature, setNature] = useState("");
  const [complaintmsg, setComplaintmsg] = useState("");

  const handleComplaint = async () => {
    if (!cellno || !city || !division || !nature || !complaintmsg) {
      message.warning("Please fill in all the required fields.");
      return;
    }
    const response = await axios
      .post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/complain/comp",
        {
          userName,
          email,
          cellno,
          city,
          division,
          nature,
          refno,
          complaintmsg,
        }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Complaint Successfully Submitted!");
      });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        <DashHead />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <form action="">
              <label htmlFor="">Name</label>
              <br />
              <Input
                type="text"
                id="name-input"
                placeholder="Enter your name"
                value={userName}
                readOnly
              />
              <br />
              <br />
              <label htmlFor="">Email</label>
              <br />
              <Input
                type="email"
                id="email-input"
                placeholder="Enter your email"
                value={email}
                readOnly
              />
              <br />
              <br />
              <label htmlFor="">Cell Number</label>
              <br />
              <Input
                type="text"
                id="cell-input"
                placeholder="Enter your cell no"
                onChange={(e) => {
                  setCellno(e.target.value);
                }}
              />
              <br />
              <br />
              <label htmlFor="">City or Circle</label>
              <br />
              <Form.Item>
                <Select
                  name=""
                  id="citycricle"
                  value={city}
                  onChange={(value) => {
                    setCity(value);
                  }}
                >
                  <Select.Option value="">Select City or Cricle</Select.Option>
                  <Select.Option value="Manager Operation City Circle/SE City Gujranwala">
                    Manager Operation City Circle/SE City Gujranwala
                  </Select.Option>
                  <Select.Option value="Manager Operation Cantt Circle/SE Cantt Gujranwala">
                    Manager Operation Cantt Circle/SE Cantt Gujranwala
                  </Select.Option>
                  <Select.Option value="Manager Operation Gujrat Circle/SE Gujrat">
                    Manager Operation Gujrat Circle/SE Gujrat
                  </Select.Option>
                  <Select.Option value=" Manager Operation Narowal Circle/SE Narowal">
                    Manager Operation Narowal Circle/SE Narowal
                  </Select.Option>
                  <Select.Option value="Manager Operation Sialkot Circle/SE Sialkot">
                    Manager Operation Sialkot Circle/SE Sialkot
                  </Select.Option>
                </Select>
              </Form.Item>
              <label htmlFor="">Division</label>
              <br />
              <Form.Item>
                <Select
                  name=""
                  id="divison-complaint"
                  value={division}
                  onChange={(value) => {
                    setDivision(value);
                  }}
                >
                  <Select.Option value="">Select Division</Select.Option>
                  <Select.Option value="DIVISION NO-1 GRW GEPCO">
                    DIVISION NO-1 GRW GEPCO
                  </Select.Option>
                  <Select.Option value="CIVIL LINES DIVISION GRW GEPCO">
                    CIVIL LINES DIVISION GRW GEPCO
                  </Select.Option>
                  <Select.Option value="DIVISION NO-3 GRW GEPCO">
                    DIVISION NO-3 GRW GEPCO
                  </Select.Option>
                  <Select.Option value="KAMOKE DIVISION GEPCO">
                    KAMOKE DIVISION GEPCO
                  </Select.Option>
                  <Select.Option value="NOWSHERA VIRKAN DIVISION">
                    NOWSHERA VIRKAN DIVISION
                  </Select.Option>
                </Select>
              </Form.Item>
              <label htmlFor="">Complaint Nature</label>
              <br />
              <Form.Item>
                <Select
                  name=""
                  id="complaint-nature"
                  value={nature}
                  onChange={(value) => {
                    setNature(value);
                  }}
                >
                  <Select.Option value="Select Complaint Nature">
                    Select Complaint Nature
                  </Select.Option>
                  <Select.Option value="Billing Complaints">
                    Billing Complaints
                  </Select.Option>
                  <Select.Option value="Complaints against Employees">
                    Complaints against Employees
                  </Select.Option>
                  <Select.Option value="Damaged Transformer Replacement">
                    Damaged Transformer Replacement
                  </Select.Option>
                  <Select.Option value="Electricity Theft">
                    Electricity Theft
                  </Select.Option>
                  <Select.Option value="Excess Billing">
                    Excess Billing
                  </Select.Option>
                  <Select.Option value="Fault on Line">
                    Fault on Line
                  </Select.Option>
                  <Select.Option value="Installation of New Connection">
                    Installation of New Connection
                  </Select.Option>
                  <Select.Option value="Low Voltage">Low Voltage</Select.Option>
                  <Select.Option value="Miscellaneous">
                    Miscellaneous
                  </Select.Option>
                  <Select.Option value="New Connection Delayed Billing">
                    New Connection Delayed Billing
                  </Select.Option>
                  <Select.Option value="New Transformer Installation">
                    New Transformer Installation
                  </Select.Option>
                  <Select.Option value="Non Delivery of Bills">
                    Non Delivery of Bills
                  </Select.Option>
                  <Select.Option value="Replacement of Defective Meters">
                    Replacement of Defective Meters
                  </Select.Option>
                  <Select.Option value="Tripping">Tripping</Select.Option>
                  <Select.Option value="Unscheduled Load shedding">
                    Unscheduled Load shedding
                  </Select.Option>
                  <Select.Option value=" Violation of Load Management Schedule on Grids and Feeders">
                    Violation of Load Management Schedule on Grids and Feeders
                  </Select.Option>
                  <Select.Option value=" Violation of Energy Conservation Measures">
                    Violation of Energy Conservation Measures
                  </Select.Option>
                </Select>
              </Form.Item>
              <label htmlFor="">Reference Number</label>
              <br />
              <Input
                type="text"
                id="refno-input"
                placeholder="Enter your reference no"
                value={refno}
                readOnly
                onChange={(e) => {
                  setRefnocom(e.target.value);
                }}
              />
              <br />
              <br />
              <label htmlFor="">Few Words on Complaint</label>
              <br />
              <TextArea
                id="complaint-textarea"
                rows={4}
                placeholder="Enter your complaint"
                value={complaintmsg}
                onChange={(e) => {
                  setComplaintmsg(e.target.value);
                }}
              />
              <br />
              <Button
                onClick={handleComplaint}
                type="primary"
                style={{ marginTop: "2vw", marginLeft: "2vw" }}
              >
                Submit
              </Button>{" "}
            </form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Complaint;
