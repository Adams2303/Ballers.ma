import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ToastContainer,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditProfile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient, { appServerUrl } from "../axios";
import {
  faCamera,
  faChevronRight,
  faUserShield,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ToastNotification from "../Components/Toasts/Toast";
import { useStateContext } from "../Contexts/ContextProvider";

export default function EditProfile() {
  const { setShowToast, toastMessage, showToast, setToastMessage } =
    useStateContext();
  const [error, setError] = useState({ __html: "" });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPswdForm, setShowPasswordForm] = useState(false);
  const closePasswordForm = () => setShowPasswordForm(false);
  const showPasswordForm = () => setShowPasswordForm(true);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    id: null,
    team: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    birthday: new Date(),
    city: "",
    main_role: "",
    secondary_role: "",
    preferred_foot: "",
    height: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const handleMainRoleChange = (e) => {
    const selectedRoles = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedRoles.includes(profileData.secondary_role)) {
      window.alert("Main role cannot be the same as secondary role");
      return;
    }
    setProfileData({
      ...profileData,
      main_role: selectedRoles,
    });
  };

  const handleSecondaryRoleChange = (e) => {
    const selectedRoles = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedRoles.includes(profileData.main_role)) {
      window.alert("Secondary role cannot be the same as main role");
      return;
    }
    setProfileData({
      ...profileData,
      secondary_role: selectedRoles,
    });
  };

  const handleFileChange = (e) => {
    // console.log("File selected:", e.target.files[0]);
    setProfilePicture(e.target.files[0]);
  };

  useEffect(() => {
    axiosClient
      .get("/profile")
      .then((response) => {
        // console.log("Profile data fetched:", response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(profileData);
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    if (profileData.birthday)
      profileData.birthday = moment(profileData.birthday).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
    Object.keys(profileData).forEach((key) =>
      formData.append(key, profileData[key])
    );
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }
    // console.log("birthday", profileData.birthday);
    axiosClient
      .post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Profile data updated:", response.data);
        setProfileData(response.data);
        setToastMessage("Profile updated successfully");
        setShowToast(true);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
      });
  };

  const triggerFileInput = () => {
    document.getElementById("profile-picture-input").click();
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.name) {
      newErrors.name = "Name is required";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    }

    return newErrors;
  };
  const handlePasswordChange = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    if (!password.new || !passwordConfirmation) {
      setError({ __html: "Both password and confirmation are required." });
      return;
    }

    axiosClient
      .post("/profile/check-password", { password: password.current })
      .then((response) => {
        axiosClient
          .post("/profile/update-password", {
            password: password.new,
            password_confirmation: passwordConfirmation,
          })
          .then((response) => {
            setPassword("");
            setPasswordConfirmation("");
            navigate("/profile/edit");
            closePasswordForm();
            //window.location.reload();
            setToastMessage("Your Password was updated successfully!");
            setShowToast(true);
          })
          .catch((error) => {
            if (error.response) {
              const finalErrors = Object.values(
                error.response.data.errors
              ).reduce((accum, next) => [...accum, ...next], []);
              console.log(finalErrors);
              setError({ __html: finalErrors.join("<br>") });
            }
            console.error(error);
          });
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
  const handleDeleteAccount = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/profile/check-password", { password: password.current })
      .then((response) => {
        axiosClient
          .delete("/profile", {
            data: {
              password: password.current,
              password_confirmation: passwordConfirmation.current,
            },
          })
          .then((response) => {
            console.log("Profile data deleted:", response.data);
            setProfileData(response.data);
            setShow(false);
            setToastMessage("Your Profile was deleted successfully");
            setShowToast(true);
            localStorage.removeItem("TOKEN");
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) {
              const finalErrors = Object.values(
                error.response.data.errors
              ).reduce((accum, next) => [...accum, ...next], []);
              console.log(finalErrors);
              setError({ __html: finalErrors.join("<br>") });
            }
            console.error(error);
          });
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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="biography-edit" className="position-relative">
      <Container>
        <Form>
          <Row className="align-items-center justify-content-center">
            <Col md={6} lg={4} className="text-center">
              <div>
                {errors.profile_picture && <div>{errors.profile_picture}</div>}
                <FontAwesomeIcon
                  icon={faCamera}
                  className="mr-2 profile-image"
                  alt={profileData.name}
                  style={{
                    height: "200px",
                  }}
                  onClick={triggerFileInput}
                />
                {profilePicture && <div>{profilePicture.name}</div>}
                <Form.Control
                  type="file"
                  id="profile-picture-input"
                  onChange={(e) => handleFileChange(e)}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
            </Col>
            <Col lg={7}>
              <div className="user-details">
                <Form.Group className="mb-1" controlId="formTeam">
                  <Form.Label>Team</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.team}
                    placeholder="Enter your team name"
                    onChange={(e) =>
                      setProfileData({ ...profileData, team: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formName">
                  {errors.name && <div>{errors.name}</div>}
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.name}
                    placeholder="Enter your name"
                    required
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formUsername">
                  {errors.username && <div>{errors.username}</div>}
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.username}
                    placeholder="Enter your username"
                    autoComplete="username"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formEmail">
                  {errors.email && <div>{errors.email}</div>}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profileData.email}
                    placeholder="Enter your email"
                    autoComplete="email"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBio">
                  {errors.bio && <div>{errors.bio}</div>}
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    as={"textarea"}
                    maxLength={500}
                    rows={5}
                    value={profileData.bio}
                    placeholder="Enter your bio"
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBirthday">
                  <Form.Label style={{ display: "block" }}>Birthday</Form.Label>
                  <DatePicker
                    className="form-control"
                    selected={new Date(profileData.birthday)}
                    placeholder="Select your birthday"
                    onChange={(e) =>
                      setProfileData({ ...profileData, birthday: e })
                    }
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    scrollableYearDropdown
                    minDate={new Date(new Date().getFullYear() - 45, 0, 1)}
                    maxDate={new Date(new Date().getFullYear() - 15, 11, 31)}
                    yearDropdownItemNumber={60}
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.city}
                    placeholder="Enter your city"
                    onChange={(e) =>
                      setProfileData({ ...profileData, city: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formPrimaryRole">
                  <Form.Label>Main Role</Form.Label>
                  <Form.Select
                    value={profileData.main_role}
                    onChange={handleMainRoleChange}
                  >
                    <option>Select you main role</option>
                    <option value="striker">Striker</option>
                    <option value="defender">Defender</option>
                    <option value="midfielder">Midfielder</option>
                    <option value="goalkeeper">Goalkeeper</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formSecondaryRole">
                  <Form.Label>Secondary Role</Form.Label>
                  <Form.Select
                    value={profileData.secondary_role}
                    onChange={handleSecondaryRoleChange}
                  >
                    <option>Select your secondary role</option>
                    <option value="striker">Striker</option>
                    <option value="defender">Defender</option>
                    <option value="midfielder">Midfielder</option>
                    <option value="goalkeeper">Goalkeeper</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="preferredFoot">
                  <Form.Label>Preferred Foot</Form.Label>
                  <Form.Select
                    value={profileData.preferred_foot}
                    placeholder="Select your preferred foot"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        preferred_foot: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                  >
                    <option>Select your preferred foot</option>
                    <option value={"right"}>Right</option>
                    <option value={"left"}>Left</option>
                    <option value={"both"}>Both</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formHeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your height in cm"
                    value={profileData.height}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        height: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-4" controlId="formPasswordChange">
                  <Button
                    style={{
                      width: "100%",
                      height: "50px",
                      textAlign: "left",
                      backgroundColor: "#00060d",
                      borderColor: "cyan",
                    }}
                    onClick={showPasswordForm}
                  >
                    <FontAwesomeIcon icon={faUserShield} className="me-2" />
                    Change your password
                    <FontAwesomeIcon
                      style={{
                        float: "right",
                        paddingRight: "10px",
                        color: "grey",
                        marginTop: "4px",
                      }}
                      icon={faChevronRight}
                    />
                  </Button>

                  <Modal
                    centered
                    size="lg"
                    show={showPswdForm}
                    onHide={closePasswordForm}
                    className="customModal"
                  >
                    <Modal.Header closeButton closeVariant="white">
                      <Modal.Title className="fw-normal d-inline">
                        This action changes your password permanently
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {error.__html && (
                        <div
                          className="bg-danger rounded py-2 px-3 mb-3 text-white w-75 text-center items-center"
                          style={{ margin: "0 auto" }}
                          dangerouslySetInnerHTML={error}
                        ></div>
                      )}
                      <Form>
                        <Form.Control
                          required
                          className="mb-3"
                          name="current_password"
                          id="current-password"
                          type="password"
                          placeholder="Enter your current password"
                          value={password.current}
                          onChange={(ev) =>
                            setPassword({
                              ...password,
                              current: ev.target.value,
                            })
                          }
                        />
                        <Form.Control
                          required
                          className="mb-3"
                          id="new-password"
                          name="new_password"
                          type="password"
                          placeholder="Enter your new password"
                          value={password.new}
                          onChange={(ev) =>
                            setPassword({ ...password, new: ev.target.value })
                          }
                        />
                        <Form.Control
                          required
                          id="new-password-confirmation"
                          name="new_password_confirmation"
                          type="password"
                          placeholder="Confirm your new password"
                          value={passwordConfirmation}
                          onChange={(ev) =>
                            setPasswordConfirmation(ev.target.value)
                          }
                        />
                      </Form>
                    </Modal.Body>
                    <div className="d-flex justify-content-between mb-3 mx-3">
                      <Button variant="secondary" onClick={closePasswordForm}>
                        Cancel
                      </Button>
                      <Button variant="success" onClick={handlePasswordChange}>
                        Change password
                      </Button>
                    </div>
                  </Modal>
                </Form.Group>
                <Form.Group className="mt-4" controlId="formDelete">
                  <Button
                    style={{
                      width: "100%",
                      height: "50px",
                      textAlign: "left",
                      backgroundColor: "#00060d",
                      borderColor: "red",
                    }}
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon icon={faUserSlash} className="me-2" />
                    Delete your account
                    <FontAwesomeIcon
                      style={{
                        float: "right",
                        paddingRight: "10px",
                        color: "grey",
                        marginTop: "4px",
                      }}
                      icon={faChevronRight}
                    />
                  </Button>

                  <Modal
                    centered
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    className="customModal"
                  >
                    <Modal.Header closeButton closeVariant="white">
                      <Modal.Title className="fw-normal d-inline">
                        This action deletes your account permanently
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {error.__html && (
                        <div
                          className="bg-danger rounded py-2 px-3 mb-3 text-white w-75 text-center items-center"
                          style={{ margin: "0 auto" }}
                          dangerouslySetInnerHTML={error}
                        ></div>
                      )}
                      <Form>
                        <Form.Control
                          required
                          className="mb-3"
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Enter your current password"
                          value={password.current}
                          onChange={(ev) =>
                            setPassword({
                              ...password,
                              current: ev.target.value,
                            })
                          }
                        />
                        <Form.Control
                          required
                          id="password-confirmation"
                          name="password_confirmation"
                          type="password"
                          placeholder="Confirm your current password"
                          value={passwordConfirmation.current}
                          onChange={(ev) =>
                            setPasswordConfirmation({
                              ...passwordConfirmation,
                              current: ev.target.value,
                            })
                          }
                        />
                      </Form>
                    </Modal.Body>
                    <div className="d-flex justify-content-between mb-3 mx-3">
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    </div>
                  </Modal>
                </Form.Group>
                <ToastContainer
                  position="top-end"
                  className="p-3 position-fixed"
                  style={{ zIndex: 1 }}
                >
                  <ToastNotification
                    show={showToast}
                    onHide={() => setShowToast(false)}
                    message={toastMessage}
                  />
                </ToastContainer>
                <div className="d-flex justify-content-between">
                  <Button className="update-btn mt-5" onClick={handleSubmit}>
                    Update Profile
                  </Button>
                  <Link to="/profile">
                    <Button className="mt-5 cancel-btn">Cancel</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}
