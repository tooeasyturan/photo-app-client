import { useState } from 'react'
// import uploadssService from '../../services/profiles'
import uploadsService from '../../services/uploads'


const useFetchImages = (user) => {
  const [images, setImages] = useState([])
  const [avatar, setAvatar] = useState([])

  const fetchImages = async () => {
    await uploadsService.getImages(`uploads/${user.username}`).then(pics => setImages(pics))
  }

  const fetchAvatar = async () => {
    await uploadsService.getImages(`uploads/${user.username}/avatar`).then(pics => setAvatar(pics[0]))
  }


  const handleChange = async (e) => {
    console.log(e)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', user.username)
    formData.append('folder', 'userimg')
    try {
      const upload = await uploadsService.uploadImage(formData, user.token)
      setImages([...images, upload.url])
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleChange,
    fetchImages,
    fetchAvatar,
    images,
    avatar
  }
}

export default useFetchImages