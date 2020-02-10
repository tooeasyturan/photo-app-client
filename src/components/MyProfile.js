import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import uploadsService from '../services/uploads'
import FileUpload from './FileUpload'
import UserPortfolio from './UserPortfolio'
import FileUploadMulter from './FileUploadMulter'
import DeleteUser from './DeleteUser'
import { Button } from 'react-bootstrap'
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import "../styles/UserProfile.css"



const MyProfile = (props) => {
  const [users, setUsers] = useState([])
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [avatar, setAvatar] = useState([])
  const [profilePicture, setProfilePicture] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [shootingStyle, setShootingStyle] = useState('')
  const [website, setWebsite] = useState('')
  const [socialMedia, setSocialMedia] = useState('')



  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])

  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
  console.log(username)

  useEffect(() => {
    uploadsService.getAvatar().then(userAvatar => setAvatar(userAvatar))
  }, [])

  console.log('avatar', avatar)


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


  // I DONT KNOW WHY I HAVE TO MAP AVATAR IN ORDER FOR DIRECTORY TO ROUTE PROPERLY
  const getAvatar = avatar.map(a => {
    return <Image key={a}
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/avatar/${a}`)}
      alt=""
    />
  })


  console.log('getAvatar', getAvatar)

  return (


    <>
      <Card className="ui centered card" >
        {getAvatar}
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
      <div className="col-md-4 offset-md-4">
        <FileUpload />
      </div>

      <DeleteUser />
      <UserPortfolio username={username} />

    </>

  )
}

export default MyProfile