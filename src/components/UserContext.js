/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React, { useState, createContext, useEffect } from "react";
import usersServices from "../services/users";

export const UserContext = createContext(null);

const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

const DEFAULT_CURRENT_USER = {
  firstName: "",
  lastName: "",
  username: loggedInUser ? loggedInUser.username : "",
  status: "",
  token: loggedInUser ? loggedInUser.token : "",
  profile: [],
  upload: [],
  avatar: [],
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(DEFAULT_CURRENT_USER);

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    if (loggedInUser) {
      const authorizedUser = await usersServices.auth(loggedInUser);
      setUser({ ...authorizedUser, token: loggedInUser.token });
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
