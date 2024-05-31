import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileOutlined,
  SnippetsOutlined,
  UserOutlined,
  CloudUploadOutlined,
  WarningOutlined,
  FormOutlined,
  CommentOutlined,
  PlusOutlined,
  EyeOutlined,
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
  getItem("Upload", "1", <CloudUploadOutlined />, null, "/uploadbill"),
  getItem("Get User", "2", <UserOutlined />, null, "/getusers"),
  getItem("Get Bill Details", "3", <SnippetsOutlined />, null, "/billdetails"),
  getItem(
    "View Applications",
    "4",
    <FileOutlined />,
    null,
    "/adminapplication"
  ),
  getItem("View Complaint", "5", <CommentOutlined />, null, "/admincomplaint"),
  getItem("Post Jobs", "6", <PlusOutlined />, null, "/postjobs"),
  getItem("View Jobs", "7", <EyeOutlined />, null, "/viewjobs"),
  getItem("View Job App", "8", <FormOutlined />, null, "/viewapp"),
  getItem("Theft Analysis", "9", <WarningOutlined />, null, "/theft"),
];

const AdSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <h5 style={{color:'white', marginLeft:'1vw', marginTop:'2vw', marginBottom:'1vw'}}>Admin Dashboard</h5>
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

export default AdSidebar;
