import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import FavButton from "../Favourites/FavButton";

const ListingItem = (props) => {
  const { listing, isFavIconActive, onFavButtonClick, theme } = props;
  const cardStyle = theme === "Dark" ? { backgroundColor: "#32599d", color: "#FFF" } : { backgroundColor: "#FFF", color: "#000" };
  
  return (
    <Card className="mb-3" style={cardStyle}>
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