import React from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditModelUseForm from './EditModelUseForm'
import EditPhotographer from './EditPhotographer'

import DeleteUser from './DeleteUser'

// Parent is app component

const MyProfile = ({ user, loggedInUser }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          {user.status === 'model' ? <EditModelUseForm user={user} loggedInUser={loggedInUser} /> :
            <EditPhotographer user={user} loggedInUser={loggedInUser} />}
          {/* <DeleteUser /> */}
          <PortfolioUploads />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile