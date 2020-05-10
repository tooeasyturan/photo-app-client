import React, { useState, useEffect } from 'react'

import uploadsService from '../services/uploads'
import uuid from 'uuid/v4'


import { Image } from 'semantic-ui-react'



const FetchPortfolioUploads = ({ user, loggedInUser }) => {
  const [images, setImages] = useState([])

  const { username } = loggedInUser

  useEffect(() => {
    uploadsService.getImages(`uploads/${username}`).then(pics => setImages(pics))
  }, [])

  console.log(images)

  const displayImages = images.map(img => {
    return (<Image key={uuid()}
      src={img}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
    />)
  })

  return (
    <>
      <h1 style={{ marginTop: 200, textAlign: 'center' }}>Test</h1>
      <Image.Group style={{ marginTop: -30, textAlign: 'center' }} doubling stackable size="large">
        {displayImages}
      </Image.Group>
    </>
  )

}

export default FetchPortfolioUploads