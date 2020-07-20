/** @format */

import React from "react";
import "../../scss/style.scss";

const HomeSass = () => {
  const LoggedOut = () => {
    return (
      <>
        <li>
          <a href='#'>Login</a>
        </li>
        <li>
          <a href='#'>Signup</a>
        </li>
      </>
    );
  };

  const LoggedIn = () => {
    return (
      <>
        <li className='dropdown'>
          <a href='#' className='drop-btn'>
            Username
          </a>
          <div className='dropdown-content'>
            <a href='#'>My Profile</a>
            <a href='#'>Explore</a>
            <a href='#'>Inbox</a>
            <a href='#'>Sign Out</a>
          </div>
        </li>
      </>
    );
  };

  return (
    <div className='showcase'>
      <div className='container'>
        <nav>
          <ul>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
          <ul>
            <LoggedIn />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HomeSass;
