import React, { useState, useEffect, useContext } from 'react'
import Logout from './Logout'
import { UserContext } from './UserContext'




const Navigation = () => {
  const [user, setUser] = useContext(UserContext)
  console.log('navigation user', user)


  const LoggedIn = () => {
    return (
      <>

      </>
    )
  }

  const NotLoggedIn = () => {
    return (
      <>

      </>
    )
  }


  return (
    <>
      {user === null ? <NotLoggedIn /> : <LoggedIn />}
    </>
  )
}

export default Navigation