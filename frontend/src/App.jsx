import "../src/App.css";
import "./components/Navigation/NavigationBar.css"
import "./components/Navigation/Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./components/Listing/Listings";
import ListingItemPage from "./components/Listing/ListingItemPage";
import Profile from "./components/Profile/Profile";
import MyMessage from "./components/Chats/myMessages";

import useApplicationData from "./hooks/useApplicationData";

function App() {
  const { state, onFavButtonClick } = useApplicationData();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Listings
              likedListings={state.likedListings}
              onFavButtonClick={onFavButtonClick}
            />
          }
        />
        <Route
          path="/myMessages"
          element={<MyMessage />}
        />
        <Route
          path="/:listing_id"
          element={
            <ListingItemPage
              likedListings={state.likedListings}
              onFavButtonClick={onFavButtonClick}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </Router>
  );
}

export default App;
