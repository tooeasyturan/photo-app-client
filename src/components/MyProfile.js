import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import uploadsService from '../services/uploads'
import FileUpload from './FileUpload'
import UserPortfolio from './UserPortfolio'
import FileUploadMulter from './FileUploadMulter'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Button } from 'react-bootstrap'
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import Cloudinary from './Cloudinary'
import UserPortfolioCloud from './UserPortfolioCloud'



const MyProfile = (props) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
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

  const [avatarPath, setAvatarPath] = useState('')



  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])


  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
  // console.log(username)

  useEffect(() => {
    getUserAvatar()
  }, [])

  const getUserAvatar = async () => {
    try {
      const userAvatar = await uploadsService.getAvatar()
      const path = `/Users/joshturan/tfp-frontend/public/uploads/${username}/avatar/${userAvatar[0]}`
      setAvatar(userAvatar)
      setAvatarPath(path)
    } catch (error) {
      console.log('fetching avatar error')
    }
  }


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
      {/* <button onclick={() => localStorage.removeItem('loggedTFPappUser')}></button> */}
      <Logout user={loggedInUserProfile} />
      <DeleteUser />
      <UserPortfolio username={username} />
      {/* <UserPortfolioCloud username={username} /> */}

    </>

  )
}

export default MyProfile