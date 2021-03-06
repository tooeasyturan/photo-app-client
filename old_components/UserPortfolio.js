/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Image, Container } from 'semantic-ui-react'
import axios from 'axios'


const UserPortfolio = (props) => {
  const [uploads, setUploads] = useState([])
  const [user, setUser] = useState('')

  const username = props.username
  console.log('UPLOADS', uploads)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const fetchImages = async () => {
    const result = await axios.get(`http://localhost:3004/uploads/${username}`)
    setUploads(result.data)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // // RUN FUNCTION OUTSIDE OF useEffect SO RE-RENDER WILL OCCUR
  // fetchImages()


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
      const response = await axios.delete('http://localhost:3004/uploads', config)
      console.log(response)
    } else {
      console.log('image not deleted')
    }
  }

  const myPortfolio = uploads.map(upload => {
    return <Image key={upload}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
      onClick={() => handleRemoveImage(upload)}
    />
  })

  const usersPortfolio = uploads.map(upload => {
    return <Image key={upload}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
    />
  })

  return (
    <>
      <Container style={{ marginTop: 50 }} textAlign='center'>
        <h1>Pics</h1>
      </Container>
      <Image.Group style={{ textAlign: 'center', marginTop: 20 }} doubling stackable size="large">
        {props.username === user.username ? myPortfolio : usersPortfolio}
      </Image.Group>
    </>
  )
}

export default UserPortfolio