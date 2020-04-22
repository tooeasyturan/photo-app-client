/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Card, Image } from 'semantic-ui-react'
import axios from 'axios'

// Child component of Users for displaying profile (excluding portfolio). 
// For some reason fetching avatar is in this component

const User = ({ user }) => {
  const [avatar, setAvatar] = useState([])

  console.log(user)

  const fetchImages = async () => {
    const result = await axios.get(`http://localhost:3004/uploads/${user.username}/avatar`)
    setAvatar(result.data)
    console.log('RESULT.DATA', result.data)
  }

  useEffect(() => {
    fetchImages()
  }, [])


  return (
    <Card href={`/users/${user.username}`} className="user">
      <Image src={avatar} alt='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Description>
          <p>{'Location: ' + user.profile[0].country + ' ' + user.profile[0].region}</p>
          <p>{'Description: ' + user.profile[0].description}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default User