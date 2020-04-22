/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import uploadsService from '../services/uploads'
import { Image, Button, Popup, Loader } from 'semantic-ui-react'
import axios from 'axios'

const AvatarUpload = ({ user }) => {
  console.log('avatar user', user)
  window.avatarUser = user



  const [loggedInUser, setLoggedInUser] = useState(null)
  const [file, setFile] = useState(null)
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [avatar, setAvatar] = useState([])
  const [preview, setPreview] = useState()
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedInUser(user)
      uploadsService.setToken(user.token)
    }

    if (!Array.isArray(user.avatar) || !user.avatar.length) {
      setAvatar(null)
    } else (
      setAvatar(user.avatar[0].avatar)
    )
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




  const onSelectFile = e => {
    console.log(e.target.files[0])
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple

    setFile(e.target.files[0])
    setIsUpdated(false)
  }



  const onSubmit = async (event) => {
    setIsLoading(true)
    console.log(' avatar submit in progess')
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', loggedInUser.username)
    formData.append('folder', 'userimg')

    try {
      const res = await axios.post('http://localhost:3004/uploads/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${loggedInUser.token}`
        },
      })

      const { fileName, filePath } = res.data;
      console.log('res.data', res.data.avatar)

      setUploadedFile({ fileName, filePath })
      setAvatar(res.data.avatar)
      setFilename('Choose File')
      console.log('filepath', filePath)
      console.log('File after submit', file)
      setIsUpdated(true)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }


  return (

    <>
      <div>
        <input
          type='file'
          id='avatarInput'
          onChange={onSelectFile}
          style={{ display: 'none' }}
        />
        <Popup trigger={
          <label htmlFor='avatarInput'>
            {!avatar && !preview ? <Image src={'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'} alt='asdf' size='medium' rounded centered style={{ cursor: 'pointer' }} /> :
              <Image src={!file ? avatar : preview} alt='asdf' size='huge' rounded centered style={{ cursor: 'pointer' }} />
            }
          </label>
        } >
          <Popup.Header>Click image to change avatar</Popup.Header>
        </Popup>
      </div>
      <br></br>
      {/* <button onClick={() => setFile(null)}>Reset</button> */}
      {file && isUpdated === false ?
        <Button style={isLoading ? { background: 'none' } : { background: 'red' }}
          fluid size='medium' type='submit' onClick={onSubmit}>{isLoading === true ? <Loader incline active /> : 'Confirm avatar change'}</Button> : null}
    </>



  )
}

export default AvatarUpload