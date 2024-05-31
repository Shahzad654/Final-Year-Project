import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusSquareOutlined,
  UserOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";

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
  getItem("Add Admin", "1", <PlusSquareOutlined />, null, "/superdashboard"),
  getItem("View Admins", "2", <FolderViewOutlined />, null, "/viewadmin"),
  getItem("View Users", "3", <UserOutlined />, null, "/viewusers"),
];

const SuperSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <h5
          style={{
            color: "white",
            marginLeft: "1vw",
            marginTop: "2vw",
            marginBottom: "1vw",
          }}
        >
          Super Admin Dashboard
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
          <Link to="/">
            <Button
              type="primary"
              style={{ marginLeft: "2.5vw", marginTop: "3vw" }}
            >
              Logout
            </Button>
          </Link>
        </Menu>
      </Sider>
    </>
  );
};

export default SuperSidebar;
