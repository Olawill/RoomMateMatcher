import React, { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container, Stack, Card } from "react-bootstrap";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoPinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewListingForm from "./NewListingForm";
import EditListingModal from "./EditListing";

const MyListings = () => {
  const [myListings, setMyListings] = useState(null);
  const [showNewListingForm, setShowNewListingForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const userData = sessionStorage.getItem("userData");
  const userInfo = JSON.parse(userData);
  const userId = userInfo.userId;

  const handleAddListingClick = () => {
    setShowNewListingForm(true);
  };

  const handleCancelClick = () => {
    setShowNewListingForm(false);
  };

  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setShowEditModal(true);
  };

  const handleEditModalSave = async (editedListing) => {
    try {
      const response = await axios.put(
        `/api/listings/${editedListing.id}`,
        editedListing
      );

      console.log("Save edited listing:", editedListing);
    } catch (error) {
      console.error("Error updating listing:", error);
    }

    // Close the modal
    setShowEditModal(false);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await axios.delete(`/api/listings/${listingId}`);

      setMyListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  useEffect(() => {
    // Fetch user listings when the component mounts
    const fetchUserListings = async () => {
      try {
        const response = await axios.get(`/api/listings/my-listings/${userId}`);
        setMyListings(response.data);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    };

    fetchUserListings();
  }, [userId]);

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <Container
          data-theme={theme === "Auto" ? getThemeAuto() : theme}
          style={{ paddingBottom: "2rem" }}
        >
          {/* //   { */}
          {/* //   !myListings && (
            // <Container style={{paddingBlock: '3rem'}}>
            //   <Stack
            //     // gap={3}
            //     style={{ marginLeft: '2rem', width: '100%' }}
            //   > */}
          <Container style={{ paddingBlock: "3rem" }}>
            <Stack style={{ marginLeft: "2rem", width: "100%" }}>
              <h3 style={{ textAlign: "left" }}>Your Listings</h3>
              <hr />
              <Button
                variant="outline-primary"
                size="sm"
                style={{
                  width: "10rem",
                }}
                onClick={handleAddListingClick}
              >
                <GoPlus />
                Add a New Listing
              </Button>

              <Button
                variant="outline-secondary"
                size="sm"
                style={{
                  width: "10rem",
                }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Stack>
            {/* <MdOutlineMapsHomeWork style={{
                fontSize: '6rem'}}/>
              <IoPinSharp style={{
                fontSize: '1rem', 
                transform: 'rotate(75deg)' */}
            {showNewListingForm && (
              <NewListingForm onCancel={handleCancelClick} />
            )}
            {myListings ? (
              <>
              <Stack direction="horizontal" gap={3}>
                {myListings.map((listing) => (
                  <Card
                    style={
                      theme === "Dark"
                        ? { backgroundColor: "#2167ac", color: "#FFF", width: '25rem'}
                        : { backgroundColor: "#FFF", color: "#000", width: '25rem' }
                        
                        
                    }
                    key={listing.id}
                  >
                    <Card.Img variant="top" src={listing.image_url} />
                    <Card.Body>
                      <Card.Title>{listing.title}</Card.Title>
                      <Card.Text>
                        {listing.postal_code} {listing.city} {listing.country}
                      </Card.Text>
                      <Card.Text>${listing.price} CAD per month</Card.Text>
                      <Card.Text>{listing.description}</Card.Text>
                      <Card.Text>
                        We have {listing.number_of_rooms} bedrooms.
                      </Card.Text>
                      <Card.Text>
                        We are looking for {listing.number_of_roommates}{" "}
                        roommates.
                      </Card.Text>
                      <Card.Text>Status: {listing.status}</Card.Text>
                    </Card.Body>
                      <Button
                        variant="outline-warning"
                        onClick={() => handleEditClick(listing)}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteListing(listing.id)}>
                        Delete
                      </Button>
                  </Card>
                ))}
                </Stack>
              </>
            ) : (
              <>
                <MdOutlineMapsHomeWork
                  style={{
                    fontSize: "6rem",
                  }}
                />
                <IoPinSharp
                  style={{
                    fontSize: "1rem",
                    transform: "rotate(75deg)",
                  }}
                />
                <br />
                <small>{`Your Listings will live here`}</small>
                <br />
                <br />
                <Button as={Link} to="/">
                  Browse our Listings
                </Button>
              </>
            )}
            {/* Render the EditListingModal */}
            {showEditModal && (
              <EditListingModal
                listing={selectedListing}
                onSave={handleEditModalSave}
                onCancel={() => setShowEditModal(false)}
              />
            )}
          </Container>
        </Container>
      )}
    </PageLayout>
  );
};

export default MyListings;
