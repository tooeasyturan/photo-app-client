/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import UseSignupForm from './customhooks/UseForm';
import usersService from '../services/users'
import SignupPage from '../pages/SignupPage';

const USER_SIGNNUP_OBJECT = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  status: '',
  confirmPassword: ''
}

const SignupUseForm = () => {
  const [userSignupFields, handleUserSignupFields] = UseSignupForm(USER_SIGNNUP_OBJECT)
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleCreateUser = (e) => {
    e.preventDefault()
    try {
      usersService.createUser(userSignupFields)
      setIsSubmitted(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!isSubmitted ?
        <SignupPage userSignupFields={userSignupFields} handleUserSignupFields={handleUserSignupFields} handleCreateUser={handleCreateUser} /> :
        <>
          <Redirect to='/login' />
        </>
      }
    </div>
  )
}

export default SignupUseForm