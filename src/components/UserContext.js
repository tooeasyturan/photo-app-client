/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react'


export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUser')))

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {props.children}
    </UserContext.Provider>
  )
}