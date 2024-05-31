import React, { useState, useEffect } from "react";
import {
  Button,
  Breadcrumb,
  Layout,
  Table,
  message,
  theme,
  Popconfirm,
} from "antd";
import axios from "axios";
import AdminHead from "../DashboardHeader/AdminHead";
import SuperSidebar from "./SuperSidebar";

const { Content } = Layout;

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admin/get"
        );
        setAdmins(response.data);
      } catch (error) {
        message.error("Error fetching admins");
      }
    };
    fetchAdmins();
  }, []);

  const togglePasswordVisibility = (id) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


   const handleDelete = async (id) => {
     try {
       await axios.delete(
         `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admin/delete/${id}`
       );
       setAdmins(admins.filter((admin) => admin._id !== id));
       message.success("Admin deleted successfully!");
     } catch (error) {
       message.error("Error deleting admin");
     }
   };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text, record) => (
        <span>
          {passwordVisible[record._id] ? text : "••••••••"}
          <Button
            type="link"
            onClick={() => togglePasswordVisibility(record._id)}
          >
            {passwordVisible[record._id] ? "Hide" : "Show"}
          </Button>
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this admin?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperSidebar />
      <Layout>
        <AdminHead />
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
            <h5>All Admins</h5>
            <Table columns={columns} dataSource={admins} rowKey="_id" style={{marginTop:'2vw'}} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewAdmins;
