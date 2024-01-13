import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout/PageLayout";
import FavButton from "../Favourites/FavButton";
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
          <Container data-theme={theme === "Auto" ? getThemeAuto() : theme}>
            <h3 style={{textAlign: 'left'}}>Favourites</h3>
            <hr/>
            <Row>
              {
                favouriteListings.length === 0 && (
                  <Container style={{paddingBlock: '3rem'}}>
                    <Stack
                      style={{ marginLeft: '2rem', width: '100%' }}
                    >

                    </Stack>
                    <MdOutlineMapsHomeWork style={{
                      fontSize: '8rem', position: 'relative'}}/>
                    <MdOutlineFavorite
                      style={{
                        fontSize: '2rem',
                        color: '#c54141',
                        position: 'absolute',
                        left: '53.5%',
                        zIndex: '1',
                        marginTop: '0.5rem'
                      }}
                    />
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
              {
                favouriteListings.length > 0 && (
                  favouriteListings.map((listing) => (
                    <Col md key={listing.id}>
                      <Link to={`/${listing.id}`}>
                        <Card className="mb-3" style={{ color: "#000" }}>
                          <FavButton
                            onFavButtonClick={() => onFavButtonClick(listing.id)}
                            isFavIconActive={likedListings.includes(listing.id)}
                          />
                          <Card.Img variant="top" src={listing.image_url} />
                          <Card.Body>
                            <Card.Title>{listing.title}</Card.Title>
                            <Card.Text>
                              {listing.city} {listing.country}
                            </Card.Text>
                            <Card.Text>${listing.price} CAD per month</Card.Text>
                          </Card.Body>
                        </Card>
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
