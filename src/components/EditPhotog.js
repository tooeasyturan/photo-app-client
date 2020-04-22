/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Segment, TextArea, Dropdown, Popup } from 'semantic-ui-react'
import AvatarUpload from './AvatarUpload'

// Component for editing user with status 'photographer' after initial profile has been created. 


import profilesService from '../services/profiles'

const EditPhotog = ({ user }) => {


  const options = [
    { key: 'headshot', text: 'Headshot', value: 'headshot' },
    { key: 'dating', text: 'Dating', value: 'dating' },
    { key: 'portrait', text: 'Portrait', value: 'portrait' },
    { key: 'fashion', text: 'Fashion', value: 'fashion' },
    { key: 'family', text: 'Family', value: 'family' },
    { key: 'event', text: 'Event', value: 'event' },
    { key: 'nude', text: 'Nude', value: 'nude' }
  ]

  const [country, setCountry] = useState(user.profile[0].country)
  const [region, setRegion] = useState(user.profile[0].region)
  const [description, setDescription] = useState(user.profile[0].description)
  const [shootingStyle, setShootingStyle] = useState(user.profile[0].shootingStyle)
  const [socialMedia, setSocialMedia] = useState('')

  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const result = JSON.parse(loggedUserJSON)
      setToken(result)
      profilesService.setToken(result.token)
    }
  }, [])



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


  const editPhotog = () => (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* <Header as='h2' color='teal' textAlign='center'>
          Edit Your Profile
      </Header> */}
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
              <CountryDropdown value={country} onChange={(val) => setCountry(val)} />
              <RegionDropdown country={country} value={region} onChange={(val) => setRegion(val)} />
            </Form.Group>

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>About Me</h1>
            <Form.Field
              control={TextArea}
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              placeholder='Tell us more about yourself...'
            />

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>What types of pictures are you interested in shooting?</h1>
            <Dropdown
              placeholder='Please select at least one type'
              fluid
              multiple selection
              options={options}
              value={shootingStyle}
              onChange={(e, { value }) => setShootingStyle([...value])}
            />
            <br></br>
            <Button color='teal' fluid size='large'>
              Update Profile
          </Button>          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )




  return (
    <div>
      {editPhotog()}
    </div>
  )

}

export default EditPhotog