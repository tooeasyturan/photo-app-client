import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const User = ({ user }) => {
  console.log(user)
  // console.log('avatar', user.avatar[0].avatar)
  let avatar = `/Users/joshturan/tfp-frontend/public${user.avatar[0].avatar}`

  if (avatar === undefined) {
    avatar = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
  }
  console.log('avatar', avatar)

  // /Users/joshturan/tfp-frontend/public/uploads/charles.manson/avatar/DSC05606.jpg

  // src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/avatar/${a}`)}

  // /Users/joshturan/tfp-frontend/public/uploads/joshturan/avatar/DSC_0055.jpg

  // src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/avatar/${avatar}`)}

  return (
    <Card href={`/users/${user.username}`} className="user">
      <Image src={require(`/Users/joshturan/tfp-frontend/public/uploads/${user.username}/avatar/${user.avatar[0].avatar}`)} alt='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Description>
          <p>{'Location: ' + user.profile[0].country + ' ' + user.profile[0].region}</p>
          <p>{'Description: ' + user.profile[0].description}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default User