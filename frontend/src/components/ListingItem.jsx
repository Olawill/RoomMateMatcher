import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ListingItem() {
  return (
    <Card style={{ width: '18rem' }}>
      {/* Use Link to navigate to the details page */}
      {/*<Link to="/listing-details">*/}
        <Card.Img variant="top" src="../../public/1-1.PNG" alt="Listing 1" />
      {/*</Link>*/}
      <Card.Body>
        <Card.Title>Heartful Retreats - Reverie Queen Room</Card.Title>
        <Card.Text>
        <p>Room in Anacortes, Washington, United States</p>
        <p>2 beds, Shared bathroom</p>
        </Card.Text>
        <Button variant="primary" className="m-2">Details</Button>
        <Button variant="primary" className="m-2">Interesting!</Button>
      </Card.Body>
    </Card>
  );
}

export default ListingItem;