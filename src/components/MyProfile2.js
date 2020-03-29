import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Button } from 'react-bootstrap'
import { Card, Image, } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import PortfolioUploads from './PortfolioUploads'
import CreateModel2 from './CreateModel2'
import { UserContext } from './UserContext'


const MyProfile2 = ({ user }) => {

  const [profile, setProfile] = useState('')
  const [avatar, setAvatar] = useState('')
  const [portfolio, setPortfolio] = useState([])


  console.log('USER FROM APP', user)




  return (
    <>
      <div>
        <CreateModel2 user={user} />

      </div>
      <Logout user={user} />
      <DeleteUser />
      <PortfolioUploads />
    </>
  )
}

export default MyProfile2