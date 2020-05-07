import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loginService from '../services/login'
import useForm from './customhooks/useForm';
import LoginPage from '../pages/LoginPage';
import validateLogin from './validateLogin'
import { UserContext } from './UserContext';



const USER_CREDENTIALS = { username: '', password: '' }

const LoginUseForm = () => {
  const [user, setUser] = useContext(UserContext)
  const { handleChange, handleSubmit, values, errors } = useForm(USER_CREDENTIALS, submit, validateLogin)


  async function submit() {
    const loginUser = await loginService.login(values)
    setUser(loginUser)
  }


  return (
    <>
      {user === null ?
        <LoginPage values={values} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} /> :
        <>
          <Redirect to='/' />
        </>
      }
    </>
  )
}

export default LoginUseForm