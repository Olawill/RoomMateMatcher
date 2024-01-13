import "../src/App.css";
import "./components/Navigation/NavigationBar.css";
import "./components/Navigation/Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./components/Listing/Listings";
import ListingItemPage from "./components/Listing/ListingItemPage";
import MyListings from "./components/Listing/MyListings.jsx";
import NewListingPage from "./components/Listing/NewListingPage.jsx";
import Profile from "./components/Profile/Profile";
import MyMessage from "./components/Chats/myMessages";
import FavouriteListingsPage from "./components/Listing/FavouriteListingsPage.jsx";

import useApplicationData from "./hooks/useApplicationData";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { likedListings, onFavButtonClick } = useApplicationData();
  const { user } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Listings
              likedListings={likedListings}
              onFavButtonClick={onFavButtonClick}
            />
          }
        />
        <Route path="/myMessages" element={<MyMessage />} />
        <Route path={`/newListing`} element={<NewListingPage />} />
        <Route path={`/${user?.nickname}-listings`} element={<MyListings />} />
        <Route
          path="/:listing_id"
          element={
            <ListingItemPage
              likedListings={likedListings}
              onFavButtonClick={onFavButtonClick}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/favourites"
          element={
            <FavouriteListingsPage
              likedListings={likedListings}
              onFavButtonClick={onFavButtonClick}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
