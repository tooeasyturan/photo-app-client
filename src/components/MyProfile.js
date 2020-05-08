import React from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditPhotog from './EditPhotog'
import DeleteUser from './DeleteUser'

// Parent is app component

const MyProfile = ({ user, loggedInUser }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          {user.status === 'model' ? <EditModel user={user} loggedInUser={loggedInUser} /> :
            <EditPhotog user={user} loggedInUser={loggedInUser} />}
          {/* <DeleteUser /> */}
          <PortfolioUploads />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile