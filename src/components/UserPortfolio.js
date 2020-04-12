import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'semantic-ui-react'
import axios from 'axios'
import { UserContext } from './UserContext'


const UserPortfolioCloud = (props) => {
  const [uploads, setUploads] = useState([])
  const [user, setUser] = useState('')

  // const username = props.match.params.username
  const username = props.username
  console.log('UPLOADS', uploads)




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
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
      <h1>Pics</h1>
      <Image.Group className="doubling stackable" size="large">
        {props.username === user.username ? myPortfolio : usersPortfolio}
        {/* <GetCloudUploads uploads={uploads} /> */}
      </Image.Group>
    </>
  )
}

export default UserPortfolioCloud