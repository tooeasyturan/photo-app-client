import React from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditPhotographer from './EditPhotographer'

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
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile