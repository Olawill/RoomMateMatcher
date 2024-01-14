import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import ListingItem from "./ListingItem";
import PageLayout from "../PageLayout/PageLayout";

const Listings = ({ likedListings, onFavButtonClick, listings }) => {

  return (
    <PageLayout>
      {({ getThemeAuto, theme }) => (
        <Container style={{height: '100vh'}} data-theme={theme === 'Auto' ? getThemeAuto() : theme}>
          <Row xs={1} md={2} lg={3} xl={3} xxl={3}>
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