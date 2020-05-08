/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useForm from './customhooks/useForm';



// Component for editing user with status 'model' after initial profile has been created. 


const EditModel = ({ user, loggedInUser }) => {
  const EDIT_MODEL_OPTIONS = {
    country: user.profile[0].country || '',
    region: user.profile[0].region || '',
    description: user.profile[0].description || '',
    shootingStyle: user.profile[0].shootingStyle || '',
  }

  const { handleChange, handleLocation, handleSubmit, values } = useForm(EDIT_MODEL_OPTIONS, submit, validateModel)

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
      <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleLocation={handleLocation} />
    </div>
  )

}

export default EditModel