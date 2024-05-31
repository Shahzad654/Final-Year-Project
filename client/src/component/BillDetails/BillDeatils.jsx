import React, { useState } from "react";
import axios from "axios";
import AdSidebar from "../AdminSidebar/AdSidebar";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Input, Breadcrumb, Layout, theme, Table, message } from "antd";
import AdminHead from "../DashboardHeader/AdminHead";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Content } = Layout;

const BillDetails = () => {
  const [users, setUsers] = useState([]);
  const [refnoInput, setRefnoInput] = useState("");

  const handleUsers = async (e) => {
    e.preventDefault();
    try {
      if (!refnoInput.trim()) {
        message.error("Refno cannot be empty");
        return;
      }

      const response = await axios.get(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/getusers/billdata/${refnoInput}`
      );

      setUsers([response.data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const billColumns = [
    {
      title: "Bill Units",
      dataIndex: "billunits",
      key: "billunits",
    },
    {
      title: "Current Bill",
      dataIndex: "currbill",
      key: "currbill",
    },
    {
      title: "Bill Month",
      dataIndex: "billmonth",
      key: "billmonth",
    },
    {
      title: "Current Reading",
      dataIndex: "curreading",
      key: "curreading",
    },
    {
      title: "Previous Reading",
      dataIndex: "prevreading",
      key: "prevreading",
    },
    {
      title: "Payment",
      dataIndex: "paystatus",
      key: "paystatus",
    },
  ];

  const mapBillDataToTableData = (users) => {
    return users.flatMap((user) =>
      user.billData.map((bill) => ({
        billunits: bill.billunits,
        currbill: bill.currbill,
        billmonth: bill.billmonth,
        curreading: bill.curreading,
        prevreading: bill.prevreading,
        paystatus: bill.paystatus,
      }))
    );
  };

  const generatePDF = (data, refno) => {
    try {
      const doc = new jsPDF();
      const columns = [
        "Bill Units",
        "Current Bill",
        "Bill Month",
        "Current Reading",
        "Previous Reading",
        "Payment",
      ];

      const tableData = mapBillDataToTableData(data).map((item) => [
        item.billunits,
        item.currbill,
        item.billmonth,
        item.curreading,
        item.prevreading,
        item.paystatus,
      ]);

      doc.text(`Reference Number: ${refno}`, 10, 10);
      doc.autoTable({ head: [columns], body: tableData, startY: 20 });
      doc.save("bill_details.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const tableData = mapBillDataToTableData(users);

  return (
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
            <div className="get_users">
              <Input
                id="search-user-input"
                type="text"
                placeholder="Enter reference number"
                value={refnoInput}
                onChange={(e) => setRefnoInput(e.target.value)}
              />
              <br />
              <Button
                type="primary"
                size="small"
                id="user-search-btn"
                style={{ marginLeft: "-2vw", marginTop: "0.3vw" }}
                onClick={handleUsers}
              >
                Search
              </Button>
              {tableData.length > 0 && (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => generatePDF(users, refnoInput)}
                >
                  <DownloadOutlined />
                </Button>
              )}
            </div>

            <div className="display_users">
              <div className="table_card">
                <Table columns={billColumns} dataSource={tableData} />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BillDetails;
