import React, { useEffect, useState } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Modal,
  Card,
  Input,
  theme,
  message,
  Tag,
  Space
} from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import AdSidebar from "../AdminSidebar/AdSidebar";
import AdminHead from "../DashboardHeader/AdminHead";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Content } = Layout;
const { TextArea } = Input;

const AdComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [response, setResponse] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admcomplain/getcomp"
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchName = (value) => {
    setSearchName(value);
    const filteredComplaints = complaints.filter((complaint) =>
      complaint.userName.toLowerCase().includes(value.toLowerCase())
    );
    setComplaints(filteredComplaints);
  };

  const updateStatus = async (id) => {
    try {
      await axios.put(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admcomplain/comp/${id}`
      );
      message.success("Complaint status updated successfully.");
      const response = await axios.get(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admcomplain/getcomp"
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      // Add filter functionality on Name column
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearchName(selectedKeys[0])}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchName(selectedKeys[0])}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.userName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Complaint Message",
      dataIndex: "complaintmsg",
      key: "complaintmsg",
    },
    {
      title: "Complaint Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "red" : "green"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" size="small" onClick={() => showModal(record)}>
            More Details
          </Button>
          {record.status === "pending" && (
            <Button
              type="primary"
              size="small"
              onClick={() => updateStatus(record._id)}
              style={{ marginLeft: "2vw" }}
            >
              Respond
            </Button>
          )}
          {record.status === "pending" && (
            <Button
              type="primary"
              size="small"
              onClick={() => updateStatus(record._id)}
              style={{ marginLeft: "2vw" }}
            >
              Mark as Clear
            </Button>
          )}
          <Button
            type="primary"
            size="small"
            onClick={() => generatePDF(record)}
            style={{ marginLeft: "2vw" }}
          >
            <DownloadOutlined />
          </Button>
        </>
      ),
    },
  ];

  const showModal = (record) => {
    setModalContent(record);
    setModalVisible(true);
  };

  const showResponseModal = (record) => {
    setModalContent(record);
    setResponse("");
    setResponseModalVisible(true);
  };

  const handleResponse = async () => {
    try {
      const currentTime = Date.now();
      const compmsg = await axios.post("http://localhost:3001/compresp/resp", {
        response,
        complaintId: modalContent._id,
        complaintMsg: modalContent.complaintmsg,
        timestamp: currentTime,
      });
      console.log(compmsg);
      message.success("Message Sent!");
      setResponseModalVisible(false);
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setResponseModalVisible(false);
  };

  const handleResponseCancel = () => {
    setResponseModalVisible(false);
  };

  const generatePDF = (complaint) => {
    const doc = new jsPDF();
    const columns = ["Field", "Details"];
    const rows = [
      ["Name", complaint.userName],
      ["Email", complaint.email],
      ["Cell No", complaint.cellno],
      ["City", complaint.city],
      ["Division", complaint.division],
      ["Nature of Complaint", complaint.nature],
      ["Reference No", complaint.refno],
      ["Complaint", complaint.complaintmsg],
    ];

    doc.text("Complaint Details", 10, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save(`complaint_${complaint.refno}.pdf`);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <AdSidebar />
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
              <h4>All Complaints</h4>
              <Table
                dataSource={complaints}
                columns={columns}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: "2vw" }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Complaint Details"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Card>
          <p>Name: {modalContent.userName}</p>
          <p>Email: {modalContent.email}</p>
          <p>Cell No: {modalContent.cellno}</p>
          <p>City: {modalContent.city}</p>
          <p>Division: {modalContent.division}</p>
          <p>Nature of Complaint: {modalContent.nature}</p>
          <p>Reference No: {modalContent.refno}</p>
          <p>Complaint: {modalContent.complaintmsg}</p>
        </Card>
      </Modal>

      <Modal
        title="Respond to Complaint"
        open={responseModalVisible}
        onCancel={handleResponseCancel}
        footer={null}
      >
        <Card>
          <TextArea
            placeholder="Enter your Response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleResponse}
            style={{
              paddingLeft: "5vw",
              paddingRight: "5vw",
              marginLeft: "10vw",
              marginTop: "2vw",
            }}
          >
            Send
          </Button>
        </Card>
      </Modal>
    </>
  );
};

export default AdComplaint;
