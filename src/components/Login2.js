import React, { useState, useEffect, useContext } from 'react'
import loginService from '../services/login'
import usersService from '../services/users'
import Notification from './Notification'
import { Button } from 'react-bootstrap'
// import "../styles/Login.css"
import { UserContext } from './UserContext'




const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      usersService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedTFPappUser', JSON.stringify(user))
      usersService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const LoginForm = () => (

    // <div className="ui middle aligned center aligned grid">
    //   <div className="column">
    //     <h2 className="ui teal image header">
    //       {/* <img src="assets/images/logo.png" className="image"> */}
    //       <div className="content">
    //         Log-in to your account
    //   </div>
    //     </h2>
    //     <form className="ui large form">
    //       <div className="ui stacked segment">
    //         <div className="field">
    //           <div className="ui left icon input">
    //             <i className="user icon"></i>
    //             <input type="text"
    //               value={username}
    //               placeholder="Username"
    //               name="username"
    //               noValidate
    //               onChange={({ target }) => setUsername(target.value)}
    //             />          </div>
    //         </div>
    //         <div className="field">
    //           <div className="ui left icon input">
    //             <i className="lock icon"></i>
    //             <input type="password"
    //               value={password}
    //               placeholder="Password"
    //               name="password"
    //               noValidate
    //               onChange={({ target }) => setPassword(target.value)}
    //             />          </div>
    //         </div>
    //         <div className="ui fluid large teal submit button">Login</div>
    //       </div>

    //       <div className="ui error message"></div>

    //     </form>
    //     <div className="ui message">
    //       New to us? <a href="#">Sign Up</a>
    //     </div>
    //   </div>
    // </div>


    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Log-in to your account
      </div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div className="ui fluid large teal submit button">Login</div>
          </div>

          <div className="ui error message"></div>

        </form>

        <div className="ui message">
          New to us? <a href="#">Sign Up</a>
        </div>
      </div>
    </div>



  )

  return (
    <>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm /> :
        <div>
          <h1>{user.username} logged in</h1>
          <Button className="primary" href={'/' + user.username}>My Profile</Button>
        </div>
      }
    </>

  )
}

export default Login