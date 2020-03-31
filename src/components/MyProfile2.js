import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Card, Image, Button, Grid, Popup } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import PortfolioUploads from './PortfolioUploads'
import CreateModel2 from './CreateModel2'
import { UserContext } from './UserContext'
import AvatarUpload2 from './AvatarUpload2'



const MyProfile2 = ({ user }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          <CreateModel2 user={user} />
          <Button color='teal' size='large' href='/users'>
            Explore Users
          </Button>

          <Logout user={user} />
          <DeleteUser />
          <PortfolioUploads />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <AvatarUpload2 user={user} />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile2