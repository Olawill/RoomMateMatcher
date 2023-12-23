import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import NewChat from "./components/newChat";
import Listings from "./components/Listings";
import ListingItemPage from "./components/ListingItemPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Auth0 Login</h1>
              <LoginButton />
              <LogoutButton />
              <Profile />
              <NewChat />
              <Listings />
            </div>
          }
        />
        <Route path="/:listing_id" element={<ListingItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
