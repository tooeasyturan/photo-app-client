import React, { useState, useEffect } from 'react'
import { UserProvider } from './components/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'

import Signup from './components/Signup'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Users from './components/Users'
import GetUserProfile from './components/GetUserProfile'
import CreateModel from './components/CreateModel'
import CreatePhotog from './components/CreatePhotog'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'
import GetAllMessages from './components/GetAllMessages'
import LoginUseForm from './components/LoginUseForm';








function App() {
  const [user, setUser] = useState('')
  // Can't use UserContext here because App isn't wrapped by UserProvider
  window.user = user

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


  const modelProfile = () => {
    return (
      <>
        {!Array.isArray(user.profile) || !user.profile.length ? <CreateModel user={user} /> : <MyProfile user={user} />}
      </>
    )
  }

  const photogProfile = () => {
    return (
      <>
        {!Array.isArray(user.profile) || !user.profile.length ? <CreatePhotog user={user} /> : <MyProfile user={user} />}
      </>
    )
  }

  const profileOptions = () => {
    const { status } = user
    if (status === 'model') {
      return modelProfile()
    }
    return photogProfile()
  }


  return (
    <Router>
      <UserProvider>
        <>
          <Route path="/" component={Navigation} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/users" component={Users} />
          {/* <Route exact path={`/${user.username}`} component={() => <MyProfile user={user} />} /> */}
          <Route exact path={`/${user.username}`} component={profileOptions} />

          <Route exact path="/users/:username" component={GetUserProfile} />
          {/* <Route exact path="/createprofile" component={() => user.status === 'model' ? <CreateModel user={user} /> : <CreatePhotog user={user} />} /> */}
          <Route exact path="/inbox" component={GetAllMessages} />
          <Route exact path="/loginuseform" component={LoginUseForm} />
        </>
      </UserProvider>
    </Router>
  );
}

export default App;
