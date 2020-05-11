/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../src/services/profiles'
import ManageProfilePage from '../src/pages/ManageProfilePage'
import useFormHandling from '../src/components/customhooks/useFormHandling';

// Component for editing user with status 'photographer' after initial profile has been created. 

const EditPhotographer = ({ user, loggedInUser }) => {
  const profile = user.profile[0]

  const EDIT_PHOTOGRAPHER_OPTIONS = {
    country: profile.country,
    region: profile.region,
    description: profile.description,
    shootingStyle: profile.shootingStyle,
  }

  const { handleChange, handleLocation, handleSubmit, values } = useFormHandling(EDIT_PHOTOGRAPHER_OPTIONS, submit, validatePhotographer)

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