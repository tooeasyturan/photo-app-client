import React, { useState, useEffect, useContext } from 'react'
import uuid from 'uuid/v4'
import useFetchImages from './ImageHandling/useFetchImages'
import useUploadImage from './ImageHandling/useUploadImage'
import { UserContext } from './UserContext';
import { Image } from 'semantic-ui-react'



const FetchPortfolioUploads = () => {
  const [user, setUser] = useContext(UserContext)
  const { fetchImages, images, handleChange } = useFetchImages(user)
  // const { uploads, handleChange } = useUploadImage(user, images)

  useEffect(() => {
    fetchImages()
  }, [])


  console.log('images', images)


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
      <input name="file" type="file" className="custom-file-input" id="portfolioInput" onChange={handleChange} />
    </>
  )

}

export default FetchPortfolioUploads