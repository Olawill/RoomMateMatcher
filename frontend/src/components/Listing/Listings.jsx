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
            setListings(response.data.data.reverse());
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    };

    fetchListings();
  }, [isAuthenticated, user]);

  return (
    <PageLayout>
      {({ theme }) => (
        <Container style={{height: '100%'}} data-theme={theme}>
          <Row xs={1} md={2} lg={3} xl={3} xxl={3}>
            {listings.map((listing) => (
              <Col md key={listing.id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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