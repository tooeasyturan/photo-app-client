import React from 'react'
import { Grid } from 'semantic-ui-react'
import PortfolioUploads from './PortfolioUploads'
import EditModel from './EditModel'
import EditPhotog from './EditPhotog'

// Parent is app component

const MyProfile = ({ user }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          {user.status === 'model' ? <EditModel user={user} /> : <EditPhotog user={user} />}
          <PortfolioUploads />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile