import React from 'react'
import useForm from 'react-hook-form'
import '../styles/Signup.css'



const Signup = () => {
  const handleSubmit = () => {

  }

  const handleChange = () => {

  }


  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className=""
              placeholder="First Name"
              name="firstName"
              noValidate
              onChange={handleChange} />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className=""
              placeholder="Last Name"
              name="lastName"
              noValidate
              onChange={handleChange} />
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className=""
              placeholder="User Name"
              name="username"
              noValidate
              onChange={handleChange} />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className=""
              placeholder="Email"
              name="email"
              noValidate
              onChange={handleChange} />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className=""
              placeholder="Password"
              name="password"
              noValidate
              onChange={handleChange} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup