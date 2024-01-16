// EditListingModal.js
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
          {/* Add other form fields as needed */}
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
