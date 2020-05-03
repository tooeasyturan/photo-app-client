/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import UseSignupForm from './customhooks/UseForm';
import axios from 'axios'

const USER_SIGNNUP_OBJECT = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  status: '',
  confirmPassword: ''
}

const SignupUseForm = () => {
  const [values, handleChange] = UseSignupForm(USER_SIGNNUP_OBJECT)
  console.log(values)
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleSubmit = async (e) => {
    try {
      await axios.post('http://localhost:3004/users', values)
      setIsSubmitted(true)
    } catch (error) {
      console.log(error)
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
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
              />
              <Form.Input fluid
                placeholder='Last name'
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Input fluid
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleChange}
            />
            <Form.Input fluid
              placeholder='Email'
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
            <Form.Input fluid
              placeholder='Password'
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
            />
            <Form.Input fluid
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
            />


            {/* <Form.Group inline >
              <label>I am a:</label>
              <Form.Field
                label='Model'
                control='input'
                type='radio'
                name='htmlRadios'
                value="model"
                onClick={({ target }) => setStatus(target.value)}
              />
              <Form.Field
                label='Photographer'
                control='input'
                type='radio'
                name='htmlRadios'
                value="photographer"
                onClick={({ target }) => setStatus(target.value)}
              />
            </Form.Group> */}


            <Button color='teal' fluid size='large'>
              Create Account
          </Button>
          </Segment>
        </Form>
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

export default SignupUseForm