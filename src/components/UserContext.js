/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect } from 'react'
import usersServices from '../services/users'

export const UserContext = createContext(null)

const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))

const DEFAULT_USER = {
  firstName: '',
  lastName: '',
  username: loggedInUser ? loggedInUser.username : '',
  status: '',
  token: loggedInUser ? loggedInUser.token : '',
  profile: [],
  upload: [],
  avatar: []
}

export const UserProvider = (props) => {
  const [user, setUser] = useState(DEFAULT_USER)

  useEffect(() => {
    if (loggedInUser) {
      usersServices.auth(loggedInUser)
        .then(result => setUser({ ...result, token: loggedInUser.token }))
    }
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}