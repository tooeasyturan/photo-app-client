/** @format */

import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { ChangeType, CustomFormType } from "../custom-hooks/useFormHandling";

const GridStyles = { height: "100vh" };
const ColumnStyles = { maxWidth: 450 };

interface RegistrationFields {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegistrationErrors {
  firstNameError?: string;
  lastNameError?: string;
  usernameError?: string;
  emailError?: string;
  passwordError?: string;
  matchError?: string;
}

// extend custom hook type here
// interface RegistrationProps extends CustomFormType {
//   values: RegistrationFields;
//   errors: RegistrationErrors;

// }

// const weirdTypedObject1 = {
//   "string key": 37;
//   "key 2": "potato"
// };

// const weirdTypedObject2: weirdObjectType = {
//   "stringkey": 65,
//   "key 2": "ice cream",
//   "object key": {
//     "sub object 1": 1057
//   },
//   1: 65
// };

// Type weirdObjectType = {
//   [key: string]: string | number | boolean | {
//     [key: string]: (string|number)
//   },

// }

const RegisterView = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  handleStatus,
}: CustomFormType) => {
  return (
    <Grid textAlign='center' style={GridStyles} verticalAlign='middle'>
      <Grid.Column style={ColumnStyles}>
        <Header as='h2' color='teal' textAlign='center'>
          Create Your Account
        </Header>
        <Form onSubmit={handleSubmit} size='large'>
          <Segment style={{ width: 450 }}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                placeholder='First name'
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstNameError}
              />
              <Form.Input
                fluid
                placeholder='Last name'
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastNameError}
              />
            </Form.Group>
            <Form.Input
              fluid
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleChange}
              error={errors.usernameError}
            />
            <Form.Input
              fluid
              placeholder='Email'
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              error={errors.emailError}
            />
            <Form.Input
              fluid
              placeholder='Password'
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              error={errors.passwordError}
            />
            <Form.Input
              fluid
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.matchError}
            />

            <Form.Group inline>
              <label>I am a:</label>
              <Form.Field
                label='Model'
                control='input'
                type='radio'
                name='status'
                value='model'
                onClick={handleStatus}
              />
              <Form.Field
                label='Photographer'
                control='input'
                type='radio'
                name='status'
                value='photographer'
                onClick={handleStatus}
              />
            </Form.Group>

            <Button color='teal' fluid size='large'>
              Create Account
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterView;
