import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import axiosClient from "../axios";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "rgb(17, 18, 17)" }}
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
          <h5 style={{ margin: 0 }}>Ballers.ma Account</h5>
        </Form.Label>

        <div className="px-5 py-5">
          <h3 className="text-center mb-4">Log into Account</h3>
          {error.__html && (
            <div
              className="bg-red rounded py-2 px-3 text-white"
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
            <Button
              type="submit"
              className="btn w-100 mt-4 text-light"
              style={{ backgroundColor: "rgb(14, 150, 72)" }}
            >
              Log in
            </Button>
          </div>
          <p className="text-center mt-3 mb-0">Don't have an account?</p>
          <Link
            to="/signup"
            type="button"
            className="btn btn-link w-100"
            style={{ backgroundColor: "#343a40" }}
          >
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}
