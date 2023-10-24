import React from "react";
import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "The Pit", href: "#", current: true },
  { name: "The Lockerroom", href: "#", current: true },
  { name: "The Arena", href: "#", current: true },
  { name: "The Knowledge Hub", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Game Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const stackedLayout = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <h1>Dashboard</h1>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {navigation.map((item) => (
            <NavItem key={item.name}>
              <NavLink
                href={item.href}
                active={item.current}
                className={item.current ? "active" : "text-white"}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="#">
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: "#0e9648", paddingRight: "15px" }}
                />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: "#0e9648", paddingRight: "15px" }}
                />
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default stackedLayout;
