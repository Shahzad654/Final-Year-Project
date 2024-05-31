import React, { useContext, useState, useEffect } from "react";
import "./bill.css";
import { Breadcrumb, Layout, Button, Image, theme } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Sidebar from "../../component/DashSidebar/Sidebar";
import DashHead from "../../component/DashboardHeader/DashHead";
import UserContext from "../../component/Usercontext/Usercontext";

const { Content } = Layout;

const Bill = () => {
  const { billData } = useContext(UserContext);
  const [imageData, setImageData] = useState(null);

  const handleDownload = () => {
    if (billData.length > 0) {
      const lastBill = billData[billData.length - 1];
      const imageData =
        lastBill && lastBill.billimage && lastBill.billimage.data;
      if (imageData) {
        const base64String = btoa(
          String.fromCharCode.apply(null, new Uint8Array(imageData))
        );
        const imageBase64 = `data:image/jpeg;base64,${base64String}`;

        const a = document.createElement("a");
        a.href = imageBase64;
        a.download = "bill_image.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  useEffect(() => {
    if (billData.length > 0) {
      const lastBill = billData[billData.length - 1];
      const imageData =
        lastBill && lastBill.billimage && lastBill.billimage.data;
      console.log("Image is:", imageData);
      setImageData(imageData);
    }
  }, [billData]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <DashHead />
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
            <div className="bill_container">
              <Button
                type="primary"
                id="print-btn"
                icon={<DownloadOutlined />}
                onClick={handleDownload}
              >
                Download
              </Button>{" "}
              {imageData && (
                <Image
                  width={300}
                  src={`data:image/jpeg;base64,${btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(imageData.data)
                    )
                  )}`}
                  alt="Bill"
                  id="bill-img"
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Bill;
