import React, { useCallback } from "react";
import FavIcon from "./FavIcon";
import "../FavButton.scss"

const FavButton = ({ onFavButtonClick, listingId, isFavIconActive }) => {
  const handleonFavButtonClick = useCallback((e) => {
    e.preventDefault();
    onFavButtonClick(listingId);
  });

  return (
    <div className="listing__fav-icon" onClick={handleonFavButtonClick}>
      <div className="listing__fav-icon-svg">
        <FavIcon selected={isFavIconActive} />
      </div>
    </div>
  );
};

export default FavButton;
