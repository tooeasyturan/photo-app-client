/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Segment, TextArea, Dropdown, Image, Popup } from 'semantic-ui-react'
import AvatarUpload from '../src/components/AvatarUpload'
import profilesService from '../src/services/profiles'



// Component for creating user profile if status is 'model'

const CreateModel = ({ user }) => {
  console.log('create model user', user)

  const options = [
    { key: 'headshot', text: 'Headshot', value: 'headshot' },
    { key: 'dating', text: 'Dating', value: 'dating' },
    { key: 'portrait', text: 'Portrait', value: 'portrait' },
    { key: 'fashion', text: 'Fashion', value: 'fashion' },
    { key: 'family', text: 'Family', value: 'family' },
    { key: 'event', text: 'Event', value: 'event' },
  ]

  const [country, setCountry] = useState()
  const [region, setRegion] = useState()
  const [description, setDescription] = useState()
  const [shootingStyle, setShootingStyle] = useState([])
  const [socialMedia, setSocialMedia] = useState()


  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
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

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>What types of pictures are you looking for?</h1>
            <Dropdown
              placeholder='Please select at least one type'
              fluid
              multiple selection
              options={options}
              value={shootingStyle}
              // onChange={({ target }) => setStyle(style.concat(target.innerText))}
              onChange={(e, { value }) => setShootingStyle([...value])}
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
      {createModel()}
    </div>
  )
}

export default CreateModel