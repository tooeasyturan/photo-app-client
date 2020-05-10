import { useState, useContext } from 'react'
import uploadsService from '../../services/uploads'


const useUploadImage = (user, images) => {
  const [uploads, setUploads] = useState(images)

  console.log('uploads', uploads)
  window.user = user


  const handleChange = async (e) => {
    console.log(e)
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', user.username)
    formData.append('folder', 'userimg')

    try {
      const upload = await uploadsService.uploadImage(formData, user.token)
      setUploads([...uploads, upload.url])
    } catch (error) {
      console.log(error)
    }
  }



  return {
    uploads,
    handleChange
  }
}

export default useUploadImage