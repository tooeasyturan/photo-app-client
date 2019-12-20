import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserPortfolio = () => {
  const [uploads, setUploads] = useState([])

  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

  const getUploads = () => {
    const request = axios.get(`http://localhost:3004/${username}`, { params: { username: username } })
    return request.then(response => response.data)
  }

  useEffect(() => {
    getUploads().then(allUploads => setUploads(allUploads))
  }, [])
  console.log('uploads', uploads)

  const usersPortfolio = uploads.map(upload => {
    return <img key={upload}
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/${upload}`)}
      alt=""
      height="200px"
      width="200px"
    />
  })



  return (
    <div>
      <h1>Pics</h1>
      {usersPortfolio}
    </div>
  )
}


export default UserPortfolio