import React, { useContext } from "react";
import "./complaint.css";
import DashHead from "../DashboardHeader/DashHead";
import Sidebar from "../DashSidebar/Sidebar";
import UserContext from "../Usercontext/Usercontext";
import { Breadcrumb, Layout, Card, List, theme } from "antd";

const { Content } = Layout;

const ViewComplaints = () => {
  const { complaint } = useContext(UserContext);

  if (!complaint || complaint.length === 0) {
    return <p>No complaints found</p>;
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <DashHead />
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
            <h5>View Complaints</h5>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={complaint}
              renderItem={(complaintItem, index) => (
                <List.Item key={index}>
                  <Card title={`Complaint ${index + 1}`}>
                    <p>
                      <strong>Name: </strong>
                      {complaintItem.userName}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {complaintItem.email}
                    </p>
                    <p>
                      <strong>Nature: </strong>
                      {complaintItem.nature}
                    </p>
                    <p>
                      <strong>Complaint: </strong>
                      {complaintItem.complaintmsg}
                    </p>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewComplaints;
