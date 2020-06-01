/** @format */

import React, { useEffect, useState } from "react";
import profilesServices from "../../services/profiles.tsx";
import UserCard from "./UserCard";
import SendMessage from "../messaging/SendMessage";
import PortfolioPictures from "./PortfolioPictures";

const DEFAULT_USER_PROFILE = {
  username: "",
  firstName: "",
  lastName: "",
  status: "",
  email: "",
  profile: {},
  avatar: "",
  upload: [],
};

const Profile = (props) => {
  const username = props.match.params.username;
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);
  const { upload } = profile;
  const [error, setError] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let user = await profilesServices.getProfile(username);
    if (!user) {
      setError(() => {
        throw new Error("User does not exist");
      });
    }
    setProfile(user);
  };

  return (
    <>
      <UserCard
        profile={profile}
        isFullProfile
        sendMessage={<SendMessage userTo={username} />}
      />
      <PortfolioPictures portfolioPictures={upload} />
    </>
  );
};

export default Profile;
