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
import PrivateRoute from "../PrivateRoute";

const Routes = () => {
  return (
    <>
      <Route path='/' component={Navigation} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/profiles' component={Profiles} />
      <Route exact path='/profiles/:username' component={Profile} />
      <PrivateRoute
        exact
        path={`/myprofile/:username`}
        component={MyProfile}
        name='josh'
      />
      <PrivateRoute exact path='/inbox' component={GetAllMessages} />
    </>
  );
};

export default Routes;
