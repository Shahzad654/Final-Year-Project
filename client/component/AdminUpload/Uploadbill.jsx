import React, { useState } from "react";
import "./upload.css";
import axios from "axios";
import { Button, Input, DatePicker, Upload } from "antd";
import { Breadcrumb, Layout, theme, message } from "antd";
import AdSidebar from "../AdminSidebar/AdSidebar";
import { UploadOutlined } from "@ant-design/icons";
import AdminHead from "../DashboardHeader/AdminHead";

const { Content } = Layout;

const Uploadbill = () => {
  const [refno, setRefno] = useState("");
  const [billunits, setBillunits] = useState("");
  const [currbill, setCurrbill] = useState("");
  const [billmonth, setBillmonth] = useState("");
  const [curreading, setCurreading] = useState("");
  const [prevreading, setPrevreading] = useState("");
  const [duedate, setDuedate] = useState(null);
  const [file, setFile] = useState(null);

  const handleAdmin = async (e) => {
    e.preventDefault();
    
     const refnoRegex = /^20\s\d{5}\s\d{7}\s[U]$/;
     if (!refnoRegex.test(refno)) {
       message.warning(
         "Please enter a valid reference number in the format '20 12235 0499411 U'."
       );
       return;
     }

     if (
       !refno ||
       !billunits ||
       !currbill ||
       !billmonth ||
       !curreading ||
       !prevreading ||
       !duedate ||
       !file
     ) {
       message.warning("Please fill in all the required fields.");
       return;
     }


    try {
      const billData = [
        {
          billunits: billunits,
          currbill: currbill,
          billmonth: billmonth,
          curreading: curreading,
          prevreading: prevreading,
          duedate: duedate ? duedate.format("YYYY-MM-DD") : null,
          paystatus: "unpaid",
        },
      ];

      const formData = new FormData();
      formData.append("refno", refno);
      formData.append("billData", JSON.stringify(billData));

      if (file) {
        formData.append("billimage", file);
      }

      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/billinfo/bill",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Added Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            <h4 style={{marginBottom:'2vw'}}>Upload Bill</h4>
            <div className="upload_bill">
              <label htmlFor="upload-refno">Reference No</label>
              <Input
                id="upload-refno"
                placeholder="Enter user refno"
                value={refno}
                onChange={(e) => setRefno(e.target.value)}
              />

              <label htmlFor="upload-units">Units</label>
              <Input
                id="upload-units"
                placeholder="Enter consumed units"
                value={billunits}
                onChange={(e) => setBillunits(e.target.value)}
              />

              <label htmlFor="upload-amt">Bill Amount</label>
              <Input
                id="upload-amt"
                placeholder="Enter total bill amount"
                value={currbill}
                onChange={(e) => setCurrbill(e.target.value)}
              />
            </div>

            <div className="upload-bill2">
              <label htmlFor="upload-month">Bill Month</label>
              <Input
                id="upload-month"
                placeholder="Enter bill month"
                value={billmonth}
                onChange={(e) => setBillmonth(e.target.value)}
              />

              <label htmlFor="upload-curr">Current Reading</label>
              <Input
                id="upload-curr"
                placeholder="Enter current reading"
                value={curreading}
                onChange={(e) => setCurreading(e.target.value)}
              />

              <label htmlFor="upload-prev">Previous Reading</label>
              <Input
                id="upload-prev"
                placeholder="Enter previous reading"
                value={prevreading}
                onChange={(e) => setPrevreading(e.target.value)}
              />

              <label>Due Date</label>
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => setDuedate(date)}
              />

              <label>Bill Image</label>
              <Upload
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
                maxCount={1}
                fileList={file ? [file] : []}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>

              <br />
              <br />

              <Button type="primary" onClick={handleAdmin}>
                Upload
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Uploadbill;
