import React, { useState } from 'react'
import axios from 'axios'

const Avatar = () => {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})

  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

  console.log('uploadedfile', uploadedFile)
  console.log('username', username)



  const onChangeHandler = (event) => {
    setFile(event.target.files[0])
    setFilename(event.target.files[0].name)
  }


  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', username)

    try {
      const res = await axios.post('http://localhost:3004/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })

      const { fileName, filePath } = res.data;
      console.log('res.data', res.data)

      setUploadedFile({ fileName, filePath })
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
    <div>
      <form onSubmit={onSubmit} className="col-md-4 mt-4">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChangeHandler} />
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block" />
      </form>
      {/* {uploadedFile ? <div className="row"> */}
      <div className="col-md-6 m-auto">
        <h3 className="text-center">{uploadedFile.fileName}</h3>
        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
      </div>
      {/* </div> : null} */}
    </div>
  )
}

export default Avatar