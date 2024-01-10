import React, { useState, useEffect } from "react";
import axios from "axios";
import ListingItem from "./ListingItem";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';


const FavListingsPage = ({ userId }) => {
  const [favouriteListings, setFavouriteListings] = useState([]);

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}/favorites`);
        setFavouriteListings(response.data);
      } catch (error) {
        console.error("Error fetching favorite listings:", error);
      }
    };

    fetchFavoriteListings();
  }, [userId]);

  return (
    <Container data-theme={theme === "Auto" ? getThemeAuto() : theme}>
      <Row>
        {favouriteListings.map((listing) => (
          <Col md key={listing.id}>
            <Link to={`/${listing.id}`}>
              <ListingItem
                listing={listing}
                isFavIconActive={likedListings.includes(listing.id)}
                onFavButtonClick={onFavButtonClick}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavListingsPage;
