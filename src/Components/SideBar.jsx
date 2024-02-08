import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   faBell,
  //   faRankingStar,
  faHouse,
  faRightFromBracket,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios";
import { useStateContext } from "../Contexts/ContextProvider";
import { Outlet } from "react-router-dom";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import ParticlesBG from "./Particles/ParticlesBG";

export default function SideBar() {
  //   const navigation = [
  //     { name: "Dashboard", to: "/" },
  //     { name: "Surveys", to: "/surveys" },
  //   ];

  //   function classNames(...classes) {
  //     return classes.filter(Boolean).join(" ");
  //   }

  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      navigate("/");
    });
  };

  if (!userToken) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <Navbar
        className="custom-navbar"
        fixed="left"
        expand="lg"
        style={{ zIndex: 3 }}
      >
        <Container
          className="py-3 d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <div>
            <Navbar.Brand
              href="/"
              className="text-white text-center align-items-center fs-4 fw-normal "
            >
              Ballers.ma
            </Navbar.Brand>

            <Nav className="d-flex flex-column mt-4">
              <Nav.Link
                className="text-white text-center sidebar-item"
                href="/"
              >
                <FontAwesomeIcon icon={faHouse} className="px-2" />
                Home
              </Nav.Link>
              <Nav.Link
                className="text-white text-center sidebar-item"
                href="/games"
              >
                <FontAwesomeIcon icon={faTrophy} className="px-2" />
                Games
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
              <Nav.Link
                className="text-white text-center sidebar-item w-100"
                href="http://localhost:3000/profile"
              >
                <FontAwesomeIcon icon={faUser} className="px-2 " />
                Profile
              </Nav.Link>
              <Nav.Link
                as="button"
                href="#"
                onClick={(ev) => logout(ev)}
                className="text-white text-center sidebar-item"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="px-2" />
                Logout
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}