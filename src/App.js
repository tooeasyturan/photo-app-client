import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import CreatePhotog from './components/CreatePhotog'
import CreateModel from './components/CreateModel'
import CreateModel2 from './components/CreateModel2'

import Users from './components/Users'
import GetUserProfile from './components/GetUserProfile'
import PortfolioUploads from './components/PortfolioUploads'
import AvatarUpload from './components/AvatarUpload'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'
import MyProfile2 from './components/MyProfile2'

import { UserProvider } from './components/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContext } from './components/UserContext'






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

  console.log('app user', user)





  return (
    <Router>
      <UserProvider>
        <div>
          {/* <Route exact path="/" component={Navigation} /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path={`/${user.username}/profile`} component={
            () => user.status === "photographer" ? <CreatePhotog /> : <CreateModel2 user={user} />} />
          <Route exact path="/users" component={Users} />
          {/* <Route exact path={`/${user.username}`} component={MyProfile} /> */}
          <Route exact path={`/${user.username}`} component={() => <MyProfile2 user={user} />} />

          <Route exact path="/users/:username" component={GetUserProfile} />
          <Route exact path="/uploads" component={PortfolioUploads} />
          <Route exact path="/createmodel2" component={CreateModel2} />
          {/* <Route exact path="/cloudinary/:username" component={UserPortfolioCloud} /> */}
          <Route exact path="/uploads/avatar" component={AvatarUpload} />
          {/* <Route exact path={`/test/${username}`} component={MyProfileTest} /> */}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
