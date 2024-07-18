import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import About from './pages/About'
import SignOut from './pages/SignOut'
import Header from './components/Header'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App