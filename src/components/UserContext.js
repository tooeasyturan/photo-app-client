/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect } from 'react'
import usersServices from '../services/users'

export const UserContext = createContext(null)

const DEFAULT_USER = {
  firstName: '',
  lastName: '',
  username: '',
  status: '',
  profile: [],
  upload: [],
  avatar: []
}

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUser')))
  const [user, setUser] = useState(DEFAULT_USER)

  useEffect(() => {
    // const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      usersServices.auth(loggedInUser)
        .then(result => setUser(result))
    }

  }, [])

  console.log('user from context', user)



  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {props.children}
    </UserContext.Provider>
  )
}