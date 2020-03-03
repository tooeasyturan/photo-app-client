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

  console.log("USER!!!", user.username)

  // useEffect(() => {
  //   // Create an scoped async function in the hook
  //   async function anyNameFunction() {
  //     await loadContent();
  //   }
  //   // Execute the created function directly
  //   anyNameFunction();
  // }, []);



  // useEffect(() => {
  //   getUserUploads()
  // }, [])

  const getUserUploads = async () => {

    const token = await user.token
    console.log('USER TOKEN', token)
    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
      // params: { username: username }
    }

    try {
      let uploads = await axios.get(`http://localhost:3004/cloudinary/${username}`, config)
      uploads = await uploads.data
      setUploads(uploads)
      console.log('UPLOADS', uploads)
      // console.log('UPLOADSZZ', uploads)
    } catch (exception) {
      console.log('portfolio uploads error')
    }
  }





  const usersPortfolio = uploads.map(upload => {
    return <Image key={upload}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
    // onClick={() => handleRemoveImage(portfolioPic)}
    />
  })

  // How to get rid of button and have pics display on page load? Something with async/await I'm guessing

  return (
    <>
      <button onClick={getUserUploads}>TEST</button>
      {/* {getUserUploads} */}
      <Image.Group className="doubling stackable" size="large">
        <h1>Pics</h1>
        {usersPortfolio}
      </Image.Group>
    </>
  )
}

export default UserPortfolioCloud