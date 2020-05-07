/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from 'react'
import usersService from '../services/users'
import axios from 'axios'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [fetchedUser, setFetchedUser] = useState(null)


  useEffect(() => {
    async function getUser() {
      await getLoggedInUser()
    }
    getUser()

  }, [])



  const getLoggedInUser = async () => {
    try {
      const loggedInUser = await JSON.parse(window.localStorage.getItem('loggedInUser'))
      console.log('LOGGED IN USER TOKEN', loggedInUser)
      if (loggedInUser) {
        let result = await axios.get('http://localhost:3004/auth', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `bearer ${loggedInUser.token}`
          }
        }
        )
        setLoggedInUser(loggedInUser.token)
        setFetchedUser(result.data)
        usersService.setToken(loggedInUser.token)
      } else {
        setLoggedInUser(null)
        setFetchedUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={[fetchedUser, setFetchedUser]}>
      {props.children}
    </UserContext.Provider>
  )
}