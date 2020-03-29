import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';



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