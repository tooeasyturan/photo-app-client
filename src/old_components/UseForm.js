import React, { useState } from 'react'


const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  // If initialValues.username || initialValues.passord is empty, return error?


  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    }
  ]

}

export default UseForm