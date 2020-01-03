import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uploadsService from '../services/uploads'
import { Card, Image } from 'semantic-ui-react'

const UserPortfolio = ({ username }) => {
  const [uploads, setUploads] = useState([])
  console.log(username)

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

  const portfolioPics = uploads.filter(file => file.includes('.jpg'))
  console.log(portfolioPics)

  const usersPortfolio = portfolioPics.map(portfolioPic => {
    return <Image key={portfolioPic}
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/${portfolioPic}`)}
      wrapped ui={true}
      alt=""
      rounded
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