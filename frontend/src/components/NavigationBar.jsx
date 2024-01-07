import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavigationBar = () => {
  const logoImgPath = import.meta.env.BASE_URL + 'logo.png';

  return (
    <Navbar className="custom-navbar">
      <div className="logo-container">
        <img src={logoImgPath} alt="logo-image" className="logo" />
      </div>
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