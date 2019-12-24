import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'
import uploadsService from '../services/uploads'
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios'



const Users = () => {
  const [users, setUsers] = useState([])
  const [avatar, setAvatar] = useState([])


  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])

  console.log(users)


  // const getAvatar = (user) => {
  //   try {
  //     const request = axios.get(`http://localhost:3004/avatar/${user.username}`, { params: { username: user.username } }).then(response => response.data).then(avatar => { console.log(user.username, avatar) })
  //     return request
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const getAvatars = async (users) => {
  //   users.map(user => )
  // }

  const getAvatar = (user) => {

    const request = axios.get(`http://localhost:3004/avatar/${user.username}`)
    return request.then(response => response.data)
  }

  // const getUserAvatar = (user) => getAvatar(user).then(avatar => setAvatar(avatar))

  // console.log('portfolio', getPortfolio)

  const usersList = () => users.map(user =>
    <User

      key={user.id}
      user={user}

    />
  )


  return (
    <div>
      <h1>Explore Users</h1>
      <Card.Group className="doubling stackable" itemsPerRow={6}>
        {usersList()}
      </Card.Group>
    </div>
  )

}

export default Users