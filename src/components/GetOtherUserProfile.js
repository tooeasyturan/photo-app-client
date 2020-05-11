import React, { useEffect, useState } from 'react'
import profilesServices from '../services/profiles'
import uuid from 'uuid/v4'
import { Image, Container, Card } from 'semantic-ui-react'

const CardStyles = { marginTop: 100 }
const ImageGroupStyles = { marginTop: 100, textAlign: 'center' }

const DEFAULT_USER_PROFILE = {
  userInfo: [],
  profile: [],
  avatar: [],
  upload: []
}

const GetOtherUserProfile = (props) => {
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE)
  const username = props.match.params.username


  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      let user = await profilesServices.getProfile(username)
      console.log('profile', profile)
      setProfile({ ...profile, userInfo: user, profile: user.profile[0], avatar: user.avatar[0], upload: user.upload })
    } catch (error) {
      console.log(error)
    }
  }


  const displayImages = profile.upload.map(upload => {
    return (<Image key={uuid()}
      src={upload.portfolio}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
    />)
  })

  return (
    <div>
      <Container>
        <Card className="ui centered card" style={CardStyles}>
          <Image key={profile.avatar.avatar} src={profile.avatar.avatar} alt="" />
          <Card.Content >
            <p>{profile.userInfo.username}</p>
            <p>{profile.profile.country + ' ' + profile.profile.region}</p>
            <p>{profile.userInfo.firstName + ' ' + profile.userInfo.lastName}</p>
            <p>{profile.userInfo.email}</p>
          </Card.Content>
        </Card>
      </Container>
      <Image.Group style={ImageGroupStyles} doubling='true' stackable='true' size="large">
        {displayImages}
      </Image.Group>
    </div>
  )
}

export default GetOtherUserProfile