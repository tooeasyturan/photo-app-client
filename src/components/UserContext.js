/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

export const UserProvider = (props) => {
  const [user, setUser] = useState(loggedInUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
