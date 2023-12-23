import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


const Reviews = ({ reviews }) => (
  <Row>
    <Col>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>Rating: {review.rating}</p>
          <p>{review.review}</p>
        </div>
      ))}
    </Col>
  </Row>
);

export default Reviews;