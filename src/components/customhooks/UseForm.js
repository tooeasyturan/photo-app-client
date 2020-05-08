import { useState, useEffect } from 'react'


const useForm = (formInputs, callback, validate) => {
  const [values, setValues] = useState(formInputs)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = (val, e) => {
    if (e.target) {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
    } else {
      setValues({
        ...values,
        [e.name]: e.value
      })
    }
  }

  const handleStatus = (e) => {
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
    handleStatus,
    handleSubmit,
    values,
    errors
  }

}

export default useForm