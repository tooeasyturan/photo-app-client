import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import usersService from '../services/users'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Button } from 'react-bootstrap'
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import Cloudinary from './Cloudinary'
import UserPortfolioCloud from './UserPortfolioCloud'
import { UserContext } from './UserContext'



const MyProfile = (props) => {
  const [users, setUsers] = useState([])
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState([])
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [shootingStyle, setShootingStyle] = useState('')
  const [website, setWebsite] = useState('')
  const [socialMedia, setSocialMedia] = useState('')

  const [user, setUser] = useContext(UserContext)
  // console.log('VALUE!!', user)

  // console.log('MY PROFILE PROPS', props)



  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])


  const username = JSON.parse(window.localStorage.getItem('loggedInUser')).username


  const fetchAvatar = async () => {
    const result = await axios.get(`http://localhost:3004/cloudinary/${username}/avatar`)
    setAvatar(result.data)
  }

  useEffect(() => {
    fetchAvatar()
  }, [])



  const findProfile = async () => {
    try {
      const findLoggedInUserProfile = await users.find(users => users.username === username)

      setLoggedInUserProfile(findLoggedInUserProfile)
      setFirstName(findLoggedInUserProfile.firstName)
      setLastName(findLoggedInUserProfile.lastName)
      setEmail(findLoggedInUserProfile.email)
      setLocation(findLoggedInUserProfile.profile[0].location)
      setDescription(findLoggedInUserProfile.profile[0].description)
      setExperience(findLoggedInUserProfile.profile[0].experience)
      setShootingStyle(findLoggedInUserProfile.profile[0].shootingStyle)
      setWebsite(findLoggedInUserProfile.profile[0].website)
      setSocialMedia(findLoggedInUserProfile.profile[0].socialMedia)

    } catch (exception) {
      console.log('error')
    }
  }

  findProfile()

  console.log('find loggedinuserprofile', loggedInUserProfile)





  return (


    <>
      <Card className="ui centered card" >
        <Image key={avatar} src={avatar} alt="" />
        <Card.Content >
          <p>{username}</p>
          <p>{email}</p>
          <p>{firstName + ' ' + lastName}</p>
          <p>{description}</p>
        </Card.Content>
        <Button className="primary" href={'/' + username + '/profile'}>My Profile</Button>
        <Button className="primary" href='/users'>Explore Users</Button>
      </Card>


      <h1>Upload Portfolio Pictures</h1>
      <div className="col-md-12 offset-md-4">

      </div>
      <Logout user={loggedInUserProfile} />
      <DeleteUser />
      {/* <UserPortfolioCloud username={username} /> */}
      <Cloudinary />

    </>

  )
}

export default MyProfile