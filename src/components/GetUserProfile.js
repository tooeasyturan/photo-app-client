import React, { useState, useEffect } from 'react'
import uploadsService from '../services/uploads'
import profilesService from '../services/profiles'
import usersService from '../services/users'
import axios from 'axios'
import { Card, Icon, Image } from 'semantic-ui-react'
import UserPortfolio from './UserPortfolio'




const GetUserProfile = (props) => {
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  const [avatar, setAvatar] = useState([])
  const [portfolio, setPortfolio] = useState({})


  useEffect(() => {
    getPortfolio()
    getAvatar()
  }, [])




  const username = props.match.params.username
  console.log(props)

  const getPortfolio = async () => {
    try {
      let user = await axios.get(`http://localhost:3004/users/${username}`)
      user = await user.data
      setUser(user[0])
      setProfile(user[0].profile)
      setPortfolio(user[0].portfolio)


    } catch (exception) {
      console.log('error')
    }
  }

  const getAvatar = async () => {
    try {
      let avatar = await axios.get(`http://localhost:3004/avatar/${username}`)
      avatar = await avatar.data
      setAvatar(avatar)
    } catch (exception) {
      console.log('avatar error')
    }
  }


  console.log('avatar is...', avatar)


  const getUserAvatar = avatar.map(a => {
    return <Image key={a}
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/avatar/${a}`)}
      alt=""
    />
  })





  return (
    <>
      <Card className="ui centered card" >
        {getUserAvatar}
        <Card.Content >
          <p>{user.username}</p>
          <p>{user.firstName + ' ' + user.lastName}</p>
          <p>{user.email}</p>
        </Card.Content>
      </Card>

      <UserPortfolio username={username} />
    </>


  )
}

export default GetUserProfile