import React, { useState, useEffect } from 'react'
import profilesService from '../services/profiles'
import usersService from '../services/users'
import "../styles/Profile.css"


const Profile = () => {
  const [profilePicture, setProfilePicture] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [shootingStyle, setShootingStyle] = useState('')
  const [website, setWebsite] = useState('')
  const [socialMedia, setSocialMedia] = useState('')
  const [portfolio, setPortfolio] = useState('')

  const [user, setUser] = useState(null)

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      profilesService.setToken(user.token)
    }
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const profile = await profilesService.create({
        profilePicture, location, description, experience, shootingStyle, website, socialMedia, portfolio
      })

      setProfile(profile)
    } catch (exception) {
      console.log('error')
    }
  }



  const createProfile = () => (
    <div className="profile-wrapper">
      <div className="profile-form-wrapper">
        <h1>Create Profile</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="profPic">
            <label htmlFor="profPic">Profile Picture</label>
            <input
              type="text"
              value={profilePicture}
              className=""
              placeholder="profile picture"
              name="profPic"
              noValidate
              onChange={({ target }) => setProfilePicture(target.value)}
            />
          </div>
          <div className="location">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              value={location}
              className=""
              placeholder="Location"
              name="location"
              noValidate
              onChange={({ target }) => setLocation(target.value)} />
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={description}
              className=""
              placeholder="Description"
              name="description"
              noValidate
              onChange={({ target }) => setDescription(target.value)} />
          </div>
          <div className="experience">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              value={experience}
              className=""
              placeholder="Experience"
              name="experience"
              noValidate
              onChange={({ target }) => setExperience(target.value)} />
          </div>
          <div className="shootingStyle">
            <label htmlFor="shootingStyle">Shooting Style</label>
            <input
              type="text"
              value={shootingStyle}
              className=""
              placeholder="Shooting Style"
              name="shootingStyle"
              noValidate
              onChange={({ target }) => setShootingStyle(target.value)} />
          </div>
          <div className="website">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              value={website}
              className=""
              placeholder="Website"
              name="website"
              noValidate
              onChange={({ target }) => setWebsite(target.value)} />
          </div>
          <div className="socialMedia">
            <label htmlFor="socialMedia">Social Media</label>
            <input
              type="text"
              value={socialMedia}
              className=""
              placeholder="Social Media"
              name="socialMedia"
              noValidate
              onChange={({ target }) => setSocialMedia(target.value)} />
          </div>
          <div className="portfolio">
            <label htmlFor="portfolio">Portfolio</label>
            <input
              type="text"
              value={portfolio}
              className=""
              placeholder="Portfolio"
              name="portfolio"
              noValidate
              onChange={({ target }) => setPortfolio(target.value)} />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  )


  return (
    <div>
      {createProfile()}
    </div>
  )

}

export default Profile