/** @format */

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Logout = ({ hideFixedMenu }) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    //Call logout on backend
    setUser(null);
    history.push("/");
  };

  return (
    <>
      <Dropdown.Item inverted={!hideFixedMenu} as='a' onClick={handleLogout}>
        Sign Out
      </Dropdown.Item>
    </>
  );
};

export default Logout;
