import React, { useState, useEffect } from 'react'
import uploadsService from '../services/uploads'
import axios from 'axios'

const AvatarUpload = () => {
  const [user, setUser] = useState(null)
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      uploadsService.setToken(user.token)
    }
  }, [])


  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username


  console.log(file)


  const onChangeHandler = (event) => {
    setFile(event.target.files[0])
    setFilename(event.target.files[0].name)
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
          'Authorization': `Bearer ${user.token}`
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

  return (

    <div style={{ marginTop: 100 }}>
      <form onSubmit={onSubmit} action='/uploads' method="post" className="col-md-4 mt-4" encType="multipart/form-data">
        <div className="custom-file">
          <input name="file" type="file" className="custom-file-input" id="customFile" onChange={onChangeHandler} />
          <label className="custom-file-label" htmlFor="image">{filename}</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>


  )
}

export default AvatarUpload