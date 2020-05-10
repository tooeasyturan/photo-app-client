/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useFormHandling from './customhooks/useFormHandling';

// Component for editing user with status 'model' after initial profile has been created. 
const EditModel = ({ user, loggedInUser }) => {
  const profile = user.profile[0]
  const EDIT_MODEL_OPTIONS = {
    country: profile.country,
    region: profile.region,
    description: profile.description,
    shootingStyle: profile.shootingStyle,
  }

  const { handleChange, handleSubmit, values } = useFormHandling(EDIT_MODEL_OPTIONS, submit, validateModel)

  function validateModel() {
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
      <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  )

}

export default EditModel