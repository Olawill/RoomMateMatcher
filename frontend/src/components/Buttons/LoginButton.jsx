import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {Button} from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  
  if (isAuthenticated) {
    axios.post('/api/user', { user })
      .then(response => {
        window.sessionStorage.setItem("userData", JSON.stringify({ userId: response.data.id, username: response.data.username }));
      })
      .catch(error => {
        console.error("Error updating user profile:", error);
      });
  }

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()} variant="primary" size="sm">
        Sign In
      </Button>
    )
  )
}

export default LoginButton