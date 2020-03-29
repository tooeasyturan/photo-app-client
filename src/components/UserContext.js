import React, { useState, useEffect, createContext } from 'react'
import usersService from '../services/users'
import axios from 'axios'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [fetchedUser, setfetchedUser] = useState(null)


  useEffect(() => {
    async function getUser() {
      await getLoggedInUser()
    }
    getUser()

  }, [])



  const getLoggedInUser = async () => {
    try {
      const loggedUserJSON = await window.localStorage.getItem('loggedTFPappUser')
      if (loggedUserJSON) {
        const token = JSON.parse(loggedUserJSON)
        // let result = await axios.get('http://localhost:3004/auth', {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `bearer ${token}`
        //   }
        // })
        setLoggedInUser(token)
        usersService.setToken(token)



        //   console.log('username', username)
        //   setUsername(username)
        //   let user = await axios.get(`http://localhost:3004/users/${username}`)
        //   user = await user.data
        //   setUserLoggedIn(user)
        //   console.log('user data', user)
        //   const status = await user[0].status
        //   setStatus(status)
        //   console.log('user status', status)
        // } else {
        //   setUsername('user')
        // }
      } else {
        setLoggedInUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {props.children}
    </UserContext.Provider>
  )
}