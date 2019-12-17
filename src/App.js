import React, { useState, useEffect } from 'react'
import './App.css';
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import { BrowserRouter as Router, Route } from 'react-router-dom';



// let username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

// let username = ''


// let loggedUser = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
// if (loggedUser) {
//   username = loggedUser
// } else if (loggedUser === null) {
//   username = 'user'
// }

// console.log(username)

function App() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const username = JSON.parse(loggedUserJSON).username
      setUsername(username)
    } else {
      setUsername('user')
    }
  }, [])



  return (
    <Router>
      <div>

        <Route exact path="/" component={Navigation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path={`/${username}/profile`} component={Profile} />
        <Route exact path="/users" component={Users} />
        <Route exact path={`/${username}`} component={UserProfile} />

      </div>
    </Router>
  );
}

export default App;
