import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Card, Button, message, Popconfirm, theme } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DashHead from "../DashboardHeader/DashHead";
import AdSidebar from "../AdminSidebar/AdSidebar";
import axios from "axios";
import AdminHead from "../DashboardHeader/AdminHead";

const { Content } = Layout;

const ViewJob = () => {

     const {
       token: { colorBgContainer, borderRadiusLG },
     } = theme.useToken();


  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/job/getjobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      message.error("Failed to fetch jobs. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/job/delete/${id}`
      );
      message.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      message.error("Failed to delete job. Please try again later.");
    }
  };

  const truncateString = (str, maxLength) => {
    if (!str) return ""; 
    if (str.length <= maxLength) return str;
    return str.substr(0, maxLength) + "...";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdSidebar />
      <Layout>
        <AdminHead />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h3>Posted Jobs</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {jobs.map((job) => (
                <Card
                  key={job?._id}
                  title={truncateString(job?.title, 30)}
                  style={{
                    width: 300,
                    margin: 16,
                    maxHeight: 250,
                    overflow: "hidden",
                  }}
                  extra={
                    <Popconfirm
                      title="Are you sure to delete this job?"
                      onConfirm={() => handleDelete(job?._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text" danger>
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: job?.jobpost }} />
                </Card>
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewJob;
