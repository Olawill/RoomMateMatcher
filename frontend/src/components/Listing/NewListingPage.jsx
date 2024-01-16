import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

import PageLayout from "../PageLayout/PageLayout";

const userData = sessionStorage.getItem("userData");
const userInfo = JSON.parse(userData);

const NewListingPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const initialListingData = {
    user_id: userInfo?.userId,
    title: "",
    postal_code: "",
    city: "",
    country: "",
    price: "",
    description: " ",
    number_of_rooms: "",
    number_of_roommates: "",
    status: "Available",
    image_url: "",
  };

  const [newListingData, setNewListingData] = useState(initialListingData);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListingData({ ...newListingData, [name]: value });
  };

  const handleNewListingSubmit = async () => {
    console.log("newlisting");
    if (!isAuthenticated) {
      alert("Please login first");
      loginWithRedirect();
      return;
    }
    try {
      console.log("data", newListingData);
      const response = await axios.post("/api/listings/new", newListingData);
      console.log("New Listing Response:", response.data);

      setNewListingData(initialListingData);
      setFormDisabled(false);
    } catch (error) {
      console.error("Error creating a new listing:", error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form>
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
            <Form.Group controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postal_code"
              value={newListingData.postal_code}
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
          </Form.Group>
          <Button disabled={formDisabled} onClick={handleNewListingSubmit}>
            Create Listing
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewListingPage;
