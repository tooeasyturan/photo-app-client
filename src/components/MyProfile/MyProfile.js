import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import CreateProfile from './CreateProfile'
import EditProfile from './EditProfile'
import { UserContext } from '../UserContext';

import ManageMyPortfolio from './ManageMyPortfolio'

const MyProfile = () => {
  const [user, setUser] = useContext(UserContext)
  const { profile } = user

  return (
    <Grid>
      <Grid.Column>
        {profile.length === 0 ? <CreateProfile user={user} /> : <EditProfile user={user} />}
        <ManageMyPortfolio user={user} />
      </Grid.Column>
    </Grid>
  )
}

export default MyProfile