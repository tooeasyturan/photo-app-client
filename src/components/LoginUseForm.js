import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import useForm2 from './customhooks/useForm2';
import LoginPage from '../pages/LoginPage';
import validateLogin from './validateLogin'



const LOGGED_IN_USER = JSON.parse(window.localStorage.getItem('loggedInUser'))
const USER_CREDENTIALS = { username: '', password: '' }

const LoginUseForm = () => {
  const [user, setUser] = useState(LOGGED_IN_USER)
  const { handleChange, handleSubmit, values, errors } = useForm2(USER_CREDENTIALS, submit, validateLogin)


  async function submit() {
    const loginUser = await loginService.login(values)
    setUser(loginUser)
  }


  return (
    <>
      {user === null ?
        <LoginPage values={values} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} /> :
        <div style={{ marginTop: 100, textAlign: 'center' }}>
          <h1>
            {`${user.username} logged in`}
          </h1>
        </div>
      }
    </>
  )
}

export default LoginUseForm