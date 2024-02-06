import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { faUserShield, faXmark } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setStatus(null);
    try {
      const response = await axiosClient.post("/forgot-password", {
        email,
      });
      setStatus(response.data.message);
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 404) {
        errorMessage = "We can't find a user with that email address.";
      }
      setError({ __html: errorMessage });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#00060d" }}
    >
      <Form
        className="rounded shadow-lg text-white"
        style={{ width: "600px", backgroundColor: "#343a40" }}
        method="POST"
        action=""
        onSubmit={handleSubmit}
      >
        <Form.Label
          className="loginTitle"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgb(34,34,34)",
            fontWeight: "700",
            fontSize: "16px",
            padding: "15px 16px",
          }}
        >
          <FontAwesomeIcon
            icon={faUserShield}
            style={{ color: "#0e9648", paddingRight: "15px" }}
          />
          <h5 style={{ margin: 0 }}>Ballers.gg Account</h5>
          <Link
            to="/"
            type="button"
            style={{
              marginLeft: "auto",
              textAlign: "center",
              alignItems: "center",
              padding: "0",
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                fontSize: "25px",
                color: "#0e9648",
                cursor: "pointer",
                padding: "auto",
              }}
            />
          </Link>
        </Form.Label>

        <div className="px-5 py-5">
          <h3 className="text-center mb-3">Recover your Password</h3>
          <p className="text-center text-white w-90 m-auto">
            <small>
              Please enter your Email and we will send you a recovery Link.
            </small>
          </p>
          {status && (
            <div
              className="bg-success rounded mt-3 py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
            >
              {status}
            </div>
          )}
          {error.__html && (
            <div
              className="bg-danger rounded mt-3 py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
              dangerouslySetInnerHTML={error}
            ></div>
          )}
          <div
            style={{
              border: "1px solid #e9ecf",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter your registered email"
                required
                autoFocus
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn w-100 mt-4 text-light border-0"
              style={{
                backgroundColor: "rgb(14, 150, 72)",
              }}
            >
              Send Reset Link
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
