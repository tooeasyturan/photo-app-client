import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Component for deleting user and associated profile. Does not (yet) delete pictures from cloudinary. 

const DeleteUser = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const deleteUser = async () => {

    const token = user.token
    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
    }
    console.log('token', token)
    const response = await axios.delete('http://localhost:3004/users/profile', config)
    window.localStorage.removeItem('loggedTFPappUser')
    console.log(response)
  }



  return (
    <div>
      <button onClick={deleteUser}>Delete User and Profile</button>
    </div>
  )
}

export default DeleteUser