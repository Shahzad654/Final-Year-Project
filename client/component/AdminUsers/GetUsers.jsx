import React, { useState, useEffect } from "react";
import "./getusers.css";
import axios from "axios";
import AdSidebar from "../AdminSidebar/AdSidebar";
import DashHead from "../DashboardHeader/DashHead";
import {
  Button,
  Input,
  Breadcrumb,
  Layout,
  theme,
  Table,
  message
} from "antd";
import AdminHead from "../DashboardHeader/AdminHead";
const { Content } = Layout;

const userColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Reference Number",
    dataIndex: "refno",
    key: "refno",
  },
];


const mapUsersToTableData = (users) => {
  return users.map((user) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    refno: user.refno,
  }));
};


const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [refnoInput, setRefnoInput] = useState("");

  const handleUsers = async (e) => {
    e.preventDefault();
    try {
      if (!refnoInput.trim()) {
        message.warning("Reference number cannot be empty");
        return;
      }

      const response = await axios.get(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/getusers/billdata/${refnoInput}`
      );

      setUsers([response.data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdSidebar />
      <Layout>
        <AdminHead/>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="get_users">
              <Input
                id="search-user-input"
                type="text"
                placeholder="Enter reference number"
                value={refnoInput}
                onChange={(e) => setRefnoInput(e.target.value)}
              />
              <br />
              <Button type="primary" size='small' id="user-search-btn" onClick={handleUsers}>
                Search
              </Button>
            </div>

            <div className="display_users">
              <div className="table_card">
                <Table
                  columns={userColumns}
                  dataSource={mapUsersToTableData(users)}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GetUsers;
