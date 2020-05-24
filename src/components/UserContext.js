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
  const [user, setUser] = useState(loggedInUser);
  console.log("user context user", user);

  // currently user is fetched every time a component that has UserContext is loaded. how to fix??
  // useEffect(() => {
  //   fetchLoggedInUser();

  //   return () => {
  //     console.log("cleaned up");
  //   };
  // }, []);

  // const fetchLoggedInUser = async () => {
  //   console.log("fetching user...");
  //   if (loggedInUser) {
  //     const authorizedUser = await usersServices.auth(loggedInUser);
  //     setUser({ ...authorizedUser, token: loggedInUser.token });
  //   }
  // };

  // console.log("fetched user", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
