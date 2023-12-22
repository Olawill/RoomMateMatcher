import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const userLogout = () => {
    window.sessionStorage.removeItem("userId");
    logout();
  }
  
  return (
    isAuthenticated && (
      <Button variant="primary" onClick={userLogout}>
      Sign Out
      </Button>
    )
  )
}

export default LogoutButton