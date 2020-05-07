import { useState, useEffect } from 'react'


const useForm = (formInputs, callback, validate) => {
  const [values, setValues] = useState(formInputs)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    console.log(value)
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting === true) {
      callback()
    }
  }, [errors])

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }

}

export default useForm