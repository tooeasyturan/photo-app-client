/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useFormHandling from './customhooks/useFormHandling'
import { UserContext } from './UserContext';


// Component for editing user with status 'model' after initial profile has been created. 


const CREATE_PROFILE_OPTIONS = {
  country: '',
  region: '',
  description: '',
  shootingStyle: []
}

const CreateProfile = () => {
  const [user, setUser] = useContext(UserContext)
  const { handleChange, handleSubmit, values } = useFormHandling(CREATE_PROFILE_OPTIONS, submit, validateModel)

  function validateModel() {
    let errors = {}
    return errors
  }

  async function submit() {
    try {
      await profilesService.create(user, values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
  )

}

export default CreateProfile