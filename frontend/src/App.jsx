import { useState } from 'react'
import './App.css'

import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import NewChat from './components/newChat'
import Listings from './components/Listings'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <h1>Auth0 Login</h1>
        <LoginButton />
        <LogoutButton />
        <Profile />
        <NewChat />
        <Listings />
      </main>
      
    </>
  )
}

export default App
