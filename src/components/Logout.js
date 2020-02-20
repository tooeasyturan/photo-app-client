import React, { useState, useEffect } from 'react'
import MyProfile from './MyProfile'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react'



const Logout = (props) => {
  const [toHome, setToHome] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('loggedTFPappUser')
    setToHome(true)
    console.log('user logged out')
  }

  return (
    <>
      {toHome ? <Redirect to="/login" /> : null}
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout