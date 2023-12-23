import React, { useState, useEffect } from "react";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import ListingItem from "./ListingItem";

const Listings = () => {
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
    <Container>
      <Row>
        {listings.map((listing) => (
          <Col md key={listing.id}>
            <Link to={`/${listing.id}`}>
              <ListingItem listing={listing} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Listings;