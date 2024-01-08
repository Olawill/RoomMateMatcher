import React, { useState, useEffect } from "react";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import ListingItem from "./ListingItem";
import PageLayout from "./PageLayout/PageLayout";

const Listings = ({ likedListings, onFavButtonClick }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = () => {
      axios
        .get("/api/listings")
        .then((response) => {
          // console.log(response);
          setListings(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    };

    fetchListings();
  }, []);

  return (
    <PageLayout>
      {({ getThemeAuto, theme })=> (
        <Container>
          <Row>
            {listings.map((listing) => (
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
      )}

    </PageLayout>
  );
};

export default Listings;