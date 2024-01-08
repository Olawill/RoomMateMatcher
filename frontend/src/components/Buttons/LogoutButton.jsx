import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "react-bootstrap";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const userLogout = () => {
    window.sessionStorage.removeItem("userData");
    logout();
  }
  
  return (
    isAuthenticated && (
      <Button
        onClick={userLogout}
        variant="outline-secondary"
        size="sm"
        style={{
          border: 'none',
          width: '100%',
          textAlign: 'left'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg>
        {" Sign Out"}
      </Button>
    )
  )
}

export default LogoutButton