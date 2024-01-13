import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import ListingItem from "./ListingItem";
import PageLayout from "../PageLayout/PageLayout";

const Listings = ({ likedListings, onFavButtonClick }) => {
  const [listings, setListings] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchListings = () => {
      axios
        .get("/api/listings")
        .then((response) => {
          if (isAuthenticated && user) {
            const userId = JSON.parse(window.sessionStorage.getItem('userData')).userId;
            setListings(response.data.data.filter(listing => listing.user_id !== userId));
          } else {
            setListings(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    };

    fetchListings();
  }, [isAuthenticated, user]);

  return (
    <PageLayout>
      {({ getThemeAuto, theme }) => (
        <Container data-theme={theme === 'Auto' ? getThemeAuto() : theme}>
          <Row xs={1} md={2} lg={3} xl={4}>
            {listings.map((listing) => (
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
      )}

    </PageLayout>
  );
};

export default Listings;