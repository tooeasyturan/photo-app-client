import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import usersService from '../services/users'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import UseLoginForm from './customhooks/UseLoginForm';

const LoginUseForm = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('currentUser')))
  const [values, handleChange] = UseLoginForm({ username: '', password: '' })


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const logInUser = await loginService.login({
        username: values.username, password: values.password
      })
      window.localStorage.setItem('currentUser', JSON.stringify(logInUser))
      usersService.setToken(logInUser.token)
      setUser(logInUser)
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header>Login</Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked style={{ width: 450 }}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
            <Button color='teal' fluid size='large'>
              Login
          </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )

  return (
    <>
      {user === null ? loginForm() :
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