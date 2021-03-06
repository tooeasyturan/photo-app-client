/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { Image, Icon, Popup, Loader, Container } from 'semantic-ui-react'
import axios from 'axios'
import uuid from 'uuid/v4'
import { UserContext } from '../src/components/UserContext'


const PortfolioUploads = () => {

  // SHOULD I KEEP ALL LOGIC FOR UPLOADING AND DISPLAYING PORTFOLIO PICS IN ONE COMPONENT OR SEPARATE? NEED TO KEEP IN MIND STATE CHANGE FOR UPLOADS

  const [user, setUser] = useContext(UserContext)
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [uploads, setUploads] = useState([])
  const [isLoading, setIsLoading] = useState(false)



  const { username, token } = JSON.parse(window.localStorage.getItem('loggedInUser'))


  const onChangeHandler = async (event) => {
    event.preventDefault()
    console.log('setting file', event.target.files[0])

    // setFile(event.target.files[0])
    // setFilename(event.target.files[0].name)

    const file = event.target.files[0]
    // const filename = event.target.files[0].name

    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', username)
    formData.append('folder', 'userimg')
    console.log('form data', formData)

    try {
      console.log('submitting form data')
      const res = await axios.post('http://localhost:3004/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      })

      const { fileName, filePath } = res.data;
      console.log('res.data', res.data)
      setUploadedFile({ fileName, filePath })
      setFilename('Choose File')
      console.log('filepath', filePath)
      const result = await axios.get(`http://localhost:3004/uploads/${username}`)
      setUploads(result.data)
      setIsLoading(false)
      // console.log('CLOUDINARY UPLOADS', result.data)
    } catch (err) {
      setIsLoading(false)
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  window.uploads = uploads


  const fetchImages = async () => {
    const result = await axios.get(`http://localhost:3004/uploads/${username}`)
    setUploads(result.data)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleRemoveImage = async (upload) => {
    // PROBABLY BETTER TO SEND NAME OF IMAGE TO BE DELETED WITH REQUEST URL PARAMS
    // *** Uploads are retrieved directly from file, not through db. Need to query db for portfolio id. 
    // *** maybe images should be saved using portfolio id.

    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
      data: { upload }
    }

    if (window.confirm("Are you sure you want to delete this image")) {

      console.log('image to delete', upload)
      const response = await axios.delete('http://localhost:3004/uploads', config)
      const uploads = await axios.get(`http://localhost:3004/uploads/${username}`)
      setUploads(uploads.data)
      console.log(response)
    } else {
      console.log('image not deleted')
    }
  }

  const usersPortfolio = uploads.map(upload => {
    return <Image key={uuid()}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
      onClick={() => handleRemoveImage(upload)}
    />
  })




  return (
    <>
      <Container style={{ marginTop: 150, marginLeft: 100 }} textAlign='center'>
        <input name="file" type="file" className="custom-file-input" id="portfolioInput" onChange={onChangeHandler} style={{ display: 'none' }} />
        {isLoading ? <Loader active inline /> :
          <>
            <h1 style={{ display: 'inline', marginRight: 10 }}>Portfolio</h1>
            <Popup
              trigger={
                <label htmlFor="portfolioInput"><Icon name='upload' size='huge' color='teal' style={{ cursor: 'pointer', marginBottom: 45 }} />
                </label>
              }
              content='Add image to your portfolio'
            />
          </>
        }
      </Container>
      <Image.Group style={{ marginTop: -30, textAlign: 'center' }} doubling='true' stackable='true' size="large">
        {usersPortfolio}
      </Image.Group>
    </>
  )
}

export default PortfolioUploads

// () => user.status === 'model' ? <CreateModel user={user} /> : <CreatePhotog user={user} />
