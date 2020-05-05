import React, { useState } from 'react'


const UseFormValidation = (initialValues) => {
  // const [usernameError, setUsernameError] = useState(false)
  // const [passwordError, setPasswordError] = useState(false)
  const [errors, setErrors] = useState(initialValues)

  return [
    errors,
    e => {
      setErrors({
        ...errors,
        [e.target.name + 'Error']: e.target.value
      })
    }
  ]

}

export default UseFormValidation 