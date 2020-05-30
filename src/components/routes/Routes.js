/** @format */

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../layout/Navigation";
import Landing from "../layout/Landing";
import Login from "../login/Login";
import Register from "../register/Register";
import MyProfile from "../my-profile/MyProfile";
import GetAllMessages from "../messaging/GetAllMessages";
import Profile from "../profiles/Profile";
import Profiles from "../profiles/Profiles.tsx";

const Routes = () => {
  // const [loggedInUser, setLoggedInUser] = useState(
  //   JSON.parse(window.localStorage.getItem("loggedInUser")) || ""
  // );

  const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const username = loggedInUser ? loggedInUser.username : "";

  return (
    <>
      <Route path='/' component={Navigation} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path={`/${username}`} component={MyProfile} />
      <Route exact path='/profiles' component={Profiles} />
      <Route exact path='/profiles/:username' component={Profile} />
      <Route exact path='/inbox' component={GetAllMessages} />
    </>
  );
};

export default Routes;
