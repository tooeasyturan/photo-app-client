import React, { useState, useEffect, useContext } from 'react'
import { Image, Icon, Popup, Button, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { UserContext } from './UserContext'


const PortfolioUploads2 = () => {

  // SHOULD I KEEP ALL LOGIC FOR UPLOADING AND DISPLAYING PORTFOLIO PICS IN ONE COMPONENT OR SEPARATE? NEED TO KEEP IN MIND STATE CHANGE FOR UPLOADS

  // const [user, setUser] = useState(null)
  const [user, setUser] = useContext(UserContext)
  // const [file, setFile] = useState({})
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [uploads, setUploads] = useState([])

  const [isLoading, setIsLoading] = useState(false)


  console.log("CLOUDINARY USER!!!", user)


  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     uploadsService.setToken(user.token)
  //   }
  // }, [])


  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username



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
          'Authorization': `Bearer ${user.token}`
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

  // console.log('file to submit', file)
  // console.log('file name to submit', filename)




  // const onSubmit = async (event) => {
  //   event.preventDefault()
  //   console.log('file on submit', file)

  //   setIsLoading(true)
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   formData.append('username', username)
  //   formData.append('folder', 'userimg')

  //   try {
  //     console.log('sending file')
  //     const res = await axios.post('http://localhost:3004/uploads', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': `Bearer ${user.token}`
  //       },
  //     })
  //     console.log('file sent')

  //     const { fileName, filePath } = res.data;
  //     console.log('res.data', res.data)
  //     setUploadedFile({ fileName, filePath })
  //     setFilename('Choose File')
  //     console.log('filepath', filePath)
  //     const result = await axios.get(`http://localhost:3004/uploads/${username}`)
  //     setUploads(result.data)
  //     setIsLoading(false)
  //     // console.log('CLOUDINARY UPLOADS', result.data)
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       console.log('There was a problem with the server')
  //     } else {
  //       console.log(err.response.data.msg)
  //     }
  //   }
  // }

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

    const token = user.token
    const config = {
      'Content-Type': 'application/json',
      headers: { Authorization: 'bearer ' + token },
      data: { upload }
    }

    if (window.confirm("Are you sure you want to delete this image")) {

      console.log('token', token)
      const response = await axios.delete('http://localhost:3004/uploads', config)
      const uploads = await axios.get(`http://localhost:3004/uploads/${username}`)
      setUploads(uploads.data)
      console.log(response)
    } else {
      console.log('image not deleted')
    }
  }

  const usersPortfolio = uploads.map(upload => {
    return <Image key={upload}
      src={upload}
      wrapped ui={true}
      alt=""
      rounded
      onClick={() => handleRemoveImage(upload)}
    />
  })




  return (
    <>
      <div style={{ marginTop: 100, marginLeft: 100 }}>
        {/* <form onSubmit={onSubmit} actions='/uploads' method="post" encType="multipart/form-data"> */}
        <input name="file" type="file" className="custom-file-input" id="fileInput" onChange={onChangeHandler} style={{ display: 'none' }} />
        {/* <label htmlFor="fileInput">{filename}</label> */}
        {isLoading ? <Loader active inline /> :

          <Popup
            trigger={
              <label htmlFor="fileInput"><Icon name='add' size='huge' color='teal' style={{ cursor: 'pointer' }} /></label>
            }
            content='Add image to your portfolio'
          />


        }
        {/* <Button size='medium' type='submit'>Upload</Button> */}
        {/* </form> */}
      </div>
      <h1>Pics</h1>
      <Image.Group className="doubling stackable" size="large">
        {usersPortfolio}

      </Image.Group>
      {/* <Icon name='camera' size='massive' /> */}



    </>
  )
}

export default PortfolioUploads2