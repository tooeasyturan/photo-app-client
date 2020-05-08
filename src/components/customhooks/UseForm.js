import { useState, useEffect } from 'react'


const useForm = (formInputs, callback, validate) => {
  const [values, setValues] = useState(formInputs)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = (val, e) => {
    console.log(e.value)
    setValues({
      ...values,
      [e.name]: e.value
    })
    // }
  }

  const handleSelect = (val, e) => {
    console.log(e.target)
    setValues({
      ...values,
      [e.target.name]: e.target.value
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
    handleSelect,
    handleSubmit,
    values,
    errors
  }

}

export default useForm