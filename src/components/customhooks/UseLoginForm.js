import React, { useState } from 'react'

const UseLoginForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)


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

export default UseLoginForm