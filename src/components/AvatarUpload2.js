import React, { useState, useEffect, useRef } from 'react'
import uploadsService from '../services/uploads'
import { Image, Button } from 'semantic-ui-react'
import axios from 'axios'

const AvatarUpload2 = ({ user }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [file, setFile] = useState(null)
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [avatar, setAvatar] = useState(user.avatar[0].avatar)
  const [preview, setPreview] = useState()



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedInUser(user)
      uploadsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])


  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username



  // const onChangeHandler = (event) => {
  //   console.log('triggered')
  //   setFile(event.target.files[0])
  //   setFilename(event.target.files[0].name)
  // }


  const onSelectFile = e => {
    console.log(e.target.files[0])
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple

    setFile(e.target.files[0])

  }



  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', username)
    formData.append('folder', 'userimg')

    try {
      const res = await axios.post('http://localhost:3004/uploads/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${loggedInUser.token}`
        },
      })

      const { fileName, filePath } = res.data;
      console.log('res.data', res.data)

      setUploadedFile({ fileName, filePath })
      setFilename('Choose File')
      console.log('filepath', filePath)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  const fileInput = useRef(null)

  return (



    <div>
      <form onSubmit={onSubmit} action='/uploads' method="post" encType="multipart/form-data">
        <div>
          <input
            type='file'
            id='fileInput'
            onChange={onSelectFile}
            style={{ display: 'none' }}
            ref={fileInput}
          />
          <label htmlFor='fileInput'>
            <img src={!file ? avatar : preview} alt='asdf' style={{ height: 800, width: 800 }} />
          </label>
        </div>
        <br></br>
        <button onClick={() => setFile(null)}>Reset</button>
        <button type="submit">Submit</button>
      </form>


    </div>




  )
}

export default AvatarUpload2