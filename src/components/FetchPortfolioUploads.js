import React, { useState, useEffect, useContext } from 'react'

import uploadsService from '../services/uploads'
import uuid from 'uuid/v4'
import useFetchImages from './ImageHandling/useFetchImages'
import { UserContext } from './UserContext';


import { Image } from 'semantic-ui-react'



const FetchPortfolioUploads = () => {
  const [user, setUser] = useContext(UserContext)
  const { fetchImages, images, fetchAvatar, avatar } = useFetchImages(user)
  // console.log('my profile user', user)

  // const [images, setImages] = useState([])

  // const { username } = loggedInUser

  // useEffect(() => {
  //   uploadsService.getImages(`uploads/${username}`).then(pics => setImages(pics))
  // }, [])

  // console.log(images)

  useEffect(() => {
    fetchImages()
    fetchAvatar()
  }, [])

  console.log('AVATAR', avatar)

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
\      </Image.Group>
    </>
  )

}

export default FetchPortfolioUploads