import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  ToastContainer,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faDiscord,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import { Link } from "react-router-dom";
import axiosClient, { appServerUrl } from "../axios";
import ToastNotification from "../Components/Toasts/Toast";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Profile() {
  const { showToast, setShowToast, toastMessage } = useStateContext();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    axiosClient
      .get("/profile")
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="biography" className="position-relative">
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
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6} lg={4} className="text-center">
            <div className="info">
              <Image
                src={appServerUrl + profileData.profile_picture}
                alt={profileData.name}
                className="profile-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            {/* <div className="icons">
              <a className="icon" href={profileData.socials.twitter}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a className="icon" href={profileData.socials.youtube}>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a className="icon" href={profileData.socials.discord}>
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a className="icon" href={profileData.socials.instagram}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div> */}
          </Col>
          <Col lg={7}>
            <div className="user-details">
              <div className="d-flex justify-content-between align-items-center">
                <p className="team">{profileData.team}</p>
                <Link className="py-3" to="edit">
                  <button className="edit-btn">
                    <FontAwesomeIcon
                      icon={faUserPen}
                      style={{ paddingRight: "10px" }}
                    />
                    Edit Profile
                  </button>
                </Link>
              </div>
              <h3 className="profile-name">{profileData.name}</h3>
              <div className="bio">
                <p>{profileData.bio}</p>
              </div>
              <div className="row info-list">
                <div className="col-sm-6">
                  <ul>
                    <li>
                      <label>Birthday:</label>{" "}
                      <span>{profileData.birthday}</span>
                    </li>
                    <li>
                      <label>Height:</label> <span>{profileData.height}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul>
                    <li>
                      <label>Preferred Foot:</label>{" "}
                      <span>{profileData.preferred_foot}</span>
                    </li>
                    <li>
                      <label>City:</label> <span>{profileData.city}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div
          className="separated"
          style={{
            backgroundImage:
              "url(https://nairo.ibthemespro.com/img/border-dark.png)",
          }}
        ></div>
        {/* <Row className="align-items-center justify-content-center">
          <div className="title">
            <h3>Main/Secondary Roles</h3>
          </div>
          {profileData.roles.map((role, index) => (
            <Col md={6} lg={6} className="my-3" key={index}>
              <Card bg="dark" text="white" className="my-card">
                <Card.Body className="card-body">
                  <Card.Title className="title">{role}</Card.Title>
                  <Card.Text className="text">
                    As a {role}, I excel in...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> */}
      </Container>
    </section>
  );
}
