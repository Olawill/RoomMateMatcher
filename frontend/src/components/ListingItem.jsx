import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import FavButton from "./FavButton";

const ListingItem = (props) => {
  const { listing, isFavIconActive, onFavButtonClick } = props;

  return (
    <Card className="mb-3" style={{ color: "#000" }}>
      <FavButton onFavButtonClick={() => onFavButtonClick(listing.id)} isFavIconActive={isFavIconActive} />
      <Card.Img variant="top" src={listing.image_url} />
      <Card.Body>
        <Card.Title>{listing.title}</Card.Title>
        <Card.Text>{listing.city} {listing.country}</Card.Text>
        <Card.Text>${listing.price} CAD per month</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListingItem;