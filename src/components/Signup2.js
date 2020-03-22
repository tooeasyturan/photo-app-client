import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
// import '../styles/Signup.css'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'




const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const [user, setUser] = useState(null)

  console.log(firstName)


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await usersService.create({
        firstName, lastName, username, email, status, password, date: new Date().toISOString()
      })
      console.log(date)

      setUser(user)

      setFirstName('')
      setLastName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setStatus(null)
    } catch (exception) {
      console.log('error')
    }


  }


  const createAccount = () => (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              value={firstName}
              className=""
              placeholder="First Name"
              name="firstName"
              noValidate
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              value={lastName}
              className=""
              placeholder="Last Name"
              name="lastName"
              noValidate
              onChange={({ target }) => setLastName(target.value)} />
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              className=""
              placeholder="User Name"
              name="username"
              noValidate
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div className="username">
            I am a:
            {/* <label for="photographer"> */}
            <input
              // id="photographer"
              type="radio"
              name="status"
              value="photographer"
              onClick={({ target }) => setStatus(target.value)} />photographer
              {/* </label> */}
            <input
              type="radio"
              name="status"
              value="model"
              onClick={({ target }) => setStatus(target.value)} />Model
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              className=""
              placeholder="Email"
              name="email"
              noValidate
              onChange={({ target }) => setEmail(target.value)} />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              className=""
              placeholder="Password"
              name="password"
              noValidate
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  )

  const CreateAccount = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Create Your Account
      </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment style={{ width: 450 }}>
            <Form.Group widths='equal'>
              <Form.Input fluid
                placeholder='First name'
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
              <Form.Input fluid
                placeholder='Last name'
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </Form.Group>
            <Form.Input fluid
              placeholder='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Input fluid
              placeholder='Email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input fluid
              placeholder='Password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Input fluid
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />


            <Form.Group grouped >
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
            </Form.Group>


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
      {/* {createAccount()} */}
      {CreateAccount()}
    </div>
  )


}

export default Signup