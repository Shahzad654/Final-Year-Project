import { React, useState } from "react";
import "./signup.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Button, message } from "antd";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const Signup = ({ handlesignCancel }) => {
  const [name, setName] = useState("");
  const [refno, setRefno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const handleSignup = () => {
    if (!name || !refno || !email || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    const refnoPattern = /^\d{2}\s\d{5}\s\d{7}\s[A-Z]$/;

    if (!refno.match(refnoPattern)) {
      setErrorMessage(
        "Please enter a valid reference number (e.g., 20 12235 0499411 U)."
      );
      return;
    }

    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    }

    axios
      .post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/signup/sign",
        {
          name,
          refno,
          email,
          password,
        }
      )
      .then((response) => {
        message.success("SignUp Successfully!");
        handlesignCancel();
      })
      .catch((error) => {
        console.error("Signup error:", error);
        message.error("Signup failed. Please try again.");
      });
  };

  return (
    <>
      <div className="main_signup_container">
        <Form className="signup-form">
          <h5>SignUp</h5>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail" id="ref-no">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              id="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            id="form-control"
          >
            <Form.Label>Refernce No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter refernce no"
              id="form-control"
              onChange={(e) => {
                setRefno(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your reference no with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            id="form-control"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="form-control"
              placeholder="Create Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordLengthError(false); 
              }}
            />
            {passwordLengthError && (
              <Form.Text className="text-danger">
                Password must be at least 8 characters long.
              </Form.Text>
            )}
          </Form.Group>
          <Button
            id="sinup-btn"
            variant="success"
            type="primary"
            onClick={handleSignup}
            style={{
              paddingLeft: "5vw",
              paddingRight: "5vw",
              marginLeft: "12vw",
            }}
          >
            SignUp
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
