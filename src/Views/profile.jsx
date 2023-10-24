import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPersonRunning,
  faShieldAlt,
  faShieldVirus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import TestimonialBox from "./TestimonialBox";
import Slider from "react-slick";
export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "Adam Sadek",
    age: 22,
    location: "Temara, Morocco",
    email: "sadekadam2303@gmail.com",
    phone: "+212610670107",
    // Add other user information here
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    // Handle submitting updated user information (e.g., send to server)
    console.log("Updated User Info:", userInfo);
  };

  return (
    <section
      id="biography"
      style={{
        marginLeft: "200px",
        backgroundColor: "#0e1713",
        padding: "100px 0",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6} lg={4}>
            <div
              className="info"
              style={{
                border: "5px solid rgb(4, 235, 165)",
                borderRadius: "50%",
                margin: "auto",
                maxHeight: "358px",
                maxWidth: "356px",
                overflow: "hidden",
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "scale-down",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  marginBottom: "0",
                  paddingLeft: "0",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://facebook.com"
                  style={{
                    border: "2px solid #fff",
                    borderRadius: "50%",
                    height: "35px",
                    lineHeight: "31px",
                    margin: "0 5px",
                    textAlign: "center",
                    width: "35px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="lg"
                    className="mx-2"
                    color="#fff"
                    backgroundColor="#0b0b13"
                  />
                </a>
                <a href="https://twitter.com">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="lg"
                    className="mx-2"
                    color="#fff"
                    backgroundColor="#0b0b13"
                  />
                </a>
                <a href="https://instagram.com">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="lg"
                    className="mx-2"
                    color="#fff"
                    backgroundColor="#0b0b13"
                  />
                </a>
                <a href="https://linkedin.com">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="lg"
                    className="mx-2"
                    color="#fff"
                    backgroundColor="#0b0b13"
                  />
                </a>
                <a href="https://pinterest.com">
                  <FontAwesomeIcon
                    icon={faPinterest}
                    size="lg"
                    className="mx-2"
                    color="#fff"
                    backgroundColor="#0b0b13"
                  />
                </a>
              </div>
            </div>
            <p className="text-center mt-4"> Ballers.ma Dev Team</p>
            <h3 className="text-center">Adam Sadek</h3>
          </Col>
          <Col lg={7} className="ml-auto">
            <div>
              <h3 className="title">Biography</h3>
              <div className="bio">
                <p>{userInfo.bio}</p>
              </div>
              <div className="row info-list">
                <div className="col-sm-6">
                  <ul>
                    <li>
                      <label>Name:</label>{" "}
                      <input
                        type="text"
                        value={userInfo.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label>Age:</label>{" "}
                      <input
                        type="number"
                        value={userInfo.age}
                        name="age"
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label>Location:</label>{" "}
                      <input
                        type="text"
                        value={userInfo.location}
                        name="location"
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label>Business Email:</label>{" "}
                      <input
                        type="email"
                        value={userInfo.email}
                        name="email"
                        onChange={handleInputChange}
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul>
                    <li>
                      <label>Phone:</label>{" "}
                      <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    </li>
                    Add other editable fields here
                  </ul>
                </div>
              </div>
              <button onClick={handleSubmit}>Save Changes</button>
            </div>
          </Col>
        </Row>
        <div
          className="seperated"
          style={{
            backgroundImage:
              "url( 'https://nairo.ibthemespro.com/img/border-dark.png')",
          }}
        ></div>
        <div className="title">
          <h3>My Roles</h3>
        </div>
        <Row>
          <Col md={6} lg={4} className="my-3">
            <Card bg="black" text="white" className="my-card">
              <CardHeader>
                <FontAwesomeIcon className="icon" icon={faPersonRunning} />
              </CardHeader>
              <Card.Body className="card-body">
                <Card.Title className="title">Attacking Midfielder</Card.Title>
                <Card.Text className="text">
                  As an attacking midfielder, I thrive in the creative and
                  playmaking role, orchestrating the team's attacking plays,
                  providing key passes, and contributing to goal-scoring
                  opportunities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="my-3">
            <Card bg="black" text="white" className="my-card">
              <CardHeader>
                <FontAwesomeIcon className="icon" icon={faShieldAlt} />
              </CardHeader>
              <Card.Body className="card-body">
                <Card.Title className="title">Defensive Midfielder</Card.Title>
                <Card.Text className="text">
                  As a defensive midfielder, I excel in the role of shielding
                  the defense, intercepting opponent's attacks, and distributing
                  the ball strategically to initiate counter-attacks or maintain
                  possession.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="my-3">
            <Card bg="black" text="white" className="my-card">
              <CardHeader>
                <FontAwesomeIcon className="icon" icon={faShieldVirus} />
              </CardHeader>
              <Card.Body className="card-body">
                <Card.Title className="title">Center Back</Card.Title>
                <Card.Text className="text">
                  As a center back, I provide a solid defensive presence,
                  organize the backline, and contribute to the team's stability
                  by anticipating and intercepting opponents' attacks, as well
                  as initiating the team's build-up play.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div
          className="seperated"
          style={{
            backgroundImage:
              "url( 'https://nairo.ibthemespro.com/img/border-dark.png')",
          }}
        ></div>
        <div className="title">
          <h3>Testimonials</h3>
        </div>
        <div className="testimonials-container">
          <div>
            <h2> Single Item</h2>
            <Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
}
