import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const SignupButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    !isAuthenticated && (
      <Button onClick={handleSignUp} variant="secondary" size="sm">
        Sign Up
      </Button>  )
    )
};

export default SignupButton;