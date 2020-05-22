/** @format */

import React, { useEffect, useState, useContext } from "react";
import profilesServices from "../../services/profiles";
import uuid from "uuid/v4";
import UserCard from "./UserCard";
import SendMessage from "../messaging/SendMessage";

import PortfolioPictures from "./PortfolioPictures";

import { Image } from "semantic-ui-react";
import { useError } from "../ErrorBoundaryContext";

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

// Names are pretty confusing here. Could help to update db schema as well.

const FullProfile = ({ username }) => {
  console.log("full profile username", username);
  const errorMessage = useError();
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);
  // const username = props.match.params.username;
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
    setProfile({
      ...profile,
      username: username,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      email: user.email,
      profile: user.profile[0],
      avatar: user.avatar[0].avatar,
      upload: user.upload,
    });
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

export default FullProfile;
