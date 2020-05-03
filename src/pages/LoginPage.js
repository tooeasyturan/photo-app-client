import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const GridStyles = { height: '100vh' }
const ColumnStyles = { maxWidth: 450 }
const SegmentStyles = { width: 450 }

const LoginPage = ({ userCredentials, handleUserCredentials, handleLogin }) => {
  return (
    <Grid textAlign='center' style={GridStyles} verticalAlign='middle'>
      <Grid.Column style={ColumnStyles}>
        <Header>Login</Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked style={SegmentStyles}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
              name="username"
              type="text"
              value={userCredentials.username}
              onChange={handleUserCredentials}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type="password"
              value={userCredentials.password}
              name="password"
              onChange={handleUserCredentials}
            />
            <Button color='teal' fluid size='large'>
              Login
        </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage