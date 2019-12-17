import React from 'react'

const User = ({ user }) => {
  console.log(user)

  return (
    <li className="user">
      {user.username + ' ' + user.firstName + ' ' + user.lastName + ' ' + user.profile[0].location}
    </li>
  )
}

export default User