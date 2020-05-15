import React, { useState, Fragment } from "react";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Users from "./components/Users";
import Landing from "./components/layout/Landing";
import GetAllMessages from "./components/GetAllMessages";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import MyProfile from "./components/my-profile/MyProfile";
import GetFullProfle from "./components/profiles/FullProfile";
import GetShortProfile from "./components/profiles/ShortProfile";
import ErrorBoundary from "./components/ErrorBoundary";
import { ErrorBoundaryProvider } from "./components/ErrorBoundaryContext";
import LoginPage from "./components/login/LoginView";
import Routes from "./components/routes/Routes";

function App() {
  return (
    <Router>
      <Route component={Routes} />
    </Router>

    // <Router>
    //   <ErrorBoundary>
    //     <UserProvider>
    //       <Route path="/" component={Navigation} />
    //       <Route exact path="/" component={Landing} />
    //       <Route exact path="/login" component={Login} />
    //       <Route exact path="/signup" component={Register} />
    //       {/* <Route exact path="/users" component={Users} /> */}
    //       <Route
    //         exact
    //         path={`/${loggedInUser.username}`}
    //         component={MyProfile}
    //       />
    //       <Route exact path="/profile/:username" component={GetFullProfle} />
    //       <Route exact path="/inbox" component={GetAllMessages} />
    //       <Route exact path="/profile" component={GetShortProfile} />
    //     </UserProvider>
    //   </ErrorBoundary>
    // </Router>
  );
}

export default App;
