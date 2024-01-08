import React, { useReducer, useEffect } from "react";

const initialState = {
  likedListings: [],
};

export const ACTIONS = {
  LIKED_LISTING_ADDED: 'LIKED_LISTING_ADDED',
  LIKED_LISTING_REMOVED: 'LIKED_LISTING_REMOVED',
};

const reducer = function (state, action) {
  switch (action.type) {
    case ACTIONS.LIKED_LISTING_ADDED:
      return {
        ...state,
        likedListings: [...state.likedListings, action.payload.id],
      };
    case ACTIONS.LIKED_LISTING_REMOVED:
      return {
        ...state,
        likedListings: state.likedListings.filter(id => id !== action.payload.id),
      };
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFavButtonClick = (listingId) => {
    if (state.likedListings.includes(listingId)) {
      dispatch({ type: ACTIONS.LIKED_LISTING_REMOVED, payload: { id: listingId } });
    } else {
      dispatch({ type: ACTIONS.LIKED_LISTING_ADDED, payload: { id: listingId } });
    }
  };

  return {
    state,
    onFavButtonClick,
  };
};

export default useApplicationData;

