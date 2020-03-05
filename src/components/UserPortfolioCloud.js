import React, { useState, useEffect } from 'react'
import uploadsService from '../services/uploads'
import { Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios'

const UserPortfolioCloud = (props) => {
  const [uploads, setUploads] = useState([])
  const [user, setUser] = useState('')

  const username = props.match.params.username
  console.log('PROPS USERNAME', username)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  useEffect(() => {
    const fetchImages = async () => {
      const result = await axios.get(`http://localhost:3004/cloudinary/${username}`)
      setUploads(result.data)
    }
    fetchImages()
  }, [])


  const handleRemoveImage = async (upload) => {
    // PROBABLY BETTER TO SEND NAME OF IMAGE TO BE DELETED WITH REQUEST URL PARAMS
    // *** Uploads are retrieved directly from file, not through db. Need to query db for portfolio id. 
    // *** maybe images should be saved using portfolio id.

    const token = user.token
    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
      data: { upload }
    }

    if (window.confirm("Are you sure you want to delete this image")) {

      console.log('token', token)
      const response = await axios.delete('http://localhost:3004/cloudinary', config)
      console.log(response)
    } else {
      console.log('image not deleted')
    }
  }

  const usersPortfolio = uploads.map(upload => {
    return <Image key={upload}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
      onClick={() => handleRemoveImage(upload)}
    />
  })


  return (
    <>
      <h1>Pics</h1>
      <Image.Group className="doubling stackable" size="large">
        {usersPortfolio}
      </Image.Group>
    </>
  )
}

export default UserPortfolioCloud