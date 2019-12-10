import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//let username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username

function App() {

  return (
    <Router>
      <div>

        <Route exact path="/" component={Navigation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user/profile" component={Profile} />

      </div>
    </Router>
  );
}

export default App;
