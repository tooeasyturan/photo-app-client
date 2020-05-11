/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Segment, TextArea, Dropdown, Popup } from 'semantic-ui-react'
import AvatarUpload from '../src/components/AvatarUpload'
import profilesService from '../src/services/profiles'
import ManageProfilePage from '../src/pages/ManageProfilePage'


// Component for editing user with status 'model' after initial profile has been created. 

const PICTURE_OPTIONS = [
  { key: 'headshot', text: 'Headshot', value: 'headshot' },
  { key: 'dating', text: 'Dating', value: 'dating' },
  { key: 'portrait', text: 'Portrait', value: 'portrait' },
  { key: 'fashion', text: 'Fashion', value: 'fashion' },
  { key: 'family', text: 'Family', value: 'family' },
  { key: 'event', text: 'Event', value: 'event' },
  { key: 'nude', text: 'Nude', value: 'nude' }
]

const EditModel = ({ user, loggedInUser }) => {

  const EDIT_MODEL_OPTIONS = {
    country: user.profile[0].country,
    region: user.profile[0].region,
    description: user.profile[0].description,
    shootingStyle: user.profile[0].shootingStyle,
  }

  const [profileFields, setProfileFields] = useState(EDIT_MODEL_OPTIONS)
  const { description, region, country, shootingStyle } = profileFields

  const handleChange = (val, e) => {
    if (e.target) {
      const { name, value } = e.target
      setProfileFields({
        ...profileFields,
        [name]: value
      })
    } else {
      setProfileFields({
        ...profileFields,
        [e.name]: e.value
      })
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await profilesService.create(loggedInUser, {
        country, region, description, shootingStyle
      })
    } catch (exception) {
      console.log('error')
    }
  }



  return (
    <div>
      <ManageProfilePage user={user} country={country} region={region} descption={description} PICTURE_OPTIONS={PICTURE_OPTIONS}
        shootingStyle={shootingStyle} handleChange={handleChange} handleSubmit={handleSubmit}
      />
    </div>
  )

}

export default EditModel