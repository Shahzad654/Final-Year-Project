import React from "react";
import { Table, Typography, Divider } from "antd";
import Navbarr from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";

const { Title, Paragraph } = Typography;

const Pension = () => {
  const dataceo = [
    {
      key: "1",
      designation: "Chief Executive Officer",
      officePhone: "055-9200507",
      fax: "055-9200508",
      emailAddress: "ceogepco@yahoo.com",
      postalAddress: "GEPCO Hqr., 565 A, Model Town, G.T. Road, Gujranwala",
    },
  ];

  const columnsceo = [
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Office Phone#", dataIndex: "officePhone", key: "officePhone" },
    { title: "Fax#", dataIndex: "fax", key: "fax" },
    { title: "Email Address", dataIndex: "emailAddress", key: "emailAddress" },
    {
      title: "Postal Address",
      dataIndex: "postalAddress",
      key: "postalAddress",
    },
  ];

  const datafocal = [
    {
      key: "1",
      name: "Mr. Iyaz Ahmad",
      designation: "Finance Director",
      officePhone: "055-9200512",
      fax: "055-9200530",
      emailAddress: "fdgepco@hotmail.com",
      postalAddress:
        "GEPCO Hqr., Room# 35, 565 A, Model Town, G.T. Road, Gujranwala",
    },
  ];

  const columnsfocal = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Office Phone#", dataIndex: "officePhone", key: "officePhone" },
    { title: "Fax#", dataIndex: "fax", key: "faxofficePhone" },
    { title: "Email Address", dataIndex: "emailAddress", key: "emailAddress" },
    {
      title: "Postal Address",
      dataIndex: "postalAddress",
      key: "postalAddress",
    },
  ];

  const datapension = [
    {
      key: "1",
      officePhone: "055-9200519-26 (Ext. 407)",
      fax: "055-9200530",
      emailAddress: "gepco.pension@gmail.com",
      postalAddress:
        "GEPCO Hqr., Room# 61, 565 A, Model Town, G.T. Road, Gujranwala",
    },
  ];

  const columnspension = [
    { title: "Office Phone#", dataIndex: "officePhone", key: "officePhone" },
    { title: "Fax#", dataIndex: "fax", key: "faxofficePhone" },
    { title: "Email Address", dataIndex: "emailAddress", key: "emailAddress" },
    {
      title: "Postal Address",
      dataIndex: "postalAddress",
      key: "postalAddress",
    },
  ];

  return (
    <>
      <Navbarr />
      <div style={{ padding: "20px", marginTop:'5vw' }}>
        <Title level={3}>Pension Cell GEPCO</Title>
        <Paragraph>
          Chief Executive Officer, GEPCO can be contacted from 2:00pm to 3:00pm
          on every Friday regarding Pension matter at the following Phone
          Numbers
        </Paragraph>
        <Table dataSource={dataceo} columns={columnsceo} bordered />
        <Divider />
        <Paragraph>
          To Resolve the Pension issue focal person can be contacted daily at
          10:00am to 11:00am:
        </Paragraph>
        <Table dataSource={datafocal} columns={columnsfocal} bordered />
        <Divider />
        <Paragraph>GEPCO Pension Cell:</Paragraph>
        <Table dataSource={datapension} columns={columnspension} bordered />
      </div>

      <div style={{ padding: "20px" }}>
        <Title level={3}>List of GEPCO employees to be retired</Title>
        <div>
          <Paragraph>
            <a
              href="http://www.gepco.com.pk/Pension/CY-2024.pdf"
              target="_blank"
            >
              List of GEPCO Employees To be Retired During 2024 : DOWNLOAD (PDF)
            </a>
          </Paragraph>
          <Paragraph>
            <a
              href="http://www.gepco.com.pk/Pension/FY2023-2024.pdf"
              target="_blank"
            >
              List of GEPCO Employees To be Retired During FY-2023-2024:
              DOWNLOAD (PDF)
            </a>
          </Paragraph>
          <Paragraph>
            <a
              href="http://www.gepco.com.pk/Pension/FY2024-2025.pdf"
              target="_blank"
            >
              List of GEPCO Employees To be Retired During FY-2024-2025:
              DOWNLOAD (PDF)
            </a>
          </Paragraph>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pension;
