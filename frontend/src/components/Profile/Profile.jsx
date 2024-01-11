import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    const updateUserProfile = () => {
      if (isAuthenticated) {
        axios.get('/api/user')
          .then(response => {
            const authUser = response.data.data.find(userObj => userObj.email === user?.email)
            setUpdatedUser(authUser);
          })
          .catch(error => {
            console.error("Error updating user profile:", error);
          });
      }
    };

    updateUserProfile();
  }, [isAuthenticated, user]);

  
  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <Container
          data-theme={theme === "Auto" ? getThemeAuto() : theme}
          style={{
            paddingBottom: '2rem'
          }}
        >
          <h3 style={{textAlign: 'left', paddingBottom: '2rem'}}>Your Profile</h3>
          <Container
            style={{
              border: '1px solid #cdc8c8',
              borderRadius: '8px',
              padding: '1em',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              gap: '2em'
            }}
          >
            <Container style={{
              flex: '1'
            }}>
              <Image src={user?.picture} roundedCircle style={{
                width: '8rem', height: '8rem',
              }}/>

            </Container>
            <Container
              style={{
                display: 'flex',
                flex: '3',
                flexWrap: 'wrap',
                columnGap: '10rem'
              }}
            >
              <div className="user-info">
                <span>Name</span>
                <p>{updatedUser?.first_name ? `${updatedUser?.first_name} ${updatedUser?.last_name}` : "-"}</p>
              </div>
              <div className="user-info">
                <span>Email</span>
                <p>{user?.email}</p>
              </div>
              <div className="user-info">
                <span>Nickname</span>
                <p>{updatedUser?.username}</p>
              </div>
              <div className="user-info">
                <span>Verified Email</span>
                <p>{user?.email_verified ? 'Yes' : 'No'}</p>
              </div>
            </Container>
          </Container>

          <Container
            style={{
              border: '1px solid #cdc8c8',
              borderRadius: '8px',
              padding: '1em',
              marginTop: '2em',
            }}
          >
            <h6 style={{textAlign: 'left', paddingBottom: '2rem'}}>Profile</h6>
            <Container>
              <div className="auth-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pass" viewBox="0 0 16 16">
                  <path d="M5.5 5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                  <path d="M8 2a2 2 0 0 0 2-2h2.5A1.5 1.5 0 0 1 14 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-13A1.5 1.5 0 0 1 3.5 0H6a2 2 0 0 0 2 2m0 1a3 3 0 0 1-2.83-2H3.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-1.67A3 3 0 0 1 8 3"/>
                </svg>
                <div className="auth-prop">
                  <span>Password Change</span>
                  <Button variant="outline-primary" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    {" Change"}
                  </Button>
                </div>
              </div>
              <hr/>
              <div className="auth-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                <div className="auth-prop">
                  <span>Email Change</span>
                  <Button variant="outline-primary" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    {" Change"}
                  </Button>
                </div>
              </div>
              <hr/>
              <div className="auth-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                <div className="auth-prop">
                  <span>Info Change</span>
                  <Button variant="outline-primary" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    {" Edit"}
                  </Button>
                </div>
              </div>

            </Container>
          </Container>

          <Container
            style={{
              border: '1px solid #cdc8c8',
              borderRadius: '8px',
              padding: '1em',
              marginTop: '2em',
            }}
          >
            <div style={{textAlign: 'left'}}>
              <h6>Your Privacy Choices</h6>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <p>
                  If you wish to opt out of sharing of your personal data in connection with cookies, please update your cookie settings.
                </p>
                <Button variant="outline-secondary" size="sm">Update</Button>
              </div>
            </div>
          </Container>
          <Container
            style={{
              border: '1px solid #cdc8c8',
              borderRadius: '8px',
              padding: '1em',
              marginTop: '2em',
            }}
          >
            <div style={{textAlign: 'left'}}>
              <h6>Your Email Preferences</h6>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <p>
                  If you wish to opt out of marketing email communications, please update your email preferences.
                </p>
                <Button variant="outline-secondary" size="sm">Update</Button>
              </div>
            </div>
          </Container>
          <Container
            style={{
              border: '1px solid #cdc8c8',
              borderRadius: '8px',
              padding: '1em',
              marginTop: '2em',
            }}
          >
            <h6 style={{textAlign: 'left'}}>Delete Account</h6>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <p>
                If you wish to delete your account.
              </p>
              <Button variant="outline-danger" size="sm">Delete</Button>
              </div>
          </Container>
        </Container>
      )}
    </PageLayout>
  )
}

export default Profile;