export default function validate(values) {
  let errors = {}

  if (!values.username) {
    errors.usernameError = 'Please enter your username'
  }

  if (!values.password) {
    errors.passwordError = 'Please enter your password'
  }

  return errors
}