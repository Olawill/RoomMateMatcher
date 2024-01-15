import React, { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container, Stack } from "react-bootstrap";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoPinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewListingForm from "./NewListingPage"; 

const MyListings = () => {
  const [myListings, setMyListings] = useState(null);
  const [showNewListingForm, setShowNewListingForm] = useState(false);

  const userData = sessionStorage.getItem("userData");
  const userInfo = JSON.parse(userData);
  const userId = userInfo.userId;

  const handleAddListingClick = () => {
    setShowNewListingForm(true);
  };

  const handleCancelClick = () => {
    setShowNewListingForm(false);
  };

  useEffect(() => {
    // Fetch user listings when the component mounts
    const fetchUserListings = async () => {
      try {
        const response = await axios.get(`/api/listings/my-listings/${userId}`);
        setMyListings(response.data);
      } catch (error) {
        console.error('Error fetching user listings:', error);
      }
    };

    fetchUserListings();
  }, [userId]);

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <Container
          data-theme={theme === "Auto" ? getThemeAuto() : theme}
          style={{
            paddingBottom: "2rem",
          }}
        >
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
            {showNewListingForm && <NewListingForm onCancel={handleCancelClick} />}
            {myListings ? (
              <>
                {myListings.map((listing) => (
                  <div key={listing.id}>
                    <h4>{listing.title}</h4>
                    <p>{listing.description}</p>
                    <p>Price: ${listing.price}</p>
                    <img src={listing.image_url} alt={`Image for ${listing.title}`} />
                  </div>
                ))}
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
          </Container>
        </Container>
      )}
    </PageLayout>
  );
};

export default MyListings;
