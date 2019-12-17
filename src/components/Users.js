import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'
import { Card, Icon, Image } from 'semantic-ui-react'



const Users = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])



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