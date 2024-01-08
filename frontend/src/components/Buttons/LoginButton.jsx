import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()} variant="primary" size="sm">
        Sign In
      </Button>
    )
  )
}

export default LoginButton