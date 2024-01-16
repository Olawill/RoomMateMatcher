import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

import ReviewForm from "../Review/ReviewForm";
import Reviews from "../Review/Reviews";
import FavButton from "../Favourites/FavButton";
import PageLayout from "../PageLayout/PageLayout";

const ListingItemPage = ({ likedListings, onFavButtonClick }) => {
  const { listing_id } = useParams();
  const navigate = useNavigate();
  const [listingDetails, setListingDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewNotification, setReviewNotification] = useState(null);
  const [roomExists, setRoomExists] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const userData = sessionStorage.getItem("userData");
  const userInfo = JSON.parse(userData);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`/api/listings/${listing_id}`);
        setListingDetails(response.data.listing);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching listing details and reviews:", error);
      }
    };

    fetchListingDetails();
  }, [listing_id]);

  // CHANGE INTERESTED TO REDIRECT TO MESSAGES IF ALREADY CLICKED
  useEffect(() => {

    const listingClicked = async () => {
      
    const roomInfo = await axios.get(`/api/chatrooms/${userInfo?.userId}`);

    const rooms = roomInfo.data.data;
    const roomExists = rooms.some(room => room.name === listingDetails?.title);

    setRoomExists(roomExists);
    };

    if (isAuthenticated) {
      listingClicked();
    }

  }, [listingDetails, userInfo, isAuthenticated])

  const handleInterestedButtonClick = async () => {
    // Ensure the user is logged in
    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }
    const senderUserId = userInfo.userId;
    const recipientUserId = listingDetails.user_id;

    axios.post('/api/chatrooms/create', { senderId: senderUserId, recipientId: recipientUserId, name :listingDetails.title })
  .then(response => {
    const chatRoomId = response.data.id;
    navigate(`/myMessages`);
  })
  .catch(error => {
    // Handle errors
    console.error('Error creating private chat room:', error);
  });
  }

  // WHEN CHATROOM ALREADY EXIST
  const handleChatButtonClick = () => {
    chatredirect(listingDetails?.title);
  };

  // FUNCTION TO REDIRECT TO CHATS
  const chatredirect = (roomName) => {

    // Navigate to all chats
    // navigate(`/chats/${listing_id}/chatroom-messages`);
    navigate(`/myMessages`);

    // FIND THE ELEMENT WITH THE NEW CHATROOM NAME AND CLICK IT
    // Wait for a short time before attempting to click on the room name
    setTimeout(() => {
      // Trigger click on the room name (assuming you have a specific selector for the room name)
      const roomNameElement = document.querySelector(`[data-chatroomname="${roomName}"]`);

      if (roomNameElement) {
        roomNameElement.click();
      }
    }, 500);
  };



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
    <PageLayout requireAuthentication={true}>
      {({ theme }) => (
        <>
          <Container
            data-theme={theme}
            style={{ width: "80%", paddingBottom: '2rem' }}
          >
            {listingDetails && (
              <Row style={{ margin: "5.65rem auto 0" }}>
                <Col>
                  <Card
                    style={
                      theme === "Dark"
                      ? { backgroundColor: "#2b7bad", color: "#FFF" }
                      : { backgroundColor: "#FFF", color: "#000" }
                    }
                  >
                    <FavButton
                      isFavIconActive={likedListings.includes(
                        listingDetails.id
                      )}
                      onFavButtonClick={() =>
                        onFavButtonClick(listingDetails.id)
                      }
                    />
                    <Card.Img variant="top" src={listingDetails.image_url} />
                    <Card.Body>
                      <Card.Title>{listingDetails.title}</Card.Title>
                      <Card.Text>
                        {listingDetails.city} {listingDetails.country}
                      </Card.Text>
                      <Card.Text>
                        ${listingDetails.price} CAD per month
                      </Card.Text>
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
                    {
                      !roomExists && (
                      <Button
                        type="submit"
                        variant={
                          theme === "Dark"
                          ? 'success'
                          : 'primary'
                        }
                        onClick={handleInterestedButtonClick}>
                        Interested
                      </Button>
                      )
                    }
                    {
                      roomExists && (
                      <Button
                        type="submit"
                        variant={
                          theme === "Dark"
                          ? 'success'
                          : 'primary'
                        }
                        onClick={handleChatButtonClick}>
                        Messages
                      </Button>
                      )
                    }
                  </Card>
                </Col>
              </Row>
            )}

            <Container>
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
          </Container>
        </>
      )}
    </PageLayout>
  );
};

export default ListingItemPage;
