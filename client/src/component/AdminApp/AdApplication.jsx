import React, { useEffect, useState } from "react";
import "./adapplication.css";
import {
  Table,
  Button,
  Layout,
  Breadcrumb,
  Modal,
  Select,
  Image,
  Input,
  Spin,
  theme,
  Tag,
  Space,
} from "antd";
import {SearchOutlined} from '@ant-design/icons'
import axios from "axios";
import AdSidebar from "../AdminSidebar/AdSidebar";
import AdminHead from "../DashboardHeader/AdminHead";
import jsPDF from "jspdf";


const { Content } = Layout;

const AdApplication = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDoc, setIsModalOpenDoc] = useState(false);
  const [isModalOpenStat, setIsModalOpenStat] = useState(false);
  const [isModalOpenassign, setIsModalOpenassign] = useState(false);
  const [status, setStatus] = useState("");
  const [assignRefNo, setAssignRefNo] = useState("");
  const [connDate, setConnDate] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchCNIC, setSearchCNIC] = useState("");


  const handleSearchCNIC = (value) => {
    setSearchCNIC(value);
    const filteredApplications = applications.filter((application) =>
      application.cnic.includes(value)
    );
    setApplications(filteredApplications);
  };


  const showModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const showModalDoc = (application) => {
    setSelectedApplication(application);
    setIsModalOpenDoc(true);
  };

  const showModalStatus = (application) => {
    setSelectedApplication(application);
    setIsModalOpenStat(true);
  };

  const showModalassign = (application) => {
    setSelectedApplication(application);
    setIsModalOpenassign(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelDoc = () => {
    setIsModalOpenDoc(false);
  };

  const handleCancelStat = () => {
    setIsModalOpenStat(false);
  };

  const handleCancelassign = () => {
    setIsModalOpenassign(false);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/getapplication/getsubapli"
        );
        setApplications(
          response.data.map((application) => ({
            ...application,
            status: application.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleAssignRefNo = async () => {
    try {
      const { _id } = selectedApplication;

      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/application/assignref",
        {
          assignrefno: assignRefNo,
          conndate: connDate,
          appId: _id,
        }
      );

      console.log(response.data);

      alert("Reference Assigned!");
    } catch (err) {
      console.error("Error assigning reference:", err);
    }
  };

  const handleStatus = async () => {
    try {
      const { cnic } = selectedApplication;

      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/appstatus/status",
        {
          status: status,
          applicationId: selectedApplication._id,
          cnic: cnic,
        }
      );

      console.log(response.data);

      alert("Status Updated!");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleUpdateStatus = async (appId) => {
    try {
      const response = await axios.put(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/application/updatestatus/${appId}`
      );
      console.log(response.data);
      const updatedApplications = applications.map((application) =>
        application._id === appId
          ? { ...application, status: "clear" }
          : application
      );
      setApplications(updatedApplications);
      alert("Status Updated!");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF();

    const content = `
    Applicant Name: ${selectedApplication && selectedApplication.applicantname}
    CNIC: ${selectedApplication && selectedApplication.cnic}
    Applicant Status: ${
      selectedApplication && selectedApplication.applicantstatus
    }
    Address: ${selectedApplication && selectedApplication.address}
    Category: ${selectedApplication && selectedApplication.category}
    Sub-Division: ${selectedApplication && selectedApplication.subdivision}
    Neighbour reference number: ${
      selectedApplication && selectedApplication.negrefno
    }
    Mobile#1: ${selectedApplication && selectedApplication.mob1}
    Mobile#2: ${selectedApplication && selectedApplication.mob2}
    Installed Meter: ${selectedApplication && selectedApplication.installedmet}
    Load: ${selectedApplication && selectedApplication.load}
    Premises Address: ${selectedApplication && selectedApplication.premaddress}
    `;

    doc.text(content, 10, 10);

    doc.save("application_details.pdf");
  };


  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "applicantname",
      key: "applicantname",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
      // Add filter functionality on CNIC column
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search CNIC"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearchCNIC(selectedKeys[0])}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchCNIC(selectedKeys[0])}
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
      onFilter: (value, record) => record.cnic.includes(value),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "clear" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => showModal(record)}>
            View Details
          </Button>
          <Button type="link" onClick={() => showModalDoc(record)}>
            View Documents
          </Button>
          {record.status !== "clear" && (
            <Button type="link" onClick={() => showModalStatus(record)}>
              Proceed
            </Button>
          )}
          {record.status === "pending" && (
            <Button type="link" onClick={() => handleUpdateStatus(record._id)}>
              Update Status
            </Button>
          )}
        </span>
      ),
    },
  ];

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
                display: "flex",
                padding: 24,
                minHeight: 520,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Spin size="large" />
              ) : (
                <Table
                  dataSource={applications}
                  columns={columns}
                  pagination={{ pageSize: 5 }}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          <strong>Category:</strong>{" "}
          {selectedApplication && selectedApplication.category}
        </p>
        <p>
          <strong>Subdivision:</strong>{" "}
          {selectedApplication && selectedApplication.subdivision}
        </p>
        <p>
          <strong>Neigbhour Reference No:</strong>{" "}
          {selectedApplication && selectedApplication.negrefno}
        </p>

        <p>
          <strong>Applicant Status:</strong>{" "}
          {selectedApplication && selectedApplication.applicantstatus}
        </p>
        <p>
          <strong>Applicant CNIC:</strong>{" "}
          {selectedApplication && selectedApplication.cnic}
        </p>

        <p>
          <strong>Mobile No#1:</strong>{" "}
          {selectedApplication && selectedApplication.mob1}
        </p>

        <p>
          <strong>Mobile No#2:</strong>{" "}
          {selectedApplication && selectedApplication.mob2}
        </p>

        <p>
          <strong>Installed Meter:</strong>{" "}
          {selectedApplication && selectedApplication.installedmet}
        </p>

        <p>
          <strong>Minimum Load:</strong>{" "}
          {selectedApplication && selectedApplication.load}
        </p>

        <p>
          <strong>Premises Address:</strong>{" "}
          {selectedApplication && selectedApplication.premaddress}
        </p>
        <Button type="primary" onClick={generatePDF}>
          Download
        </Button>
      </Modal>

      <Modal
        title="Update Status"
        open={isModalOpenStat}
        onCancel={handleCancelStat}
        footer={null}
      >
        <Select value={status} style={{ width: "100%" }} onChange={setStatus}>
          <Select.Option value="Sent for Verification">
            Sent for Verification
          </Select.Option>
          <Select.Option value="Application Verified">
            Application Verified
          </Select.Option>
          <Select.Option value="Sent for Meter Request">
            Sent for Meter Request
          </Select.Option>
          <Select.Option value="Ready to Install Meter">
            Ready to Install Meter
          </Select.Option>
        </Select>
        <Button
          type="primary"
          style={{ marginTop: "2vw" }}
          onClick={handleStatus}
        >
          Update
        </Button>
        <Button type="primary" onClick={() => setIsModalOpenassign(true)}>
          Assign Refno
        </Button>
      </Modal>

      <Modal
        title="Assign Reference Number"
        open={isModalOpenassign}
        onCancel={handleCancelassign}
        footer={null}
      >
        <Input
          placeholder="Reference Number"
          value={assignRefNo}
          onChange={(e) => setAssignRefNo(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input
          placeholder="Connection Date"
          value={connDate}
          onChange={(e) => setConnDate(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button type="primary" onClick={handleAssignRefNo}>
          Assign
        </Button>
      </Modal>

      <Modal
        title="Documents"
        open={isModalOpenDoc}
        onCancel={handleCancelDoc}
        footer={null}
      >
        <Image
          width={200}
          src={`data:image/png;base64, ${btoa(
            new Uint8Array(
              selectedApplication && selectedApplication.negbill.data
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt="Neighbour's Bill"
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onDownload,
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => <></>,
          }}
        />

        <Image
          width={200}
          src={`data:image/png;base64, ${btoa(
            new Uint8Array(
              selectedApplication && selectedApplication.cniccop.data
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt="Neighbour's Bill"
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onDownload,
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => <></>,
          }}
        />

        <Image
          width={200}
          src={`data:image/png;base64, ${btoa(
            new Uint8Array(
              selectedApplication && selectedApplication.witcnic.data
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt="Neighbour's Bill"
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onDownload,
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => <></>,
          }}
        />

        <Image
          width={200}
          src={`data:image/png;base64, ${btoa(
            new Uint8Array(
              selectedApplication && selectedApplication.testreport.data
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt="Neighbour's Bill"
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onDownload,
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => <></>,
          }}
        />
      </Modal>
    </>
  );
};

export default AdApplication;
