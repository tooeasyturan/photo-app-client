import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditPhotographer from './EditPhotographer'
import FetchPortfolioUploads from './FeatchPortfolioUploads'

import CreateProfile from './CreateProfile'
import EditProfile from './EditProfile'

import { UserContext } from './UserContext';


// Parent is app component

const MyProfile = () => {
  const [user, setUser] = useContext(UserContext)
  const { profile } = user

  console.log('MY PROFILE', user.profile.length)

  return (
    <>
      <Grid>
        <Grid.Column>
          {/* {user.status === 'model' ? <EditModel user={user} loggedInUser={user} /> :
            <EditPhotographer user={user} loggedInUser={user} />} */}
          {profile.length === 0 ? <CreateProfile /> : <EditProfile />}
          {/* <DeleteUser /> */}
          <PortfolioUploads />
          {/* <FetchPortfolioUploads user={user} loggedInUser={loggedInUser} /> */}
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile