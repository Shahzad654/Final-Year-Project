import { React, useState, useEffect, useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Space } from "antd";
import UserContext from "../Usercontext/Usercontext";
import Signup from "../../component/Signup/Signup";
import { Button, Modal, message } from "antd";
import { saveData } from "../utils/indexDB";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [refno, setRefno] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSucc, setShowAlertSucc] = useState(false);
  const [userId, setUserId] = useState("");
  const { setUserName } = useContext(UserContext);
  const { setEmails } = useContext(UserContext);
  const { setRefnoo } = useContext(UserContext);
  const { setArea } = useContext(UserContext);
  const { setBilldata } = useContext(UserContext);
  const { setComplaintResponses } = useContext(UserContext);
  const { setComplaint } = useContext(UserContext);
  const [issignModalOpen, setIssignModalOpen] = useState(false);
  const [isforgotModalOpen, setIsforgotModalOpen] = useState(false);

  const showsignModal = () => {
    setIssignModalOpen(true);
  };

  const handlesignCancel = () => {
    setIssignModalOpen(false);
  };

  const showforgotModal = () => {
    setIsforgotModalOpen(true);
  };

  const handleforgotCancel = () => {
    setIsforgotModalOpen(false);
  };

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, [userId, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/login/log",
        {
          refno,
          password,
        }
      );

      if (response.data.message === "Success!") {
        const userData = {
          name: response.data.name,
          email: response.data.email,
          refno: response.data.refno,
          userId: response.data.userId,
          billData: response.data.billData,
          area: response.data.area,
          complaint: response.data.filedComplaints,
          complaintResponses: response.data.complaintResponses,
        };
        console.log(userData)

        setUserName(userData.name);
        setEmails(userData.email);
        setRefnoo(userData.refno);
        setUserId(userData.userId);
        setBilldata(userData.billData);
        setArea(userData.area);
        setComplaint(userData.filedComplaints);
        setComplaintResponses(userData.complaintResponses);

        await saveData(userData);
        message.success("Welcome to Dashboard");
      } else {
        message.error("Wrong Reference Number or Password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="main_login_container">
        <div className="form-border">
          <Form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {showAlert && (
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Alert message="Wrong Email or Password" type="warning" />
              </Space>
            )}

            {showAlertSucc && (
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Alert message="Welcome to Dashboard" type="success" />
              </Space>
            )}

            <h5>Login</h5>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Refernce No</Form.Label>
              <Form.Control
                type="text"
                id="form-control"
                placeholder="Enter refernce no"
                onChange={(e) => {
                  setRefno(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your reference no with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <a style={{ marginTop: "3vw" }} onClick={showforgotModal}>
              Forgot Password
            </a>

            <Button
              id="sub-login-btn"
              variant="success"
              type="primary"
              // type="submit"
              onClick={handleLogin}
              style={{
                paddingLeft: "5vw",
                paddingRight: "5vw",
                marginLeft: "5vw",
              }}
            >
              Login
            </Button>
            <div
              style={{ display: "flex", marginLeft: "9vw", marginTop: "2vw" }}
            >
              <p>Don't Have Any Account?</p>
              <a
                onClick={showsignModal}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                Register Now
              </a>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        id="popover-signup"
        open={issignModalOpen}
        onCancel={handlesignCancel}
        footer={null}
      >
        <Signup handlesignCancel={handlesignCancel} />
      </Modal>

      <Modal
        id="popover-signup"
        open={isforgotModalOpen}
        onCancel={handleforgotCancel}
        footer={null}
      >
        <ForgotPassword handleforgotCancel={handleforgotCancel} />
      </Modal>
    </>
  );
};
export default Login;
