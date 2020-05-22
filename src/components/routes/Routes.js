/** @format */

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { UserProvider } from "../UserContext";
import Navigation from "../layout/Navigation";
import Landing from "../layout/Landing";
import Login from "../login/Login";

import Register from "../register/Register";
import MyProfile from "../my-profile/MyProfile";
import GetAllMessages from "../messaging/GetAllMessages";
import FullProfile from "../profiles/FullProfile";
import ProfileGallery from "../profiles/ProfileGallery";
import Profile from "../profiles/Profile";

const Routes = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedInUser")) || ""
  );

  // Move error boundary and userprovider to app.js
  return (
    <Router>
      <Route path='/' component={Navigation} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path={`/${loggedInUser.username}`} component={MyProfile} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/profile/:username' component={Profile} />
      <Route exact path='/inbox' component={GetAllMessages} />
    </Router>
  );
};

export default Routes;
