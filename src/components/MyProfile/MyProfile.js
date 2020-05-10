import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from '../PortfolioUploads'
import CreateProfile from './CreateProfile'
import EditProfile from './EditProfile'
import { UserContext } from '../UserContext';

import FetchPortfolioUploads from '../FetchPortfolioUploads'

const MyProfile = () => {
  const [user, setUser] = useContext(UserContext)
  const { profile } = user

  return (
    <Grid>
      <Grid.Column>
        {profile.length === 0 ? <CreateProfile /> : <EditProfile />}
        {/* <PortfolioUploads /> */}
        <FetchPortfolioUploads user={user} />
      </Grid.Column>
    </Grid>
  )
}

export default MyProfile