import React from 'react'

const User = ({ user }) => {

  return (
    <li className="user">
      {user.username + ' ' + user.firstName + ' ' + user.lastName}
    </li>
  )
}

export default User