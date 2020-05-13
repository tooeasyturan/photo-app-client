import React, { useState } from 'react'
import { UserProvider } from './components/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import Users from './components/Users'
import Landing from './components/Landing'
import GetAllMessages from './components/GetAllMessages'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MyProfile from './components/MyProfile/MyProfile'
import GetFullProfle from './components/ExploreProfiles/GetFullProfile'
import GetShortProfile from './components/ExploreProfiles/GetShortProfile'
import ErrorBoundary from './components/ErrorBoundary'
import { ErrorBoundaryProvider } from './components/ErrorBoundaryContext'
import LoginPage from './components/Login/LoginPage'




function App() {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUser')) || '')

  return (
    <Router>
      <UserProvider>
        <ErrorBoundary>
          <Route path="/" component={Navigation} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/users" component={Users} />
          <Route exact path={`/${user.username}`} component={MyProfile} />
          <Route exact path="/users/:username" component={GetFullProfle} />
          <Route exact path="/inbox" component={GetAllMessages} />
          <Route exact path="/profiles" component={GetShortProfile} />
        </ErrorBoundary>
      </UserProvider>
    </Router>
  );
}

export default App;
