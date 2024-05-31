import React, { useState, useEffect } from "react";
import "./job.css";
import {
  Layout,
  Card,
  message,
  Button,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbarr from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedJob, setSelectedJob] = useState(null); 

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/job/getjobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      message.error("Failed to fetch jobs. Please try again later.");
    }
  };

  const showModal = (job) => {
    setSelectedJob(job); 
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (selectedJob) {
        formData.append("jobpost", selectedJob.jobpost); 
      }

      if (values.cv && values.cv.length > 0) {
        formData.append("cv", values.cv[0].originFileObj);
      }

      await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/jobapp/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Application submitted successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting application:", error);
      message.error("Please fill all the details");
    }
  };

  return (
    <>
      <Navbarr />
      <div className="job_main">
        <h3 style={{ marginLeft: "4vw" }}>Jobs</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {jobs.map((job) => (
            <Card
              id="job_cards"
              key={job?._id}
              title={job?.title}
              style={{
                width: 300,
                margin: 16,
                maxHeight: 250,
                marginLeft: "3vw",
                backgroundColor: "Background",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: job?.jobpost }} />
              <Button type="primary" onClick={() => showModal(job)}>
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <Footer />

      <Modal
        title="Apply for Job"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="applicationForm">
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Father's Name"
            name="fathername"
            rules={[
              { required: true, message: "Please enter your father's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CNIC"
            name="cnic"
            rules={[{ required: true, message: "Please enter your CNIC!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Qualification"
            name="qualification"
            rules={[
              { required: true, message: "Please enter your qualification!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CV"
            name="cv"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: "Please upload your CV!" }]}
          >
            <Upload name="cv" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload CV</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Job;
