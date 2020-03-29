import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Image } from 'semantic-ui-react'
import UserPortfolio from './UserPortfolio'




const GetUserProfile = (props) => {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [avatar, setAvatar] = useState([])


  useEffect(() => {
    getPortfolio()
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
      console.log('location', user[0].profile[0].country)

      // console.log('profile', profile)


    } catch (exception) {
      console.log('error')
    }
  }

  console.log('user', user)


  const fetchAvatar = async () => {
    const result = await axios.get(`http://localhost:3004/uploads/${username}/avatar`)
    setAvatar(result.data)
    console.log('RESULT.DATA', result.data)
  }

  useEffect(() => {
    fetchAvatar()
  }, [])




  return (
    <>
      <Card className="ui centered card" >
        <Image key={avatar} src={avatar} alt="" />
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