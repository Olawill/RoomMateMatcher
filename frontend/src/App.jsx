import "./App.css";
import "./NavigationBar.css";
import "./Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./components/Listings";
import ListingItemPage from "./components/ListingItemPage";
import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";

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
      </Routes>
    </Router>
  );
}

export default App;
