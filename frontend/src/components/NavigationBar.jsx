import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavigationBar = () => {
  return (
    <Navbar className="custom-navbar">
      <div className="custom-nav">
        <Nav className="custom-nav-link">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">About</Nav.Link>
        </Nav>
        <Nav className="auth-buttons">
          <LoginButton />
          <LogoutButton />
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavigationBar;