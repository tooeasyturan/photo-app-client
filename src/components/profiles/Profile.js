/** @format */

import React from "react";
import FullProfile from "./FullProfile";
import ProfileGallery from "./ProfileGallery";

const Profile = (props) => {
  const username = props.match.params.username;

  return (
    <>{username ? <FullProfile username={username} /> : <ProfileGallery />}</>
  );
};

export default Profile;
