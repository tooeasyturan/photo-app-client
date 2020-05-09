/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import useForm from './customhooks/useForm';
import usersService from '../services/users'
import RegistrationPage from '../pages/RegistrationPage';
import validateRegistration from './validateRegistration'

const USER_REGISTER_OBJECT = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  status: '',
  confirmPassword: ''
}

const Register = () => {
  const { handleChange, handleStatus, handleSubmit, values, errors } = useForm(USER_REGISTER_OBJECT, submit, validateRegistration)

  async function submit() {
    await usersService.createUser(values)
  }


  return (
    <div>

      <RegistrationPage values={values} handleChange={handleChange} handleStatus={handleStatus} handleSubmit={handleSubmit} errors={errors} /> :
      {/* <>
        <Redirect to='/login' />
      </> */}

    </div>
  )
}

export default Register