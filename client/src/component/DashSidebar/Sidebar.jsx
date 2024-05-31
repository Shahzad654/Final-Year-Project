import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FundViewOutlined,
  ExceptionOutlined,
  PoundOutlined,
  MessageOutlined,
  ProfileOutlined,
  AuditOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { clearData } from "../utils/indexDB";

const { Sider } = Layout;

function getItem(label, key, icon, children, to) {
  return {
    key,
    icon,
    children,
    label,
    to,
  };
}

const items = [
  getItem("Overview", "1", <AppstoreOutlined />, null, "/dashboard"),
  getItem("Get Bill", "2", <FundViewOutlined />, null, "/getbill"),
  getItem("File Complaint", "3", <ExceptionOutlined />, null, "/complaint"),
  getItem(
    "View Complaints",
    "4",
    <ExceptionOutlined />,
    null,
    "/viewcomplaint"
  ),
  getItem("Complaint Responses", "5", <MessageOutlined />, null, "/userresp"),
  getItem("Bill Payment", "6", <PoundOutlined />, null, "/payment"),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await clearData();
    navigate("/");
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md" // Set breakpoint for collapse
    >
      <div className="demo-logo-vertical" />
      <h5
        style={{
          color: "white",
          marginLeft: "2vw",
          marginTop: "2vw",
          marginBottom: "2vw",
        }}
      >
        User Dashboard
      </h5>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.to ? (
              <Link to={item.to} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        ))}
        <Button
          type="primary"
          style={{ marginLeft: "2.5vw", marginTop: "3vw" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
