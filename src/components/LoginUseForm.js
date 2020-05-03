import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import UseLoginForm from './customhooks/UseForm';
import LoginPage from '../pages/LoginPage';

const CURRENT_USER = JSON.parse(window.localStorage.getItem('currentUser'))

const LoginUseForm = () => {
  const [user, setUser] = useState(CURRENT_USER)
  const [userCredentials, handleUserCredentials] = UseLoginForm({ username: '', password: '' })


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loginUser = await loginService.login(userCredentials)
      setUser(loginUser)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user === null ?
        <LoginPage userCredentials={userCredentials} handleUserCredentials={handleUserCredentials} handleLogin={handleLogin} /> :
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