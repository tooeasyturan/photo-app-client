export default function validate(values) {
  let errors = {}

  if (!values.firstName) {
    errors.firstNameError = 'You must enter a first name'
  }

  if (!values.lastName) {
    errors.lastNameError = 'You must enter a last name'
  }

  if (!values.username) {
    errors.usernameError = 'You must enter a username'
  }

  if (!values.email) {
    errors.emailError = 'You must enter a valid email'
  }

  if (!values.password) {
    errors.passwordError = 'You must enter a password'
  } else if (values.password !== values.confirmPassword) {
    errors.matchError = 'Passwords do not match'
  }

  return errors
}