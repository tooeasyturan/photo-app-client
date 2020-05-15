import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { UserProvider } from "../UserContext";
import Navigation from "../layout/Navigation";
import Landing from "../layout/Landing";
import Login from "../login/Login";

import Register from "../register/Register";
import MyProfile from "../my-profile/MyProfile";
import GetAllMessages from "../GetAllMessages";
import FullProfile from "../profiles/FullProfile";
import ShortProfile from "../profiles/ShortProfile";

const Routes = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedInUser")) || ""
  );
  return (
    <>
      <Router>
        <ErrorBoundary>
          <UserProvider>
            <Route path="/" component={Navigation} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path={`/${loggedInUser.username}`}
              component={MyProfile}
            />
            <Route exact path="/profile" component={ShortProfile} />
            <Route exact path="/profile/:username" component={FullProfile} />
            <Route exact path="/inbox" component={GetAllMessages} />
          </UserProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
};

export default Routes;
