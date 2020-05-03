/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import UseSignupForm from './customhooks/UseForm';
import axios from 'axios'
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


  const handleCreateUser = async (e) => {
    try {
      await axios.post('http://localhost:3004/users', userSignupFields)
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