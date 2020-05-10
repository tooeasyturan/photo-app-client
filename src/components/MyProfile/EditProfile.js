/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import profilesService from '../../services/profiles'
import ManageProfilePage from './ManageProfilePage'
import useFormHandling from '../FormHandling/useFormHandling';
import { UserContext } from '../UserContext';


// Component for editing user with status 'photographer' after initial profile has been created. 

const EditProfile = () => {
  const [user, setUser] = useContext(UserContext)

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
      await profilesService.create(user, values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
  )

}

export default EditProfile