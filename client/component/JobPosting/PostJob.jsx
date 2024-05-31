import React, { useContext, useState, useEffect } from "react";
import DashHead from "../DashboardHeader/DashHead";
import { Breadcrumb, Layout, theme, Button, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdSidebar from "../AdminSidebar/AdSidebar";
import axios from "axios";
import AdminHead from "../DashboardHeader/AdminHead";
const { Content } = Layout;

const PostJob = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [jobpost, setJobpost] = useState(""); 

  const handleSubmit = async () => {
    try {

      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/job/jobpost",
        {
          jobpost,
        }
      );
      message.success("Job posted successfully!");
      
    } catch (error) {
      console.error("Error posting job:", error);
      message.error("Failed to post job. Please try again later.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdSidebar />
      <Layout>
        <AdminHead/>
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
            <h3>Post Job</h3>
            <div>
              <ReactQuill theme="snow" value={jobpost} onChange={setJobpost} />
            </div>
            <Button type="primary" onClick={handleSubmit} style={{marginTop:'2vw'}}>
              Post Job
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PostJob;
