import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loginService from '../services/login'
import useFormHandling from './customhooks/useFormHandling';
import LoginPage from '../pages/LoginPage';
import validateLogin from './validateLogin'
import { UserContext } from './UserContext';



const USER_CREDENTIALS = { username: '', password: '' }

const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const { handleChange, handleSubmit, values, errors } = useFormHandling(USER_CREDENTIALS, submit, validateLogin)


  async function submit() {
    const loginUser = await loginService.login(values)
    setUser(loginUser)
  }


  return (
    <>
      {user.username.length === 0 ?
        <LoginPage values={values} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} /> :
        <>
          <Redirect to='/' />
        </>
      }
    </>
  )
}

export default Login