import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

function ResetPassword() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState({ new: "" });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    setEmail(emailParam || "");
  }, [searchParams]);

  const handlePasswordChange = async (ev) => {
    ev.preventDefault();
    setError("");
    setStatus(null);

    if (password.new !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (!password.new || !passwordConfirmation) {
      setError("Both password and confirmation are required.");
      return;
    }

    try {
      const response = await axiosClient.post("/reset-password", {
        email,
        token,
        password: password.new,
        password_confirmation: passwordConfirmation,
      });

      console.log("Reset Password Response:", response);

      // Update the status state to display a success message
      setStatus("Password updated successfully!");

      // Optionally, redirect to the login page after a successful password update
      // You can use a library like react-router-dom to handle navigation
      // Example: history.push("/login");
    } catch (error) {
      console.error("Reset Password Error:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.error || "An unexpected error occurred.";
        setError(errorMessage);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
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
        // onSubmit={handlePasswordChange}
        // action="#"
        // method="POST"
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
            icon={faShieldAlt}
            style={{ color: "#0e9648", paddingRight: "15px" }}
          />
          <h5 style={{ margin: 0 }}>Ballers.gg Support</h5>
          <Link
            to="/login"
            type="button"
            style={{
              marginLeft: "auto",
              textAlign: "center",
              alignItems: "center",
              padding: "0",
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
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
          <h3 className="text-center mb-4">Change your Password</h3>
          <p className="text-center text-white w-90 m-auto">
            <small>Your password must be at least 8 characters long.</small>
          </p>
          {status && (
            <div
              className="bg-success rounded mt-3 py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
            >
              {status}{" "}
              <Link to="/login" className="text-dark">
                Log in
              </Link>{" "}
              with your new password.
            </div>
          )}
          {error && (
            <div
              className="bg-danger rounded py-2 px-3 text-white w-75 text-center items-center"
              style={{ margin: "0 auto" }}
            >
              {typeof error === "object" && error.__html ? (
                <div dangerouslySetInnerHTML={error}></div>
              ) : (
                <div>{error}</div>
              )}
            </div>
          )}
          <div style={{ border: "1px solid #e9ecf", padding: "10px" }}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="new-password"
                name="new_password"
                placeholder="Enter your new password"
                autoFocus
                required
                value={password.new}
                onChange={(ev) =>
                  setPassword({ ...password, new: ev.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                id="password-confirmation"
                name="password_confirmation"
                placeholder="Confirm your new password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
              />
            </Form.Group>
            <Button
              onClick={handlePasswordChange}
              className={`btn w-100 mt-4 text-light ${
                loading ? "disabled" : ""
              }`}
              style={{ backgroundColor: "rgb(14, 150, 72)" }}
              disabled={loading}
            >
              {loading ? "Changing password..." : "Change password"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ResetPassword;
