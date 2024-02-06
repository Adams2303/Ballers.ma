import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import ParticlesBG from "../Components/Particles/ParticlesBG.js";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });

  const navigate = useNavigate();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    if (password !== passwordConfirmation) {
      setError({ __html: "Passwords do not match." });
      return;
    }

    axiosClient
      .post("/signup", {
        name: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        // alert(
        //   "Registration successful! Please check your email to verify your account."
        // );
        navigate("/");
      })
      .catch((error) => {
        let finalErrors = [];
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "#00060d",
      }}
    >
      <Form
        className="rounded shadow-lg text-white"
        style={{ width: "600px", backgroundColor: "#343a40" }}
        onSubmit={handleSubmit}
        action="#"
        method="POST"
      >
        <Form.Label
          className="signupTitle"
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
            icon={faUserPlus}
            style={{ color: "#0e9648", paddingRight: "15px" }}
          />
          <h5 style={{ margin: 0 }}>Account Registration</h5>
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
          <h3 className="text-center mb-4">Create an Account</h3>
          {error.__html && (
            <div
              className="bg-danger rounded py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
              dangerouslySetInnerHTML={error}
            ></div>
          )}
          <div style={{ border: "1px solid #e9ecf", padding: "10px" }}>
            <Form.Group>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                autoFocus
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
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
            <Form.Group>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                id="password-confirmation"
                name="password_confirmation"
                placeholder="Confirm your password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn w-100 mt-4 text-light"
              style={{ backgroundColor: "rgb(14, 150, 72)" }}
            >
              Sign up
            </Button>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <p className="text-center mt-2">Already have an account?</p>
            <Link
              to="/login"
              type="button"
              className="btn btn-link mt-0"
              style={{ backgroundColor: "#343a40" }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
