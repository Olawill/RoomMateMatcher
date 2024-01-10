import "./App.css";
import "./NavigationBar.css";
import "./Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./components/Listings";
import ListingItemPage from "./components/ListingItemPage";
import NavigationBar from "./components/NavigationBar"; // Corrected import path
import Profile from "./components/Profile";
import MyMessage from "./components/myMessages";

import useApplicationData from "./hooks/useApplicationData";

function App() {
  const { likedListings, onFavButtonClick } = useApplicationData();

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
        <Route
          path="/myMessages"
          element={<MyMessage />}
        />
        <Route
          path="/:listing_id"
          element={
            <ListingItemPage
              likedListings={likedListings}
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
