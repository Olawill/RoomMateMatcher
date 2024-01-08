import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./NavigationBar";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import FavButton from "./FavButton";

const ListingItemPage = ({ likedListings, onFavButtonClick }) => {
  const { listing_id } = useParams();
  const navigate = useNavigate();
  const [listingDetails, setListingDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewNotification, setReviewNotification] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`/api/listings/${listing_id}`);
        console.log(response);
        setListingDetails(response.data.listing);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching listing details and reviews:", error);
      }
    };

    fetchListingDetails();
  }, [listing_id]);

  const handleReviewFormSubmit = async (reviewData) => {
    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }

    try {
      // Post the review to backend database
      await axios.post(`/api/listings/${listing_id}/reviews`, reviewData);
      // Refetch all reviews after posting a new review
      const response = await axios.get(`/api/listings/${listing_id}`);
      setReviews(response.data.reviews);
      setReviewNotification("Review posted successfully!");

      // Display the notification for 3 seconds and then clear it
      setTimeout(() => {
        setReviewNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container style={{ width: "60%" }}>
        {listingDetails && (
          <Row style={{ margin: "5.65rem auto 0" }}>
            <Col>
              <Card>
                <FavButton
                  isFavIconActive={likedListings.includes(listingDetails.id)}
                  onFavButtonClick={() => onFavButtonClick(listingDetails.id)}
                />
                <Card.Img variant="top" src={listingDetails.image_url} />
                <Card.Body>
                  <Card.Title>{listingDetails.title}</Card.Title>
                  <Card.Text>
                    {listingDetails.city} {listingDetails.country}
                  </Card.Text>
                  <Card.Text>${listingDetails.price} CAD per month</Card.Text>
                  <Card.Text>{listingDetails.description}</Card.Text>
                  <Card.Text>
                    We have {listingDetails.number_of_rooms} bedrooms.
                  </Card.Text>
                  <Card.Text>
                    We are looking for {listingDetails.number_of_roommates}{" "}
                    roommates.
                  </Card.Text>
                  <Card.Text>Status: {listingDetails.status}</Card.Text>
                </Card.Body>
                <Button type="submit">Interested</Button>
              </Card>
            </Col>
          </Row>
        )}

        {reviews.length > 0 && <Reviews reviews={reviews} />}

        {reviewNotification && (
          <Row>
            <Col>
              <Alert variant="success">{reviewNotification}</Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <ReviewForm handleReviewFormSubmit={handleReviewFormSubmit} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListingItemPage;
