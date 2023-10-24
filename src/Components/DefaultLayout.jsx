import "./DefaultLayout.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faRankingStar,
  faRightFromBracket,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Surveys", to: "/surveys" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const [titles, setTitles] = useState([
    "Organized Competition",
    "Community Environment",
    "Learning Platform",
  ]);
  const [descriptions, setDescriptions] = useState([
    "Experience a Well-Structured League for Optimal Competition.",
    "Connect with Like-Minded Enthusiasts in our Tight-Knit Family.",
    "Unlock your Potential with Ballers.ma's Education and Experience Tools.",
  ]);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((currentTitle + 1) % titles.length);
      setCurrentDescription((currentDescription + 1) % descriptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentTitle, titles.length, currentDescription, descriptions.length]);

  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="/" />;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar
        className="custom-navbar"
        fixed="left"
        expand="lg"
        style={{ backgroundColor: "rgb(17, 18,17)" }}
      >
        <Container
          className="p-3 d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <div>
            <Navbar.Brand href="/" className="text-white">
              Ballers.ma
            </Navbar.Brand>

            <Nav className="d-flex flex-column mt-4">
              <Nav.Link className="text-white" href="/">
                <FontAwesomeIcon icon={faHouse} className="px-2" />
                Home
              </Nav.Link>
              <Nav.Link className="text-white" href="/leagues">
                <FontAwesomeIcon icon={faTrophy} className="px-2" />
                Leagues
              </Nav.Link>

              {/* <Nav.Link className="text-white" href="/notifications">
                <FontAwesomeIcon icon={faBell} className="px-2" />
                Notifications
              </Nav.Link> */}
              {/* <Nav.Link className="text-white" href="/leaderboard">
                <FontAwesomeIcon icon={faRankingStar} className="px-2" />
                Leaderboard
              </Nav.Link> */}
            </Nav>
          </div>
          <div>
            <div className="flex-grow-1"></div>
            <Nav className="d-flex flex-column">
              <Nav.Link className="text-white" href="profile">
                <FontAwesomeIcon icon={faUser} className="px-2" />
                Profile
              </Nav.Link>
              <Nav.Link
                as="a"
                href="#"
                onClick={(ev) => logout(ev)}
                className="text-white"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="px-2" />
                Logout
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div className="header" id="header">
        <div className="header-top">
          <div className="header-contact">
            <span>+212682330508</span>
            <span>support@ballers.ma</span>
          </div>
        </div>
        <div className="header-main">
          <div className="header-introduction">
            <h4 className="py-1">The Ultimate Football Experience.</h4>
            <h1 className="py-1">Ballers.ma</h1>
            <h2 className="animated-title ">{titles[currentTitle]}</h2>
            <p className="animated-description ">
              {descriptions[currentDescription]}
            </p>
          </div>
          <Link className="py-3" to="#">
            <button className="">Hit the Pitch</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
