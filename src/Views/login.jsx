import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ __html: "" });

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
        remember: rememberMe,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        navigate("/");
      })
      .catch((error) => {
        try {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        } catch (e) {
          if (error.response.status === 422) {
            const errorMessage = "The password you entered is incorrect.";
            console.log(errorMessage);
            setError({ __html: errorMessage });
          } else {
            setError({ __html: "An error occurred. Please try again." });
          }
        }
      });
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
        action="#"
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
            icon={faHouseUser}
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
          <h3 className="text-center mb-4">Log into Account</h3>
          {error.__html && (
            <div
              className="bg-danger rounded py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
              dangerouslySetInnerHTML={error}
            ></div>
          )}
          <div style={{ border: "1px solid #e9ecf", padding: "10px" }}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                autoFocus
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </Form.Group>
            <Form.Group
              as={Row}
              className="mt-3"
              controlId="formHorizontalCheck"
            >
              <Col>
                <Form.Check
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember me"
                />
              </Col>
            </Form.Group>
            <Button
              type="submit"
              className="btn w-100 mt-3 text-light"
              style={{ backgroundColor: "rgb(14, 150, 72)" }}
            >
              Log in
            </Button>
          </div>
          <Link
            to={"/forgot-password"}
            type="button"
            className="btn btn-link w-100"
          >
            Forgot Password?
          </Link>
          <div className="d-flex justify-content-center">
            <p className="text-center mt-2">Don't have an account?</p>
            <Link
              to="/signup"
              type="button"
              className="btn btn-link mt-0"
              style={{ backgroundColor: "#343a40" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
