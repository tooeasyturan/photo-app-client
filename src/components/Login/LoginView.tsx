/** @format */

import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const GridStyles = { height: "100vh" };
const ColumnStyles = { maxWidth: 450 };
const SegmentStyles = { width: 450 };

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginErrors {
  usernameError: string;
  passwordError: string;
}

interface Props {
  values: LoginCredentials;
  errors: LoginErrors;
  handleChange: () => void;
  handleSubmit: () => void;
}

const LoginPage: React.FC<Props> = ({
  values,
  errors,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Grid textAlign='center' style={GridStyles} verticalAlign='middle'>
      <Grid.Column style={ColumnStyles}>
        <Header>Login</Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked style={SegmentStyles}>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              name='username'
              type='text'
              value={values.username}
              onChange={handleChange}
              error={errors.usernameError}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={values.password}
              name='password'
              onChange={handleChange}
              error={errors.passwordError}
            />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        {/* {errors.usernameError ?
          <Message
            error
            header="Please enter your username"
          /> : null}
        {errors.passwordError ?
          <Message
            error
            header="Please enter your password"
          /> : null} */}
        {/* {matchError ?
              <Message
                error
                header="Username and password do not match"
              /> : null} */}
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
