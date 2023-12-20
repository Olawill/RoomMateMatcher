import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    const updateUserProfile = () => {
      if (isAuthenticated) {
        axios.post('/api/user', { user })
          .then(response => {
            console.log("User profile updated:", response.data);
            window.sessionStorage.setItem("userId", response.data.id);
            setUpdatedUser(response.data);
          })
          .catch(error => {
            console.error("Error updating user profile:", error);
          });
      }
    };

    updateUserProfile();
  }, [isAuthenticated, user]);
  console.log(window.sessionStorage.getItem("userId"));
  
  return (
    updatedUser && (
      <article>
        {updatedUser?.picture && <img src={updatedUser.picture} alt={updatedUser?.name} />}
        <h2>{updatedUser?.name}</h2>
        <ul>
          {Object.keys(updatedUser).map((objKey, i) => <li key={i}>{objKey}: {updatedUser[objKey]}</li>)}
        </ul>
      </article>
    )
  )
}

export default Profile