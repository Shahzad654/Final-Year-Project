import React, { useState } from "react";
import AdSidebar from "../AdminSidebar/AdSidebar";
import { Button, Input, Breadcrumb, Layout, theme, Alert, Spin } from "antd";
import AdminHead from "../DashboardHeader/AdminHead";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const { Content } = Layout;

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyC7wutVlGWr46lNH4mssMNQDDKJMpMoBis";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const Theft = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    setData([]);

    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [
              {
                text: "I will give you a user last 26 months electricity unit consumption. so according to consumption please check is there any suspicious activity like a sudden high in consumption or sudden low in consumption and also check other factors involve in it. After checking it just give the result that there is suspicious activity or not. If yes then why and if no then why? please answer only the result and reason.",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Please provide me with the user's last 26 months of electricity consumption data. I will then analyze it and tell you if there's any suspicious activity and why.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: input }],
          },
        ],
      });

      const response = await chatSession.sendMessage("");
      const resultText = response.response.text();
      setResult(resultText);

      const consumptionData = input.split(",").map((value, index) => ({
        month: index + 1,
        units: parseInt(value, 10),
      }));

      setData(consumptionData);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while processing the data.");
    } finally {
      setLoading(false);
    }
  };

  
  

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
            <h4>Theft Analysis</h4>
            <Alert
              message="Enter User's last 26 months units consumption"
              type="warning"
              showIcon
              style={{ marginTop: 2 }}
            />
            <Input.TextArea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter consumption data separated by commas"
              style={{ marginTop: 20 }}
            />
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
            >
              Submit
            </Button>
            {loading && <Spin style={{ marginTop: 16, marginLeft:'3vw' }} />}
            {result && (
              <>
                <Alert
                  message="Analysis Result"
                  description={result}
                  type="info"
                  showIcon
                  style={{ marginTop: 20 }}
                />
                <LineChart
                  width={600}
                  height={300}
                  data={data}
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="units" stroke="#8884d8" />
                </LineChart>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Theft;
