import React from 'react'
import { Image, Container, Card } from 'semantic-ui-react'
import SendMessage from '../SendMessage'

const CardStyles = { marginTop: 100 }
const ImageGroupStyles = { marginTop: 100, textAlign: 'center' }

const OtherUserProfilePage = ({ profile, displayImages, username }) => {
  const { userInfo, avatar } = profile

  return (
    <>
      <Container>
        <Card className="ui centered card" style={CardStyles}>
          <Image key={avatar} src={avatar} alt="" />
          <Card.Content >
            <p>{userInfo.username}</p>
            <p>{profile.profile.country + ' ' + profile.profile.region}</p>
            <p>{userInfo.firstName + ' ' + userInfo.lastName}</p>
            <p>{userInfo.email}</p>
            <SendMessage userTo={username} />
          </Card.Content>
        </Card>
      </Container>
      <Image.Group style={ImageGroupStyles} doubling='true' stackable='true' size="large">
        {displayImages}
      </Image.Group>
    </>
  )
}

export default OtherUserProfilePage