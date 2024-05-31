import React, { useState, useEffect } from "react";
import "./viewusers.css";
import axios from "axios";
import {
  Button,
  Input,
  Breadcrumb,
  Layout,
  theme,
  Table,
  Popconfirm,
  message,
} from "antd";
import AdminHead from "../DashboardHeader/AdminHead";
import SuperSidebar from "./SuperSidebar";
const { Content } = Layout;

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [refnoInput, setRefnoInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/data/getdata`
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFilter = (value) => {
    const filteredData = users.filter((user) =>
      user.refno.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/data/deletedata/${userId}`
      );
      fetchUsers(); // Refresh the user list after deletion
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    }
  };

  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Reference Number",
      dataIndex: "refno",
      key: "refno",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search reference number"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleFilter(selectedKeys[0])}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleFilter(selectedKeys[0])}
            icon={<i className="fa fa-search" aria-hidden="true"></i>}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.refno.toLowerCase().includes(value.toLowerCase()),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Connection Date",
      dataIndex: "condate",
      key: "condate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" size="small" style={{color:'red'}}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            <h5>All Users</h5>

            <div className="display_users">
              <div className="table_card">
                <Table columns={userColumns} dataSource={filteredUsers} />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewUsers;
