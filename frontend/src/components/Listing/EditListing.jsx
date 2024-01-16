import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditListingModal = ({ listing, onSave, onCancel }) => {
  const [editedListing, setEditedListing] = useState(listing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedListing({ ...editedListing, [name]: value });
  };

  const handleSave = () => {
    onSave(editedListing);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedListing.title}
              onChange={handleInputChange}
            />
              </Form.Group>
            <Form.Group controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postal_code"
              value={editedListing.postal_code}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={editedListing.city}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={editedListing.country}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={editedListing.price}
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
              value={editedListing.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="number_of_rooms">
            <Form.Label>Number of Rooms</Form.Label>
            <Form.Control
              type="number"
              name="number_of_rooms"
              value={editedListing.number_of_rooms}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="number_of_roommates">
            <Form.Label>Number of Roommates</Form.Label>
            <Form.Control
              type="number"
              name="number_of_roommates"
              value={editedListing.number_of_roommates}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={editedListing.status}
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
              value={editedListing.image_url}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditListingModal;
