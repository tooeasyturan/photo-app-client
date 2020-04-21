import React, { useState, useEffect } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios'

const ConvoAvatar = ({ user, userToAvatar }) => {
  const [avatar, setAvatar] = useState([])

  useEffect(() => {
    fetchAvatar()
  }, [])

  const fetchAvatar = async () => {
    const result = await axios.get(`http://localhost:3004/uploads/${user}/avatar`)
    setAvatar(result.data[0])
  }


  return (
    <>
      <Image avatar src={avatar} />
    </>
  )
}

export default ConvoAvatar