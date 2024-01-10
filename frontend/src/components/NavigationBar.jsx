import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { Link } from 'react-router-dom';

const NavigationBar = ({ handleTheme, theme }) => {
  const logoImgPath = import.meta.env.BASE_URL + 'logo.png';
  const { user, isAuthenticated } = useAuth0();

  // console.log(user);
  const navbarClassName = theme === 'Dark' ? 'custom-navbar dark-theme' : 'custom-navbar';
  return (
    <Navbar className={navbarClassName}>
      <div className="logo-container">
        <img src={logoImgPath} alt="logo-image" className="logo" />
      </div>
      <div className="custom-nav">
        <Nav className="custom-nav-link">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="#link">About</Nav.Link>
        </Nav>
        <Nav className="auth-buttons">
          <LoginButton />
          {/* <LogoutButton /> */}
          {
            isAuthenticated && (
              <>
                <NavDropdown
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                  drop="right"
                  title={
                    <div className="d-flex">
                      {`${user?.nickname[0].toUpperCase()}${user?.nickname.slice(1)}`}
                      <img
                        src={user?.picture} // replace with your image URL
                        alt="User Avatar"
                        style={{ marginLeft: '8px', borderRadius: '50%', width: '20px', height: '20px' }}
                      />
                    </div>
                  }
                >
                  <NavDropdown.Item as={Link} to="/myMessages">Chats</NavDropdown.Item>
                  <NavDropdown.Item>
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item>My Listings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="d-flex"
                    style={{

                    }}
                  >
                    <img src={user?.picture}
                      alt="profile picture"
                      style={{
                        width: "40px", height: '40px',
                        borderRadius: '50%',
                      }}/>
                  <div className="d-flex flex-column" style={{paddingLeft: '0.5rem'}}>
                      <div>{user?.name}</div>
                      <div>
                        <Nav.Link href="#profile" style={{color: '#0dcaf0'}}>View Profile</Nav.Link>
                      </div>
                    </div>
                                </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.5">
                    <LogoutButton />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )
          }
            <div className="divider"></div>
            <NavDropdown
              drop="start"
              menuVariant="dark"
              title={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
                }
            >
              <NavDropdown.Item data-theme="Light" onClick={handleTheme}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
              </svg>
                {" Light"}
              </NavDropdown.Item>
              <NavDropdown.Item data-theme="Dark" onClick={handleTheme}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
              </svg>
                {" Dark"}
              </NavDropdown.Item>
              <NavDropdown.Item data-theme="Auto" onClick={handleTheme}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-half" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
              </svg>
              {" Auto"}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
