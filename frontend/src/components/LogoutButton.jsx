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
      <Button onClick={userLogout} variant="primary">
        Sign Out
      </Button>
    )
  )
}

export default LogoutButton