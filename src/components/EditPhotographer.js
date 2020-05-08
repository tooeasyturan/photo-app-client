/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useForm from './customhooks/useForm';

// Component for editing user with status 'photographer' after initial profile has been created. 

const EditPhotographer = ({ user, loggedInUser }) => {
  const EDIT_PHOTOGRAPHER_OPTIONS = {
    country: user.profile[0].country,
    region: user.profile[0].region,
    description: user.profile[0].description,
    shootingStyle: user.profile[0].shootingStyle,
  }

  const { handleChange, handleLocation, handleSubmit, values } = useForm(EDIT_PHOTOGRAPHER_OPTIONS, submit, validatePhotographer)

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
      <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleLocation={handleLocation} />
    </div>
  )

}

export default EditPhotographer