import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DeleteUser = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const deleteUser = () => {

    const token = user.token
    const config = {
      headers: { Authorization: token },
    }
    console.log('id', token)
    axios.delete('http://localhost:3004/users/profile', config)
  }



  return (
    <div>
      <button onClick={deleteUser}>Delete User and Profile</button>
    </div>
  )
}

export default DeleteUser