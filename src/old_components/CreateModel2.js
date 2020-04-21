import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import profilesService from '../services/profiles'

const CreateModel2 = () => {
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [shootingStyle, setShootingStyle] = useState('')
  const [socialMedia, setSocialMedia] = useState('')

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

  // const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const profile = await profilesService.create({
        country, region, description, shootingStyle, socialMedia,
      })

      setProfile(profile)
      console.log('set profile', profile)

    } catch (exception) {
      console.log('error')
    }
  }

  const createModel = () => (
    <div className="profile-wrapper">
      <div className="profile-form-wrapper">
        <h1>Create Profile</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="location">Location</label>
            <CountryDropdown value={country} onChange={(val) => setCountry(val)} />
            <RegionDropdown country={country} value={region} onChange={(val) => setRegion(val)} />
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
          <div className="style">
            <label htmlFor="style">Style MODEL!!!!</label>
            <input
              type="text"
              value={shootingStyle}
              className=""
              placeholder="Style"
              name="style"
              noValidate
              onChange={({ target }) => setShootingStyle(target.value)} />
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
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      {createModel()}
    </div>
  )

}

export default CreateModel2