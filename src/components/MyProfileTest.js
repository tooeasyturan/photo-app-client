import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import usersService from '../services/users'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Button } from 'react-bootstrap'
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import Cloudinary from './Cloudinary'
import { UserContext } from './UserContext'


const MyProfileTest = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [user, setUser] = useState('')
  const [profile, setProfile] = useState('')
  const [avatar, setAvatar] = useState('')
  const [portfolio, setPortfolio] = useState([])
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [username, setUsername]


  useEffect(() => {
    async function getUser() {
      await getUserProfile()
    }
    getUser()
  }, [])

  const getUserProfile = async () => {
    try {
      if (loggedInUser) {
        let result = await axios.get('http://localhost:3004/auth', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `bearer ${loggedInUser.token}`
          }
        }
        )
        setUser(result.data)
        setProfile(result.data.profile)
        setAvatar(result.data.avatarCloudUpload[0])
        setPortfolio(result.data.cloudinaryUpload)
        // console.log('username', user.firstName)

      }
    }
    catch (error) {
      console.log(error)
    }

  }

  console.log('profile', user.firstName)
  console.log('avatar', avatar.avatar)



  return (
    <>
      <div>
        <Card className="ui centered card" >
          <Image key={avatar.avatar} src={avatar.avatar} alt="" />
          <Card.Content >
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.firstName + ' ' + user.lastName}</p>
            {/* <p>{user.description}</p> */}
          </Card.Content>
          <Button className="primary" href={'/' + user.username + '/profile'}>My Profile</Button>
          <Button className="primary" href='/users'>Explore Users</Button>
        </Card>
        {/* <h1>{user}</h1> */}
      </div>
      <Logout user={user} />
      <DeleteUser />
      <Cloudinary />
    </>
  )
}

export default MyProfileTest