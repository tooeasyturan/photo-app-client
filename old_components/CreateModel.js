/* eslint-disable no-unused-vars */
import React from 'react'
import profilesService from '../src/services/profiles'
import ManageProfilePage from '../src/pages/ManageProfilePage'
import useFormHandling from '../src/components/customhooks/useFormHandling'

// Component for editing user with status 'model' after initial profile has been created. 


const CREATE_MODEL_OPTIONS = {
  country: '',
  region: '',
  description: '',
  shootingStyle: []
}

const CreateModel = ({ user, loggedInUser }) => {
  const { handleChange, handleSubmit, values } = useFormHandling(CREATE_MODEL_OPTIONS, submit, validateModel)

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
      <ManageProfilePage user={user} values={values} handleChange={handleChange} handleSubmit={handleSubmit}
      />
    </div>
  )

}

export default CreateModel