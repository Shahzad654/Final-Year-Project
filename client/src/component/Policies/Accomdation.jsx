import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import PDF1 from "../../assets/Accomodation/Application-Form-For-Official-Residence-Allotment.pdf";
import Navbarr from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";

const data = [
  {
    key: "1",
    name: "Application-Form-For-Official-Residence-Allotment.pdf",
    document: { PDF: PDF1 },
  }
];

const Accomdation = () => {
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
      dataIndex: "document",
      key: "download",
      render: (_, record) => (
        <Button type="primary" onClick={() => downloadPDF(record.document)}>
          Download
        </Button>
      ),
    },
  ];

  return (
    <>
      <Navbarr />
      <Table
        columns={columns}
        dataSource={data}
        style={{
          marginTop: "8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Footer />
    </>
  );
};

export default Accomdation;
