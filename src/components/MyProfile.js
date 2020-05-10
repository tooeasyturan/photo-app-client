import React from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditPhotographer from './EditPhotographer'

import FetchPortfolioUploads from './FeatchPortfolioUploads'

// Parent is app component

const MyProfile = ({ user, loggedInUser }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          {loggedInUser.status === 'model' ? <EditModel user={user} loggedInUser={loggedInUser} /> :
            <EditPhotographer user={user} loggedInUser={loggedInUser} />}
          {/* <DeleteUser /> */}
          <PortfolioUploads />
          {/* <FetchPortfolioUploads user={user} loggedInUser={loggedInUser} /> */}
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile