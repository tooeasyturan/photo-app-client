import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'


const Users = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])
  console.log('users', users)



  const usersList = () => users.map(user =>
    <User
      key={user.id}
      user={user}

    />
  )


  return (
    <div>
      <ul>{usersList()}</ul>
    </div>
  )

}

export default Users