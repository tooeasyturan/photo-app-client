import React, { useState, useEffect } from 'react'
import './App.css';
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import Login from './components/Login'
import CreateProfile from './components/CreateProfile'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import Avatar from './components/Avatar'
// import GetUserProfile from './components/GetUserProfile'
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
        <Route exact path={`/${username}/profile`} component={CreateProfile} />
        <Route exact path="/users" component={Users} />
        <Route exact path={`/${username}`} component={UserProfile} />
        <Route exact path="/avatar" component={Avatar} />


      </div>
    </Router>
  );
}

export default App;
