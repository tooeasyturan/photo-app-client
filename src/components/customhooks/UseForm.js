import React, { useState } from 'react'

const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)
  console.log(values)


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