/** @format */

import React from "react";
import { Redirect, Route } from "react-router";
import { getToken, getUsername } from "../services/tokenService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = getToken() ? true : false;

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("private route props", props);
        const paramsUsername = props.match.params.username;
        const isAuthorized = paramsUsername === getUsername();
        if (!isAuthenticated || (paramsUsername && !isAuthorized)) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
