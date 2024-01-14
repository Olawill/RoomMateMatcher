import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout/PageLayout";
import ListingItem from "./ListingItem";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";

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
  }, [isAuthenticated, user, likedListings]);

  return (
    <PageLayout requireAuthentication={true}>
      {({ theme, getThemeAuto }) => (
        <>
          <Container style={{height: '100vh'}} data-theme={theme === "Auto" ? getThemeAuto() : theme}>
            <h3 style={{textAlign: 'left', marginTop: '1rem'}}>Favourites</h3>
            <hr/>
            <Row>
              {
                favouriteListings.length === 0 && (
                  <Container style={{paddingBlock: '3rem'}}>
                    <Stack
                      style={{ marginLeft: '2rem', width: '100%' }}
                    >

                    </Stack>
                    <div className="fav-listing-house">
                      <MdOutlineMapsHomeWork style={{
                        fontSize: '8rem'}}/>
                      <div className="fav-listing">
                        <MdOutlineFavorite
                          style={{
                            fontSize: '2rem',
                            color: '#c54141',
                          }}
                        />
                    </div>

                    </div>
                    <br/>
                    <h4>Did something grab your interest?</h4>
                    <small>{`View your favourite listings here`}</small>
                    <br/><br/>
                    <Button as={Link} to="/">
                      Browse our Listings
                    </Button>
                  </Container>
                )
              }
              </Row>
              <Row xs={1} md={2} lg={3} xl={4}>
              {
                favouriteListings.length > 0 && (
                  favouriteListings.map((listing) => (
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
                  ))
                )
              }
            </Row>
          </Container>
        </>
      )}
    </PageLayout>
  );
};

export default FavouriteListingsPage;
