import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import FileUpload from './FileUpload'
import { Button } from 'react-bootstrap'
import "../styles/UserProfile.css"



const UserProfile = () => {
  const [users, setUsers] = useState([])
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')


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

  const findProfile = async () => {
    try {
      const findLoggedInUserProfile = await users.find(users => users.username === username)

      setLoggedInUserProfile(findLoggedInUserProfile)
      setFirstName(findLoggedInUserProfile.firstName)
      setLastName(findLoggedInUserProfile.lastName)
      setEmail(findLoggedInUserProfile.email)
      setLocation(findLoggedInUserProfile.profile[0].location)
      setProfilePicture(findLoggedInUserProfile.profile[0].profilePicture)
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

  // const onChangeHandler = (event) => {
  //   console.log(event.target.files[0])

  // }

  return (
    <div className="userProfile">
      <img src={profilePicture} alt="" width="200px" height="200px"></img>
      <p>{username}</p>
      <p>{email}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{location}</p>
      <p>{description}</p>
      <Button className="primary" href={'/' + username + '/profile'}>My Profile</Button>
      <Button className="primary" href='/users'>Explore Users</Button>
      <h1>Upload Portfolio Pictures</h1>
      <FileUpload />

      {/* <div class="custom-file">
        <input type="file" class="custom-file-input" id="customFile" onChange={onChangeHandler} />
        <label class="custom-file-label" htmlfor="customFile">Choose file</label>
      </div> */}

    </div>
  )
}

export default UserProfile