import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const useApplicationData = () => {
  const [likedListings, setLikedListings] = useState([]);
  const [listings, setListings] = useState([]);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  // FAVOURITE LISTINGS
  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get(`/api/user/${user.sub}/favourites`)
        .then((response) => {

          const idList = response.data.map(item => item.id);
          setLikedListings(idList);
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user]);

  // ALL LISTINGS
  useEffect(() => {
    const fetchListings = () => {
      axios
        .get("/api/listings")
        .then((response) => {
            setListings(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    };

    fetchListings();
  }, [isAuthenticated, user]);

  // CLICKING FAVOURITE BUTTON
  const onFavButtonClick = (listingId) => {
    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }
  
    const isFavourite = likedListings.includes(listingId);
    axios.post(`/api/user/${user.sub}/favourites`, {
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
    listings,
    onFavButtonClick,
  };
};

export default useApplicationData;
