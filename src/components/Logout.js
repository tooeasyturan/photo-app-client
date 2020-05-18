import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const Logout = ({ hideFixedMenu }) => {
  const [toHome, setToHome] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setToHome(true);
    console.log("user logged out");
  };

  return (
    <>
      {toHome ? <Redirect to="/login" /> : null}
      <Dropdown.Item inverted={!hideFixedMenu} as="a" onClick={handleLogout}>
        Sign Out
      </Dropdown.Item>
    </>
  );
};

export default Logout;
