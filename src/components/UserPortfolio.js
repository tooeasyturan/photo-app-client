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

  const portfolioPics = uploads.filter(file => file.includes('.jpg'))
  console.log(portfolioPics)

  const usersPortfolio = portfolioPics.map(portfolioPic => {
    return <img key={portfolioPic} className="userPortfolio"
      src={require(`/Users/joshturan/tfp-frontend/public/uploads/${username}/${portfolioPic}`)}
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