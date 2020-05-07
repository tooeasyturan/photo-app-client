/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios'




const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [matchError, setMatchError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [statusError, setStatusError] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [errors, setErrors] = useState(false)

  const [errorsList, setErrorsList] = useState([])

  const [user, setUser] = useState(null)



  const handleSubmit = async (event) => {
    event.preventDefault()

    setFirstNameError(false)
    setLastNameError(false)
    setUsernameError(false)
    setEmailError(false)
    setPasswordError(false)
    setMatchError(false)
    setStatusError(false)
    setErrorsList([])
    setErrors(false)

    let errorList = []


    if (!firstName) {
      setFirstNameError(true)
      let firstNameErrorMsg = 'You must enter a first name'
      errorList.push(firstNameErrorMsg)
    }

    if (!lastName) {
      setLastNameError(true)
      let lastNameErrorMsg = 'You must enter a last name'
      errorList.push(lastNameErrorMsg)

    }

    if (!username) {
      setUsernameError(true)
      let usernameErrorMsg = 'You must enter a username'
      errorList.push(usernameErrorMsg)
    }

    if (!email) {
      setEmailError(true)
      let emailErrorMsg = 'You must enter an email'
      errorList.push(emailErrorMsg)
    }

    if (!password) {
      setPasswordError(true)
      let enterPasswordErrorMsg = 'You must enter a password'
      errorList.push(enterPasswordErrorMsg)
    }

    if (confirmPassword !== password) {
      console.log('passwords do not match')
      setMatchError(true)
      let passwordErrorMsg = 'Passwords do not match'
      errorList.push(passwordErrorMsg)
    }

    if (!status) {
      setStatusError(true)
      let statusErrorMsg = 'You must select a status'
      errorList.push(statusErrorMsg)
    }
    setErrorsList(errorList)
    console.log('error list', errorList)

    try {
      if (errorList.length === 0) {
        const user = await axios.post('http://localhost:3004/users', {
          firstName, lastName, username, email, status, password, date: new Date().toISOString()
        })
        console.log('USER', user)
        setIsSubmitted(true)
      }
    } catch (error) {
      const errors = await error.response.data.errors
      setErrors(errors)
      console.log('ERRORS', errors)
      const errorArray = errors.map(error => error.msg)
      console.log('error array', errorArray)
    }
  }



  const CreateAccount = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Create Your Account
      </Header>
        <Form onSubmit={handleSubmit} size="large" >
          <Segment style={{ width: 450 }}>
            <Form.Group widths='equal'>
              <Form.Input fluid
                placeholder='First name'
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
                error={firstNameError}
              />
              <Form.Input fluid
                placeholder='Last name'
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
                error={lastNameError}
              />
            </Form.Group>
            <Form.Input fluid
              placeholder='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              error={usernameError}
            />
            <Form.Input fluid
              placeholder='Email'
              type='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              error={emailError}
            />
            <Form.Input fluid
              placeholder='Password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              error={passwordError}
            />
            <Form.Input fluid
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              error={matchError}
            />


            <Form.Group inline >
              <label>I am a:</label>
              <Form.Field
                label='Model'
                control='input'
                type='radio'
                name='htmlRadios'
                value="model"
                onClick={({ target }) => setStatus(target.value)}
                error={statusError}
              />
              <Form.Field
                label='Photographer'
                control='input'
                type='radio'
                name='htmlRadios'
                value="photographer"
                onClick={({ target }) => setStatus(target.value)}
                error={statusError}
              />
            </Form.Group>


            <Button color='teal' fluid size='large'>
              Create Account
          </Button>
          </Segment>
        </Form>
        {/* {matchError ?
          <Message
            error
            header='Passwords do not match'
          /> : null} */}
        {firstNameError || lastNameError || usernameError || emailError || statusError || matchError || passwordError ?
          <Message
            error
            header='There were some errors with your submission'
            list={errorsList}
          /> : null}



      </Grid.Column>
    </Grid>
  )







  return (
    <div>
      {!isSubmitted ?
        CreateAccount() :
        <>
          <Redirect to='/login' />
        </>
      }
    </div>
  )


}

export default Signup