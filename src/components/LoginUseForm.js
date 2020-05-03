import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import UseLoginForm from './customhooks/UseLoginForm';
import LoginPage from '../pages/LoginPage';

const CURRENT_USER = JSON.parse(window.localStorage.getItem('currentUser'))

const LoginUseForm = () => {
  const [user, setUser] = useState(CURRENT_USER)
  const [values, handleChange] = UseLoginForm({ username: '', password: '' })


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const logInUser = await loginService.login(values)
      setUser(logInUser)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user === null ?
        <LoginPage values={values} handleChange={handleChange} handleLogin={handleLogin} /> :
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