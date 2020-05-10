import React, { useState, useEffect, useContext } from 'react'
// import uploadssService from '../../services/profiles'
import uploadsService from '../../services/uploads'
import { UserContext } from '../UserContext';


const useFetchImages = (user) => {
  // const [user, setUser] = useContext(UserContext)
  const [images, setImages] = useState([])
  const [avatar, setAvatar] = useState([])

  const fetchImages = async () => {
    console.log('fetching images...')
    await uploadsService.getImages(`uploads/${user.username}`).then(pics => setImages(pics))
  }

  const fetchAvatar = async () => {
    await uploadsService.getImages(`uploads/${user.username}/avatar`).then(pics => setAvatar(pics[0]))
  }

  return {
    fetchImages,
    fetchAvatar,
    images,
    avatar
  }
}

export default useFetchImages