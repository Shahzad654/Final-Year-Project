import React from "react";
import { Button, Breadcrumb, Layout, theme, Form, Input, message } from "antd";
import axios from "axios";
import AdminHead from "../DashboardHeader/AdminHead";
import SuperSidebar from "./SuperSidebar";

const { Content } = Layout;

const SuperAdmin = () => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/admin/add",
        values
      );
      message.success(response.data);
    } catch (error) {
      message.error("An error occurred while adding the admin.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperSidebar />
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
            <h5>Add new admin</h5>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, marginTop:'5vw' }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
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
                <Input />
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
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuperAdmin;
