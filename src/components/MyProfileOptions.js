import React, { useContext, useState, useEffect } from 'react'
import CreateModel from './CreateModel'
import CreatePhotographer from './CreatePhotographer'
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
        {!Array.isArray(user.profile) || !user.profile.length ? <CreateModel user={user} loggedInUser={loggedInUser} /> : <MyProfile user={user} loggedInUser={loggedInUser} />}
      </>
    )
  }

  const photogProfile = () => {
    return (
      <>
        {!Array.isArray(user.profile) || !user.profile.length ? <CreatePhotographer user={user} loggedInUser={loggedInUser} /> : <MyProfile user={user} loggedInUser={loggedInUser} />}

      </>
    )
  }

  return (
    loggedInUser.status === 'model' ? modelProfile() : photogProfile()
  )
}

export default MyProfileOptions