import React, { useState, useEffect } from 'react'
import uploadsService from '../services/uploads'
import profilesService from '../services/profiles'
import usersService from '../services/users'
import axios from 'axios'
import { Card, Icon, Image } from 'semantic-ui-react'
import UserPortfolio from './UserPortfolio'
import SearchUsers from './SearchUsers'




const GetUserProfile = (props) => {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [avatar, setAvatar] = useState([])
  const [portfolio, setPortfolio] = useState({})


  useEffect(() => {
    getPortfolio()
    getAvatar()
  }, [])


  const username = props.match.params.username
  console.log("props", props)

  const getPortfolio = async () => {
    try {
      let user = await axios.get(`http://localhost:3004/users/${username}`)
      user = await user.data

      // must use await on 'profile' or page will render before profile data is fetched and causes errors
      const profile = await user[0].profile[0]
      setUser(user[0])
      setProfile(profile)
      setPortfolio(user[0].portfolio)
      console.log('location', user[0].profile[0].country)

      // console.log('profile', profile)


    } catch (exception) {
      console.log('error')
    }
  }

  console.log('user', user)
  console.log('location2', profile.country)
  console.log('portfolio', portfolio)




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
          <p>{profile.country + ' ' + profile.region}</p>
          <p>{user.firstName + ' ' + user.lastName}</p>
          <p>{user.email}</p>
        </Card.Content>
      </Card>
      <UserPortfolio username={username} />
    </>


  )
}

export default GetUserProfile