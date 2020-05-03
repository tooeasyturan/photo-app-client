import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const GridStyles = { height: '100vh' }
const ColumnStyles = { maxWidth: 450 }
const SegmentStyles = { width: 450 }

const LoginPage = ({ values, handleChange, handleLogin }) => {
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
}

export default LoginPage