import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import Navigation from './components/Navigation'
import SemanticNav from './components/SemanticNav'

import Users from './components/Users'
import GetUserProfile from './components/GetUserProfile'

import CreateModel2 from './old_components/CreateModel2'
import AvatarUpload2 from './old_components/AvatarUpload2'

import CreateModel from './components/CreateModel'
import CreatePhotog from './components/CreatePhotog'

import Landing from './components/Landing'
import MyProfile from './components/MyProfile'

import GetAllMessages from './components/GetAllMessages'
import MessageTheme from './components/MessageTheme'

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
          <Route path="/" component={SemanticNav} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path={`/${user.username}/profile`} component={
            () => user.status === "photographer" ? <CreatePhotog /> : <CreateModel />} /> */}
          <Route exact path="/users" component={Users} />
          {/* <Route exact path={`/${user.username}`} component={MyProfile} /> */}
          <Route exact path={`/${user.username}`} component={() => <MyProfile user={user} />} />

          <Route exact path="/users/:username" component={GetUserProfile} />
          {/* <Route exact path="/uploads" component={PortfolioUploads} /> */}
          {/* <Route exact path="/uploads2" component={PortfolioUploads2} /> */}
          <Route exact path="/createmodel2" component={CreateModel2} />
          <Route exact path="/createprofile" component={() => user.status === 'model' ? <CreateModel user={user} /> : <CreatePhotog user={user} />} />
          {/* <Route exact path="/cloudinary/:username" component={UserPortfolioCloud} /> */}
          <Route exact path="/uploads/avatar" component={AvatarUpload2} />
          <Route exact path="/inbox" component={GetAllMessages} />
          <Route exact path="/messagetheme" component={MessageTheme} />
          {/* <Route exact path="/uploads/avatar2" component={() => <AvatarUpload2 user={user} />} /> */}

          {/* <Route exact path={`/test/${username}`} component={MyProfileTest} /> */}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
