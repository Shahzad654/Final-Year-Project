import React, { useState } from "react";
import { Form, Button, message } from "antd";
import axios from "axios";
import './forgot.css'

const ForgotPassword = ({ handleforgotCancel }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState("requestOtp");

  const handleRequestOtp = async () => {
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/password/forgot-password",
        { email }
      );
      if (response.data.message === "OTP sent to your email") {
        message.success("OTP sent to your email successfully");
        setStage("verifyOtp");
      } else {
        message.error("Please enter correct email");
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
      message.error("Error during forgot password request");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/password/verify-otp",
        {
          email,
          otp,
        }
      );
      if (response.data.message === "OTP verified") {
        message.success("OTP Verified");
        setStage("resetPassword");
      } else {
        message.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      message.error("Error during OTP verification");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/password/reset-password",
        { email, newPassword }
      );
      if (response.data.message === "Password has been reset successfully") {
        message.success("Password has been reset successfully");
        handleforgotCancel();
      } else {
        message.error("Please enter password");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      message.error("Error during password reset request");
    }
  };

  return (
    <div>
      {stage === "requestOtp" && (
        <Form onFinish={handleRequestOtp}>
          <h5>Forgot Password</h5>
          <Form.Item name="email" label="Email" style={{ marginTop: "3vw" }}>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginLeft: "14vw" }}
          >
            Send OTP
          </Button>
        </Form>
      )}
      {stage === "verifyOtp" && (
        <Form onFinish={handleVerifyOtp}>
          <h5>Verify OTP</h5>
          <Form.Item name="otp" label="OTP" style={{ marginTop: "3vw" }}>
            <input
              className="input-field"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginLeft: "14vw" }}
          >
            Verify OTP
          </Button>
        </Form>
      )}
      {stage === "resetPassword" && (
        <Form onFinish={handleResetPassword}>
          <h5>Reset Password</h5>
          <Form.Item
            name="newPassword"
            label="New Password"
            style={{ marginTop: "3vw" }}
          >
            <input
              className="input-field"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginLeft: "14vw" }}
          >
            Reset Password
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ForgotPassword;
