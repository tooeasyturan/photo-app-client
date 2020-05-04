import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const GridStyles = { height: '100vh' }
const ColumnStyles = { maxWidth: 450 }

const SignupPage = ({ userSignupFields, handleUserSignupFields, handleCreateUser }) => {
  return (
    <Grid textAlign='center' style={GridStyles} verticalAlign='middle'>
      <Grid.Column style={ColumnStyles}>
        <Header as='h2' color='teal' textAlign='center'>
          Create Your Account
      </Header>
        <Form onSubmit={handleCreateUser} size="large" >
          <Segment style={{ width: 450 }}>
            <Form.Group widths='equal'>
              <Form.Input fluid
                placeholder='First name'
                name='firstName'
                value={userSignupFields.firstName}
                onChange={handleUserSignupFields}
              />
              <Form.Input fluid
                placeholder='Last name'
                name='lastName'
                value={userSignupFields.lastName}
                onChange={handleUserSignupFields}
              />
            </Form.Group>
            <Form.Input fluid
              placeholder='Username'
              name='username'
              value={userSignupFields.username}
              onChange={handleUserSignupFields}
            />
            <Form.Input fluid
              placeholder='Email'
              type='email'
              name='email'
              value={userSignupFields.email}
              onChange={handleUserSignupFields}
            />
            <Form.Input fluid
              placeholder='Password'
              type='password'
              name='password'
              value={userSignupFields.password}
              onChange={handleUserSignupFields}
            />
            <Form.Input fluid
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              value={userSignupFields.confirmPassword}
              onChange={handleUserSignupFields}
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
}

export default SignupPage