import React from 'react'
import useForm from 'react-hook-form'
import '../styles/Signup.css'



const Signup = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example"));

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input name="firstName" ref={register} />
        <label>Last Name</label>
        <input name="lastName" ref={register} />
        <label>Email</label>
        <input
          name="email"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.email && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </div>
  )
}

export default Signup