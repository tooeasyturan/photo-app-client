import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import UseLoginForm from './customhooks/UseForm';
import UseFormValidation from './customhooks/UseFormValidation'
import LoginPage from '../pages/LoginPage';


const LOGGED_IN_USER = JSON.parse(window.localStorage.getItem('loggedInUser'))
const USER_CREDENTIALS = { username: '', password: '' }
const LOGIN_VALIDATION = { usernameError: false, passwordError: false, matchError: false }

const LoginUseForm = () => {
  const [user, setUser] = useState(LOGGED_IN_USER)
  const [userCredentials, handleUserCredentials] = UseLoginForm(USER_CREDENTIALS)
  // const [validation, handleValidation] = UseFormValidation(LOGIN_VALIDATION)
  const [validation, setValidation] = useState(LOGIN_VALIDATION)


  const validate = () => {
    let { username, password } = userCredentials
    let { usernameError, passwordError } = validation

    // FOR READABILITY IS IT BETTER TO USE TERNARY OR IF/ELSE HERE??
    !username ? usernameError = true : usernameError = false
    !password ? passwordError = true : passwordError = false

    if (usernameError || passwordError) {
      setValidation({ ...validation, usernameError, passwordError })
      return false
    }
    return true

  }


  const handleLogin = async (e) => {
    e.preventDefault()

    const isValid = validate()
    if (isValid) {
      const loginUser = await loginService.login(userCredentials)
      setUser(loginUser)
    }
  }

  return (
    <>
      {user === null ?
        <LoginPage userCredentials={userCredentials} handleUserCredentials={handleUserCredentials} handleLogin={handleLogin} validation={validation} /> :
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