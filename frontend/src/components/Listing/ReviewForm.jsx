import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleReviewFormSubmit }) => {
  const [reviewFormData, setReviewFormData] = useState({
    review: '',
    rating: 0,
  });

  const onReviewFormSubmit = (e) => {
    e.preventDefault();
    handleReviewFormSubmit({
      user_id: window.sessionStorage.getItem('userId'),
      review: reviewFormData.review,
      rating: reviewFormData.rating
    });

    // Clear the form data
    setReviewFormData({ review: '', rating: 0 });
  };
  
  return (
    <div>
      <h2>New Listing</h2>
      <Form onSubmit={onReviewFormSubmit}>
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
        <Button type='submit'>Submit New Listing</Button>
      </Form>
    </div>
  );
};

export default ReviewForm;