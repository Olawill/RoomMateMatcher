import './App.css';
import './NavigationBar.css';
import './Header.css';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import MyMessage from './components/myMessages'
import Listings from "./components/Listings";
import ListingItemPage from "./components/ListingItemPage";
import NavigationBar from "./components/NavigationBar";
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavigationBar />
              <Header />
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
