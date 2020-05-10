import React from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Segment, TextArea, Dropdown, Popup } from 'semantic-ui-react'
import AvatarUpload from '../AvatarUpload'

const PICTURE_OPTIONS = [
  { key: 'headshot', text: 'Headshot', value: 'headshot' },
  { key: 'dating', text: 'Dating', value: 'dating' },
  { key: 'portrait', text: 'Portrait', value: 'portrait' },
  { key: 'fashion', text: 'Fashion', value: 'fashion' },
  { key: 'family', text: 'Family', value: 'family' },
  { key: 'event', text: 'Event', value: 'event' },
  { key: 'nude', text: 'Nude', value: 'nude' }
]

const GridStyle = { height: '100vh' }
const ColumnStyle = { maxWidth: 450 }
const SegmentStyle = { marginTop: 100 }
const FieldHeaderStyle = { fontSize: 16, fontWeight: "bold" }

const ManageProfilePage = ({ user, values, handleChange, handleSubmit }) => {
  const { description, region, country, shootingStyle } = values
  return (
    <Grid textAlign='center' verticalAlign='middle' style={GridStyle}>
      <Grid.Column style={ColumnStyle}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment style={SegmentStyle}>
            <Popup
              trigger={
                <AvatarUpload user={user} />
              }
            >
              <Popup.Header>Click to change avatar</Popup.Header>
            </Popup>
            <br></br>
            <h1 style={FieldHeaderStyle}>Current Location</h1>
            <Form.Group>
              <CountryDropdown name='country' value={country} onChange={handleChange} />
              <RegionDropdown name='region' country={country} value={region} onChange={handleChange} />
            </Form.Group>

            <h1 style={FieldHeaderStyle}>About Me</h1>
            <Form.Field
              control={TextArea}
              value={description}
              name='description'
              onChange={handleChange}
              placeholder='Tell us more about yourself...'
            />

            <h1 style={FieldHeaderStyle}>What types of pictures are you looking for?</h1>
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
}

export default ManageProfilePage