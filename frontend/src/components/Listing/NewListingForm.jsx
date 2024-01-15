import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userData = sessionStorage.getItem("userData");
  const userInfo = JSON.parse(userData);

const NewListingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState({
    user_id: userInfo.userId,
    title: "",
    description: "",
    number_of_rooms: "",
    number_of_roommates: "",
    preference: "",
    price: "",
    postal_code: "",
    city: "",
    country: "",
    image_url: "",
    created_at: `${new Date().getHours()}:${new Date().getMinutes()}`,
    updated_at: `${new Date().getHours()}:${new Date().getMinutes()}`
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddListing = async (listingData) => {
    try {
      console.log('data', listingData)
      const response = await axios.post("/api/listings/new", listingData);
      console.log("New Listing Response:", response.data);
      // navigate(`/MyListings`);
      // onCancel();
    } catch (error) {
      console.error("Error creating a new listing:", error);
    }
  };

  return (
    <Form onSubmit={handleAddListing}>
      <Form.Group controlId="number_of_roommates">
        <Form.Label>Number of Roommates</Form.Label>
        <Form.Control
          type="text"
          name="number_of_roommates"
          value={listingData.number_of_roommates}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="preference">
        <Form.Label>Preference</Form.Label>
        <Form.Control
          type="text"
          name="preference"
          value={listingData.preference}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={listingData.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="postal_code">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="postal_code"
          value={listingData.postal_code}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={listingData.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={listingData.country}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="image_url">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image_url"
          value={listingData.image_url}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Listing
      </Button>
      {/* <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button> */}
    </Form>
  );
};

export default NewListingForm;
