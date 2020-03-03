import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uploadsService from '../services/uploads'
import { Card, Image } from 'semantic-ui-react'

const UserPortfolio = (props) => {
  const [uploads, setUploads] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const username = props.username

  console.log('user portfolio user', username)
  console.log('PROPS', props)

  // const username = props.match.params.username

  // const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

  // useEffect(() => {
  //   uploadsService.getUploads().then(allUploads => setUploads(allUploads))
  // }, [])
  // console.log('uploads', uploads)

  useEffect(() => {
    getUserUploads()
  }, [])

  const getUserUploads = async () => {
    try {
      let uploads = await axios.get(`http://localhost:3004/${username}`, { params: { username: username } })
      uploads = await uploads.data
      setUploads(uploads)
    } catch (exception) {
      console.log('portfolio uploads error')
    }
  }

  console.log('uPLOADS', uploads)
  const portfolioPics = uploads.filter(file => file.includes('.jpg'))
  console.log(portfolioPics)

  const handleRemoveImage = async (portfolioPic) => {
    // PROBABLY BETTER TO SEND NAME OF IMAGE TO BE DELETED WITH REQUEST URL PARAMS
    // *** Uploads are retrieved directly from file, not through db. Need to query db for portfolio id. 
    // *** maybe images should be saved using portfolio id.

    const token = user.token
    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
      data: { portfolioPic }
    }

    if (window.confirm("Are you sure you want to delete this image")) {

      console.log('token', token)
      const response = await axios.delete('http://localhost:3004/users/portfolio', config)
      console.log(response)
    } else {
      console.log('image not deleted')
    }


  }

  const usersPortfolio = portfolioPics.map(portfolioPic => {
    return <Image key={portfolioPic}
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/${portfolioPic}`)}
      wrapped ui={true}
      alt=""
      rounded
      onClick={() => handleRemoveImage(portfolioPic)}
    />
  })



  return (
    <Image.Group className="doubling stackable" size="large">
      <h1>Pics</h1>
      {usersPortfolio}
    </Image.Group>
  )
}


export default UserPortfolio