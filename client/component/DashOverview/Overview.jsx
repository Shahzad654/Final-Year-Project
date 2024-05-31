import React, { useState, useEffect, useContext } from "react";
import "./overview.css";
import { Breadcrumb, Layout, theme, Card, Statistic } from "antd";
import UserContext from "../Usercontext/Usercontext";
import Sidebar from "../../component/DashSidebar/Sidebar";
import DashHead from "../../component/DashboardHeader/DashHead";
import { isAuthenticated } from "../Auth/Auth";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { getData, saveData } from "../utils/indexDB";

const Overview = () => {
  const { billData } = useContext(UserContext);
  const {
    setUserName,
    setEmails,
    setRefnoo,
    setBilldata,
    setArea,
    setComplaintResponses,
    setComplaint,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData();
      if (userData.length > 0) {
        const {
          name,
          email,
          refno,
          billData,
          area,
          complaintResponses,
          complaint,
        } = userData[0];

        setUserName(name);
        setEmails(email);
        setRefnoo(refno);
        setBilldata(billData);
        setArea(area);
        setComplaintResponses(complaintResponses);
        setComplaint(complaint);
      }
    };

    fetchData();
  }, [
    setUserName,
    setEmails,
    setRefnoo,
    setBilldata,
    setArea,
    setComplaintResponses,
    setComplaint,
  ]);

  const firstBillData =
    billData && billData.length > 0 ? billData[billData.length - 1] : null;

  const curreading = firstBillData ? firstBillData.curreading : "N/A";
  const prevreading = firstBillData ? firstBillData.prevreading : "N/A";

  const chartDataUnits = (billData || []).map((item) => {
    return {
      billmonth: item.billmonth || "N/A",
      units: item.billunits || 0,
    };
  });

  const chartDataBills = (billData || []).map((item) => {
    return {
      billmonth: item.billmonth || "N/A",
      bill: item.currbill || 0,
    };
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        <DashHead />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="bill_cards">
              <Card bordered={false}>
                <Statistic
                  title="Current Units"
                  value={firstBillData ? firstBillData.billunits : "N/A"}
                  precision={0}
                  valueStyle={{ color: "blue" }}
                />
              </Card>
              <Card bordered={false}>
                <Statistic
                  title="Current Bill"
                  value={firstBillData ? firstBillData.currbill : "N/A"}
                  precision={0}
                  valueStyle={{ color: "red" }}
                />
              </Card>
              <Card bordered={false}>
                <Statistic
                  title="Current Reading"
                  value={curreading}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <Card bordered={false}>
                <Statistic
                  title="Previous Reading"
                  value={prevreading}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </div>

            <div className="charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={300}
                  height={300}
                  data={chartDataUnits}
                  margin={{
                    top: 5,
                    right: 80,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="billmonth" />
                  <YAxis ticks={[0, 100, 200, 300, 400]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units" fill="green" barSize={20} />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={300}
                  height={300}
                  data={chartDataBills}
                  margin={{
                    top: 5,
                    right: 80,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="billmonth" />
                  <YAxis
                    ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000]}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bill"
                    stroke="red"
                    activeDot={{ r: 8 }}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Overview;
