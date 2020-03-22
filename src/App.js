import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './App.css';
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import Signup2 from './components/Signup2'

import Login2 from './components/Login2'
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
import MyProfileTest from './components/MyProfileTest'
import { UserProvider } from './components/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContext } from './components/UserContext'
import usersService from './services/users'






function App() {
  const [user, setUser] = useState('')


  useEffect(() => {
    async function getUser() {
      await getUserProfile()
    }
    getUser()

  }, [])

  const getUserProfile = async () => {
    try {
      const loggedInUser = await JSON.parse(window.localStorage.getItem('loggedTFPappUser'))
      console.log('LOGGED IN USER TOKEN', loggedInUser)
      if (loggedInUser) {
        let result = await axios.get('http://localhost:3004/auth', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `bearer ${loggedInUser.token}`
          }
        }
        )
        setUser(result.data)
      }
    }
    catch (error) {
      console.log(error)
    }

  }






  return (
    <Router>
      <UserProvider>
        <div>
          {/* <Route exact path="/" component={Navigation} /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup2" component={Signup2} />
          <Route exact path="/login2" component={Login2} />
          <Route exact path={`/${user.username}/profile`} component={
            () => user.status === "photographer" ? <CreateProfile /> : <CreateModel />} />
          <Route exact path="/users" component={Users} />
          <Route exact path={`/${user.username}`} component={MyProfileTest} />
          <Route exact path="/avatar" component={Avatar} />
          <Route exact path="/users/:username" component={GetUserProfile} />
          <Route exact path="/cloudinary" component={Cloudinary} />
          {/* <Route exact path="/cloudinary/:username" component={UserPortfolioCloud} /> */}
          <Route exact path="/cloudinary/avatar" component={AvatarCloud} />
          {/* <Route exact path={`/test/${username}`} component={MyProfileTest} /> */}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
