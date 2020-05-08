/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../services/profiles'
import ManageProfilePage from '../pages/ManageProfilePage'
import useForm from './customhooks/useForm';
import PortfolioUploads from './PortfolioUploads'

// Component for editing user with status 'model' after initial profile has been created. 
const EditModel = ({ user, loggedInUser }) => {
  console.log('MODEL PROFILE', user)
  // const { profile } = user.profile[0]

  // const EDIT_MODEL_OPTIONS = {
  //   country: user.profile === undefined ? user.profile[0].country : '',
  //   region: user.profile === undefined ? user.profile[0].region : '',
  //   description: user.profile === undefined ? user.profile[0].description : '',
  //   shootingStyle: user.profile === undefined ? user.profile[0].shootingStyle : '',
  // }

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
      <PortfolioUploads />

    </div>
  )

}

export default EditModel