import React, { useState, useEffect, useContext } from 'react'
import uuid from 'uuid/v4'
import useImageHandling from '../CustomHooks/useImageHandling'
import { UserContext } from '../UserContext';
import { Image, Container, Loader, Popup, Icon } from 'semantic-ui-react'

const ContainerStyles = { marginTop: 150, marginLeft: 100 }
const InputStyles = { display: 'none' }
const HeaderStyles = { display: 'inline', marginRight: 10 }
const LabelStyles = { cursor: 'pointer', marginBottom: 45 }
const ImageGroupStyles = { marginTop: -30, textAlign: 'center' }



const ManageMyPortfolio = () => {
  const [user, setUser] = useContext(UserContext)
  const { fetchImages, images, handleChange, isLoading, handleDeleteImage } = useImageHandling(user)

  useEffect(() => {
    fetchImages()
  }, [])

  console.log('isLoading', isLoading)


  const displayImages = images.map(img => {
    return (<Image key={uuid()}
      src={img}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
      onClick={() => handleDeleteImage(img)}
    />)
  })


  return (
    <>
      <Container style={ContainerStyles} textAlign='center'>
        <input name="file" type="file" className="custom-file-input" id="portfolioInput" onChange={handleChange} style={InputStyles} />
        {isLoading ? <Loader active inline /> :
          <>
            <h1 style={HeaderStyles}>Portfolio</h1>
            <Popup
              trigger={
                <label htmlFor="portfolioInput"><Icon name='upload' size='huge' color='teal' style={LabelStyles} />
                </label>
              }
              content='Add image to your portfolio'
            />
          </>
        }
      </Container>
      <Image.Group style={ImageGroupStyles} doubling='true' stackable='true' size="large">
        {displayImages}
      </Image.Group>
    </>
  )

}

export default ManageMyPortfolio