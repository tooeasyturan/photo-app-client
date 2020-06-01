/** @format */

import React from "react";
import { Redirect, Route } from "react-router";
import { getToken } from "../services/tokenService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = getToken() ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: "/" }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
