import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import RatingStars from "react-rating-stars-component";

// const userData = JSON.parse(window.sessionStorage.getItem('userData'));
// const username = userData.username;

const Reviews = ({ reviews }) => {
  const splitReviews = (reviews) => {
    const middleIndex = Math.ceil(reviews.length / 2);
    const leftColumn = reviews.slice(0, middleIndex);
    const rightColumn = reviews.slice(middleIndex);

    return [leftColumn, rightColumn];
  };

  const [leftColumn, rightColumn] = splitReviews(reviews);

  return (
    <Row>
      <Col>
        <h2>Reviews</h2>
        <Row>
          <Col>
            {leftColumn.map((review) => (
              <Card key={review.id}>
                <Card.Body>
                  <RatingStars
                    count={5}
                    value={review.rating}
                    size={24}
                    activeColor="#FFA500"
                    edit={false}
                  />
                  <Card.Text>{review.review}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            {rightColumn.map((review) => (
              <Card key={review.id}>
                <Card.Body>
                  <RatingStars
                    count={5}
                    value={review.rating}
                    size={24}
                    activeColor="#FFA500"
                    edit={false}
                  />
                  <Card.Text>{review.review}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Reviews;
