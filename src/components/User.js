import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const User = ({ user }) => {
  console.log(user)

  return (
    <Card className="user">
      <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Description>
          <p>{'Location: ' + user.profile[0].location}</p>
          <p>{'Description: ' + user.profile[0].description}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default User