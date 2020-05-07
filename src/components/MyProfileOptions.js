import React, { useContext, useState, useEffect } from 'react'
import CreateModel from './CreateModel'
import CreatePhotog from './CreatePhotog'
import MyProfile from './MyProfile'
import usersServices from '../services/users'
import { UserContext } from './UserContext';


const MyProfileOptions = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext)
  const [user, setUser] = useState({})

  // How to refactor and use async/await instead of .then?
  useEffect(() => {
    usersServices.auth(loggedInUser)
      .then(result => setUser(result))
  }, [])


  const modelProfile = () => {
    return (
      <>
        {!Array.isArray(user.profile) || !user.profile.length ? <CreateModel user={user} /> : <MyProfile user={user} />}
      </>
    )
  }

  const photogProfile = () => {
    return (
      <>
        {!Array.isArray(user.profile) || !user.profile.length ? <CreatePhotog user={user} /> : <MyProfile user={user} />}
      </>
    )
  }

  const profileOptions = () => {
    const { status } = user
    if (status === 'model') {
      return modelProfile()
    }
    return photogProfile()
  }

  return (
    profileOptions()
  )
}

export default MyProfileOptions