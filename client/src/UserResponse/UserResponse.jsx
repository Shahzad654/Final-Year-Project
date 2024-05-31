import React, { useContext, useEffect } from "react";
import { List, Layout, Breadcrumb, Card, theme } from "antd";
import UserContext from "../component/Usercontext/Usercontext";
import DashHead from "../component/DashboardHeader/DashHead";
import Sidebar from "../component/DashSidebar/Sidebar";

const { Content } = Layout;

const UserResponse = () => {
  const { complaintResponses } = useContext(UserContext);

  useEffect(() => {
    console.log("complaintResponses:", complaintResponses);
  }, [complaintResponses]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return new Date(timestamp).toLocaleString("en-US", options);
  };

  return (
    <>
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
              <h5>Complaint Responses</h5>
              <List
                size="small"
                bordered
                dataSource={complaintResponses}
                renderItem={(complaintResponse, index) => (
                  <List.Item key={index}>
                    {complaintResponse.responses.map(
                      (response, responseIndex) => (
                        <Card key={responseIndex} style={{ width: "100%" }}>
                          <h6 style={{ color: "black" }}>
                            {response.response}
                          </h6>
                          {response.timestamp && (
                            <>
                              <p style={{ color: "black" }}>
                                {formatDate(response.timestamp)}
                              </p>
                              {response.complaintMsg && (
                                <p style={{ color: "black" }}>
                                  <strong>Complaint:</strong>{" "}
                                  {response.complaintMsg}
                                </p>
                              )}
                            </>
                          )}
                        </Card>
                      )
                    )}
                  </List.Item>
                )}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserResponse;
