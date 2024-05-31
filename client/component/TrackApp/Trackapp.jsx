import React, { useState } from "react";
import axios from "axios";
import { Input, Space, message, Timeline } from "antd";

const { Search } = Input;

const Trackapp = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [searched, setSearched] = useState(false);

  const onSearch = async (cnic) => {
    try {
      const response = await axios.get(
        `https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/getappstatus/getStatus?cnic=${cnic}`
      );
      console.log("Response from backend:", response.data);
      setTimelineData(response.data);
      setSearched(true);
    } catch (error) {
      message.error("Error fetching status. Please try again.");
      console.error("Error fetching status:", error);
    }
  };

  const handleSearch = (value) => {
    if (value) {
      onSearch(value);
    } else {
      message.warning("Please enter a CNIC number.");
    }
  };

  return (
    <>
      <Space direction="vertical">
        <Search
          placeholder="Enter your CNIC Number"
          onSearch={handleSearch}
          enterButton
        />
      </Space>
      {searched && timelineData.length > 0 && (
        <Timeline style={{ marginTop: "3vw" }}>
          {timelineData.map((status, index) => (
            <Timeline.Item key={index}>
              <p>{status.status}</p>
              {status.refno && <p>Reference Number: {status.refno}</p>}
            </Timeline.Item>
          ))}
        </Timeline>
      )}
      {searched && timelineData.length === 0 && (
        <p>No statuses found for the provided CNIC.</p>
      )}
    </>
  );
};

export default Trackapp;
