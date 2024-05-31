import React, { useContext, useEffect, useState } from "react";
import { Layout, Card, Button, Tag, Table, theme } from "antd";
import UserContext from "../Usercontext/Usercontext";
import Sidebar from "../DashSidebar/Sidebar";
import DashHead from "../DashboardHeader/DashHead";
import BillIcon from "../../assets/billicon.jpg";

const { Meta } = Card;
const { Content } = Layout;

const Payment = () => {
  const [paidBills, setPaidBills] = useState([]);
  const { billData, refno } = useContext(UserContext);
  const firstBillData = billData.slice(-1)[0];
  const isPaid = firstBillData && firstBillData.paystatus === "paid";
  const currentDate = new Date();
  const latestPaidBill =
    paidBills.length > 0 ? paidBills[paidBills.length - 1] : null;
  const dueDate = latestPaidBill && new Date(latestPaidBill.duedate);
  const isOverdue = dueDate && currentDate > dueDate;

  useEffect(() => {
    const filteredBills = billData.filter((bill) => bill.paystatus === "paid");
    setPaidBills(filteredBills);
  }, [billData]);

  const handleCheckout = async () => {
    if (!isPaid) {
      try {
        const response = await fetch(
          "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/pay/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
              items: [
                {
                  id: 1,
                  price: firstBillData.currbill,
                  name: "Pay Bill",
                  refno: refno,
                },
              ],
            }),
          }
        );
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("Stripe Checkout URL not received from the server");
        }
      } catch (error) {
        console.error(error);
        window.location.href = "http://localhost:5173/cancel";
      }
    }
  };

  const columns = [
    {
      title: "Month",
      dataIndex: "billmonth",
      key: "billmonth",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rs. ${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="green">{status}</Tag>,
    },
  ];

  const data = paidBills.map((bill) => ({
    key: bill._id,
    billmonth: bill.billmonth,
    price: bill.currbill,
    status: "Paid",
  }));
  
   const {
     token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <DashHead />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              marginTop: "2vw",
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h5 style={{ marginLeft: "2vw" }}>Pay Bill Online</h5>
            <p style={{ marginLeft: "2vw" }}>Your Reference No:{refno}</p>

            <div style={{ display: "flex" }}>
              <div>
                <Card
                  style={{
                    width: 300,
                    marginLeft: "2vw",
                    marginTop: "2vw",
                  }}
                  cover={<img alt="bill icon" src={BillIcon} />}
                  actions={[
                    isPaid ? (
                      <Button disabled>Paid</Button>
                    ) : isOverdue ? (
                      <Button danger>Overdue</Button>
                    ) : (
                      <Button type="primary" onClick={handleCheckout}>
                        Pay
                      </Button>
                    ),
                  ]}
                >
                  <Meta
                    style={{ marginLeft: "5vw" }}
                    title={
                      firstBillData
                        ? `Rs. ${firstBillData.currbill}`
                        : "No Bill Data"
                    }
                    description={
                      firstBillData
                        ? `Due Date: ${firstBillData.duedate}`
                        : "No Bill Data"
                    }
                  />
                </Card>
              </div>
              <div>
                <h6 style={{ marginLeft: "34vw" }}>Payment Histroy</h6>
                <Table
                  style={{ marginTop: "2vw", marginLeft: "30vw" }}
                  columns={columns}
                  dataSource={paidBills.map((bill) => ({
                    key: bill._id,
                    billmonth: bill.billmonth,
                    price: bill.currbill,
                    status: "Paid",
                  }))}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Payment;

