import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import PDF1 from "../../assets/1-Service Rules 2021.pdf";
import PDF2 from "../../assets/10-Performance Management Policy.pdf";
import PDF3 from "../../assets/11-Vehical mgt system.pdf";
import PDF4 from "../../assets/12-TRANSFER Posting policy.pdf";
import PDF5 from "../../assets/13-HRIS automated office notifications.pdf";
import PDF6 from "../../assets/14-HRIS Profile Locking System.pdf";
import PDF7 from "../../assets/15-House allocation policy.pdf";
import PDF8 from "../../assets/16-Deputation.pdf";
import PDF9 from "../../assets/17-Collaborative Office Management System.pdf";
import PDF10 from "../../assets/18-Online Attedance Management.pdf";
import Navbarr from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";

const data = [
  {
    key: "1",
    name: "1-Service Rules 2021.pdf",
    document: { PDF: PDF1 },
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "10-Performance Management Policy.pdf",
    document: { PDF: PDF2 },
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "11-Vehical mgt system.pdf",
    document: { PDF: PDF3 },
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "12-TRANSFER Posting policy.pdf",
    document: { PDF: PDF4 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "13-HRIS automated office notifications.pdf",
    document: { PDF: PDF5 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    name: "14-HRIS Profile Locking System.pdf",
    document: { PDF: PDF6 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    name: "15-House allocation policy.pdf",
    document: { PDF: PDF7 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "8",
    name: "16-Deputation.pdf",
    document: { PDF: PDF8 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "9",
    name: "17-Collaborative Office Management System.pdf",
    document: { PDF: PDF9 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "10",
    name: "18-Online Attendance Management.pdf",
    document: { PDF: PDF10 },
    address: "London No. 2 Lake Park",
  },
  {
    key: "11",
    name: "12-TRANSFER Posting policy.pdf",
    document: { PDF: PDF4 },
    address: "London No. 2 Lake Park",
  },
];



const Policy = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const downloadPDF = (record) => {
    const { document } = record;
    if (document && document.PDF) {
      const link = document.PDF;
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank"; 
      a.download = link.substring(link.lastIndexOf("/") + 1);
      document.body.appendChild(a); 
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("PDF link not found in the record:", record);
    }
  };


  const columns = [
    {
      title: "Document",
      dataIndex: "name",
      key: "name",
      width: "70%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Download",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <Button type='primary' onClick={() => downloadPDF(record.document)}>Download</Button>
      ),
    },
  ];

  return (
    <>
      <Navbarr />
      <Table columns={columns} dataSource={data} style={{marginTop: '8vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
      <Footer/>
    </>
  );
};

export default Policy
