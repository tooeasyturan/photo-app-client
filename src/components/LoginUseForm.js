import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loginService from '../services/login'
import useForm from './customhooks/useForm';
import LoginPage from '../pages/LoginPage';
import validateLogin from './validateLogin'



const LOGGED_IN_USER = JSON.parse(window.localStorage.getItem('loggedInUser'))
const USER_CREDENTIALS = { username: '', password: '' }

const LoginUseForm = () => {
  const [user, setUser] = useState(LOGGED_IN_USER)
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