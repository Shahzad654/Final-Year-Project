import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Box } from "@chakra-ui/react";
import AdminImg from "../../assets/adminlogin.webp";
import axios from "axios"; 

const SuperLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/superadmin/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data === "Login Sucessfully!") {
        message.success("Login successful!");
        setIsLoggedIn(true);
        navigate("/superdashboard");
      } else {
        message.error("Incorrect email or password!");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h4 style={{ marginLeft: "40vw", marginTop: "5vw" }}>
        Super Admin Login
      </h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#007bff",
          borderColor: "black",
          width: "60vw",
          height: "30vw",
          margin: "auto",
          marginTop: "5vw",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
          <div>
            <img src={AdminImg} alt="" style={{ height: "30vw" }} />
          </div>
          <div style={{ marginRight: "4vw" }}>
            <Box>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                  marginTop: "10vw",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderColor: "green",
                      paddingLeft: "4vw",
                      paddingRight: "4vw",
                      marginLeft: "3vw",
                    }}
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperLogin;
