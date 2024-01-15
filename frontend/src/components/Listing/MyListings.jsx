// MyListings.js
import React, { useState } from "react";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container, Stack } from "react-bootstrap";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { IoPinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import NewListingForm from "./NewListingForm";

const MyListings = () => {
  const [myListings, setMyListings] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddListingClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <Container
          data-theme={theme === "Auto" ? getThemeAuto() : theme}
          style={{
            paddingBottom: "2rem",
          }}
        >
          {!myListings && (
            <Container style={{ paddingBlock: "3rem" }}>
              <Stack style={{ marginLeft: "2rem", width: "100%" }}>
                <h3 style={{ textAlign: "left" }}>Your Listings</h3>
                <hr />
                {!showForm ? (
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
                ) : (
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
                )}
              </Stack>
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
                Browsing our Listings
              </Button>
            </Container>
          )}

          {showForm && <NewListingForm onCancel={handleCancelClick} />}
        </Container>
      )}
    </PageLayout>
  );
};


export default MyListings;
