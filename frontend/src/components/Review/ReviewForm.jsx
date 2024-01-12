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
      <h2>Leave a Review</h2>
      <Form onSubmit={onReviewFormSubmit}>
        <Form.Group controlId='review'>
          <Form.Label>Your Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewFormData.review}
            onChange={(e) => setReviewFormData({ ...reviewFormData, review: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={5}
            value={reviewFormData.rating}
            onChange={(e) => setReviewFormData({ ...reviewFormData, rating: e.target.value })}
          />
        </Form.Group>
        <Button type='submit'>Submit Review</Button>
      </Form>
    </div>
  );
};

export default ReviewForm;