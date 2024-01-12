import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout/PageLayout";
import FavButton from "../Favourites/FavButton";

const FavouriteListingsPage = ({ likedListings, onFavButtonClick }) => {
  const [favouriteListings, setFavouriteListings] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get(`/api/user/${user.sub}/favourites`)
        .then((response) => {
          console.log("Favourite listings:", response.data);
          setFavouriteListings(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div>Please log in to view your favourite listings.</div>;
  }

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <>
          <Container data-theme={theme === "Auto" ? getThemeAuto() : theme}>
            <Row>
              {favouriteListings.map((listing) => (
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
              ))}
            </Row>
          </Container>
        </>
      )}
    </PageLayout>
  );
};

export default FavouriteListingsPage;
