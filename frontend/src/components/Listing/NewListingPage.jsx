import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

import PageLayout from "../PageLayout/PageLayout";

const NewListingPage = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [newListingData, setNewListingData] = useState({
    id: generateUniqueId(),
    user_id: isAuthenticated ? (user ? user.sub : "") : "",
    title: "",
    city: "",
    country: "",
    price: 0,
    description: "",
    number_of_rooms: 1,
    number_of_roommates: 1,
    status: "Available",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListingData({ ...newListingData, [name]: value });
  };

  const handleNewListingSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }

    try {
      // Post the new listing data to the backend database
      await axios.post("/${listing.id}", newListingData);
      // Redirect or show success message
      alert("New listing created successfully!");
      // Add redirection logic if needed
    } catch (error) {
      console.error("Error creating new listing:", error);
    }
  };

  function generateUniqueId() {
    // A more robust solution for generating a unique ID can be used here
    return Date.now().toString();
  }

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <>
          <Container
            data-theme={theme === "Auto" ? getThemeAuto() : theme}
            style={{ width: "80%" }}
          >
            <Row style={{ margin: "5.65rem auto 0" }}>
              <Col>
                <Card
                  style={
                    theme === "Dark"
                      ? { backgroundColor: "#2b7bad", color: "#FFF" }
                      : { backgroundColor: "#FFF", color: "#000" }
                  }
                >
                  <Card.Body>
                    <Form onSubmit={handleNewListingSubmit}>
                      <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={newListingData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={newListingData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="country"
                          value={newListingData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={newListingData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="description"
                          value={newListingData.description}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="number_of_rooms">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control
                          type="number"
                          name="number_of_rooms"
                          value={newListingData.number_of_rooms}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="number_of_roommates">
                        <Form.Label>Number of Roommates</Form.Label>
                        <Form.Control
                          type="number"
                          name="number_of_roommates"
                          value={newListingData.number_of_roommates}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as="select"
                          name="status"
                          value={newListingData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          {/* Add other status options as needed */}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="image_url">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                          type="text"
                          name="image_url"
                          value={newListingData.image_url}
                          onChange={handleInputChange}
                          required
                        />
                        {/* You may want to add an image upload component here */}
                      </Form.Group>
                      <Button
                        type="submit"
                        variant={
                          theme === "Dark" ? "success" : "primary"
                        }
                      >
                        Create Listing
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </PageLayout>
  );
};

export default NewListingPage;
