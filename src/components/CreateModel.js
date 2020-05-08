/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Segment, TextArea, Dropdown, Popup } from 'semantic-ui-react'
import AvatarUpload from './AvatarUpload'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'

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

const CreateModel = ({ user, loggedInUser }) => {

  const CREATE_MODEL_OPTIONS = {
    country: '',
    region: '',
    description: '',
    shootingStyle: []
  }

  const [profileFields, setProfileFields] = useState(CREATE_MODEL_OPTIONS)
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



  const createModel = () => (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment style={{ marginTop: 100 }}>
            <Popup
              trigger={
                <AvatarUpload user={user} />
              }
            >
              <Popup.Header>Click to change avatar</Popup.Header>
            </Popup>
            <br></br>
            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>Current Location</h1>
            <Form.Group>
              <CountryDropdown name='country' value={country} onChange={handleChange} />
              <RegionDropdown name='region' country={country} value={region} onChange={handleChange} />
            </Form.Group>

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>About Me</h1>
            <Form.Field
              control={TextArea}
              value={description}
              name='description'
              onChange={handleChange}
              placeholder='Tell us more about yourself...'
            />

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>What types of pictures are you looking for?</h1>
            <Dropdown
              placeholder='Please select at least one type'
              fluid
              multiple selection
              options={PICTURE_OPTIONS}
              value={shootingStyle}
              name='shootingStyle'
              onChange={handleChange}
            />
            <br></br>
            <Button color='teal' fluid size='large'>
              Update Profile
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )


  return (
    <div>
      {/* {createModel()} */}
      <ManageProfilePage user={user} country={country} region={region} descption={description} PICTURE_OPTIONS={PICTURE_OPTIONS}
        shootingStyle={shootingStyle} handleChange={handleChange} handleSubmit={handleSubmit}
      />
    </div>
  )

}

export default CreateModel