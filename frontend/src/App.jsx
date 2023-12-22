import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

//import LoginButton from './components/LoginButton'
//import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import Chat from './components/chatroom'
import TopNavigation from './components/TopNavigationBar'
import ListingItem from './components/ListingItem/'
import ListingDetails from './components/ListingDetails/'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <TopNavigation />
        <ListingItem />
        <Profile />
        <Chat/>
      </main>
      
      <div>
        
        
      </div>
      <h1>
        
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          
        </p>
      </div>
      <p className="read-the-docs">
        
      </p>
    </>
  )
}

export default App
