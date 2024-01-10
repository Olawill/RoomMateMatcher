import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const useApplicationData = () => {
  const [likedListings, setLikedListings] = useState([]);
  const { isAuthenticated,loginWithRedirect, user } = useAuth0();

  const onFavButtonClick = (listingId) => {
    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }
  
    const isFavourite = likedListings.includes(listingId);
    axios.post('/api/user/userId/favourites', {
      userId: user.sub,
      listingId: listingId,
      isFavourite: !isFavourite
    })
    .then(() => {
      if (isFavourite) {
        setLikedListings(prev => prev.filter(id => id !== listingId));
      } else {
        setLikedListings(prev => [...prev, listingId]);
      }
    })
    .catch(error => console.error(error));
  };
  
  return {
    likedListings,
    onFavButtonClick,
  };
};

export default useApplicationData;
