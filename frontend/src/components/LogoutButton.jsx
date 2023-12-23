import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const userLogout = () => {
    window.sessionStorage.removeItem("userData");
    logout();
  }
  
  return (
    isAuthenticated && (
      <button onClick={userLogout}>
        Sign Out
      </button>
    )
  )
}

export default LogoutButton