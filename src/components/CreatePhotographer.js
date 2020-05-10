/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useFormHandling from './customhooks/useFormHandling'


// Component for creating user profile if status is 'photographer'
const CREATE_PHOTOGRAPHER_OPTIONS = {
  country: '',
  region: '',
  description: '',
  shootingStyle: [],
}

const CreatePhotographer = ({ user, loggedInUser }) => {
  const { handleChange, handleSubmit, values } = useFormHandling(CREATE_PHOTOGRAPHER_OPTIONS, submit, validatePhotographer)

  function validatePhotographer() {
    let errors = {}
    return errors
  }

  async function submit() {
    try {
      await profilesService.create(loggedInUser, values)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreatePhotographer