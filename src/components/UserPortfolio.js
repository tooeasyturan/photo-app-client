import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uploadsService from '../services/uploads'

const UserPortfolio = () => {
  const [uploads, setUploads] = useState([])

  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

  useEffect(() => {
    uploadsService.getUploads().then(allUploads => setUploads(allUploads))
  }, [])
  console.log('uploads', uploads)

  const usersPortfolio = uploads.map(upload => {
    return <img key={upload} className="userPortfolio"
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