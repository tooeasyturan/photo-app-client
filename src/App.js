import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import Login from './components/Login'
import CreateProfile from './components/CreateProfile'
import CreateModel from './components/CreateModel'
import Users from './components/Users'
import MyProfile from './components/MyProfile'
import Avatar from './components/Avatar'
import GetUserProfile from './components/GetUserProfile'
import Cloudinary from './components/Cloudinary'
import AvatarCloud from './components/AvatarCloud'
import UserPortfolioCloud from './components/UserPortfolioCloud'
import Landing from './components/Landing'
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
  const [userLoggedIn, setUserLoggedIn] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    async function getUser() {
      await getLoggedInUser()
    }
    getUser()

  }, [])



  const getLoggedInUser = async () => {
    try {
      const loggedUserJSON = await window.localStorage.getItem('loggedTFPappUser')
      if (loggedUserJSON) {
        const username = JSON.parse(loggedUserJSON).username
        console.log('username', username)
        setUsername(username)
        let user = await axios.get(`http://localhost:3004/users/${username}`)
        user = await user.data
        setUserLoggedIn(user)
        console.log('user data', user)
        const status = await user[0].status
        setStatus(status)
        console.log('user status', status)
      } else {
        setUsername('user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getStatus = async () => {
    try {
      console.log('status username', username)
      let user = await axios.get(`http://localhost:3004/users/test6`)
      user = await user.data
      const status = await user[0].status
      setStatus(status)
      console.log('status', status)
    } catch (error) {
      console.log(error)
    }
  }





  return (
    <Router>
      <div>

        {/* <Route exact path="/" component={Navigation} /> */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path={`/${username}/profile`} component={
          () => status === "photographer" ? <CreateProfile /> : <CreateModel />} />
        <Route exact path="/users" component={Users} />
        <Route exact path={`/${username}`} component={MyProfile} />
        <Route exact path="/avatar" component={Avatar} />
        <Route exact path="/users/:username" component={GetUserProfile} />
        <Route exact path="/cloudinary" component={Cloudinary} />
        {/* <Route exact path="/cloudinary/:username" component={UserPortfolioCloud} /> */}
        <Route exact path="/cloudinary/avatar" component={AvatarCloud} />


      </div>
    </Router>
  );
}

export default App;
