
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import MyMessage from './components/myMessages'
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
               <MyMessage />
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
