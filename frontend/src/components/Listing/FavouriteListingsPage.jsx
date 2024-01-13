import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout/PageLayout";
import ListingItem from "./ListingItem";
<<<<<<< HEAD
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
=======
>>>>>>> 921c7688478b13a8b287aec3862215c673b89617

const FavouriteListingsPage = ({ likedListings, onFavButtonClick }) => {
  const [favouriteListings, setFavouriteListings] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get(`/api/user/${user.sub}/favourites`)
        .then((response) => {
          setFavouriteListings(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user]);

  return (
    <PageLayout requireAuthentication={true}>
      {({ theme, getThemeAuto }) => (
        <>
          <Container data-theme={theme === "Auto" ? getThemeAuto() : theme}>
            <h3 style={{textAlign: 'left'}}>Favourites</h3>
            <hr/>
            <Row>
              {favouriteListings.map((listing) => (
                <Col md key={listing.id}>
                  <Link to={`/${listing.id}`}>
                    <ListingItem
                      listing={listing}
                      isFavIconActive={likedListings.includes(listing.id)}
                      onFavButtonClick={onFavButtonClick}
                      theme={theme}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </PageLayout>
  );
};

export default FavouriteListingsPage;
