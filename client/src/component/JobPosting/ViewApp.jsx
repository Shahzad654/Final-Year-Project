import React, { useState, useEffect } from "react";
import { Button, Input, Breadcrumb, Layout, Table, Alert, theme } from "antd";
import AdminHead from "../DashboardHeader/AdminHead";
import AdSidebar from "../AdminSidebar/AdSidebar";
import axios from "axios";

const { Content } = Layout;

const ViewApp = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/jobapp/applications"
      );
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


   const {
     token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const handleDownloadCV = (cvBuffer, filename) => {
     const blob = new Blob([cvBuffer], { type: "image/png" }); 

     const link = document.createElement("a");
     link.href = window.URL.createObjectURL(blob);
     link.download = filename || "cv.png"; 

     document.body.appendChild(link);
     link.click();

     document.body.removeChild(link);
   };

   const extractJobTitle = (jobpost) => {
     if (!jobpost) {
       return "N/A";
     }
     const match = jobpost.match(/<strong>Title:<\/strong>&nbsp;([^<]*)/);
     return match ? match[1] : "N/A";
   };

   const getJobTitleFilters = () => {
     const titles = applications.map((app) => extractJobTitle(app.jobpost));
     const uniqueTitles = [...new Set(titles)];
     return uniqueTitles.map((title) => ({
       text: title,
       value: title,
     }));
   };





  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Father Name",
      dataIndex: "fathername",
      key: "fathername",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Job Title",
      key: "jobTitle",
      filters: getJobTitleFilters(),
      onFilter: (value, record) => extractJobTitle(record.jobpost) === value,
      render: (text, record) => <span>{extractJobTitle(record.jobpost)}</span>,
    },
    {
      title: "Download CV",
      key: "downloadCV",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleDownloadCV(record.cv)}>
          Download
        </Button>
      ),
    },
  ];

  
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <AdSidebar />
        <Layout>
          <AdminHead />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            {error && <Alert message={error} type="error" />}
            <div
              style={{
                padding: 24,
                minHeight: 520,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <h4>Job Applications</h4>
             
              <Table
                dataSource={applications}
                columns={columns}
                loading={loading}
                rowKey="_id"
                style={{ marginTop: "3vw" }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ViewApp;
