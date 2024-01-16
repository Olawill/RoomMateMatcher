import React, { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container, Stack } from "react-bootstrap";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoPinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewListingForm from "./NewListingPage";
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
        style={{height: '100vh'}}
      >
        {
          !myListings && (
            <Container style={{paddingBlock: '3rem'}}>
              <Stack
                // gap={3}
                style={{ marginLeft: '2rem', width: '100%' }}
              >
                Cancel
              </Button>
            </Stack>
            {showNewListingForm && (
              <NewListingForm onCancel={() => setShowNewListingForm(false)} />
            )}
            {myListings ? (
              <>
                {myListings.map((listing) => (
                  <div key={listing.id}>
                    <h4>{listing.title}</h4>
                    <p>{listing.description}</p>
                    <p>Price: ${listing.price}</p>
                    <img
                      src={listing.image_url}
                      alt={`Image for ${listing.title}`}
                    />
                    <Button
                      variant="outline-warning"
                      onClick={() => handleEditClick(listing)}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteListing(listing.id)}>
                      Delete
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <MdOutlineMapsHomeWork style={{ fontSize: "6rem" }} />
                <IoPinSharp
                  style={{ fontSize: "1rem", transform: "rotate(75deg)" }}
                />
                <br />
                <small>Your Listings will live here</small>
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
        </>
      )}
    </PageLayout>
  );
};

export default MyListings;
