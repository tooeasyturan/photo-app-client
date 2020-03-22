import React, { useState, useEffect, useContext } from 'react'
import loginService from '../services/login'
import usersService from '../services/users'
import Notification from './Notification'
// import { Button, Form } from 'react-bootstrap'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
// import "../styles/Login.css"
import { UserContext } from './UserContext'




const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [matchError, setMatchError] = useState(false)
  const [formError, setFormError] = useState(false)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      usersService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setUsernameError(false)
    setPasswordError(false)
    setMatchError(false)
    // let error = false
    if (username === '' && password === '') {
      setUsernameError(true)
      setPasswordError(true)
      // error = true
      return
    }

    if (username === '') {
      setUsernameError(true)
      return
    }

    if (password === '') {
      setPasswordError(true)
      // error = true
      return
    }

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedTFPappUser', JSON.stringify(user))
      usersService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {



      if (error.response.status === 401) {
        setMatchError(true)
      }



      if (error) {
        setFormError(true)
        return
      } else {
        setFormError(false)
      }


    }
  }



  const loginForm = () => (

    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
      </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked style={{ width: 450 }}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
              name="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              error={usernameError}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              error={passwordError}
            />

            <Button color='teal' fluid size='large'>
              Login
          </Button>
          </Segment>
        </Form>
        {usernameError ?
          <Message
            error
            header="Please enter your username"
          /> : null}
        {passwordError ?
          <Message
            error
            header="Please enter your password"
          /> : null}
        {matchError ?
          <Message
            error
            header="Username and password do not match"
          /> : null}
      </Grid.Column>
    </Grid>





  )

  return (
    <>
      {/* <Notification message={errorMessage} /> */}
      {user === null ?
        loginForm() :
        <div>
          <h1>{user.username} logged in</h1>
          <Button className="primary" href={'/' + user.username}>My Profile</Button>
        </div>
      }

    </>

  )
}

export default Login