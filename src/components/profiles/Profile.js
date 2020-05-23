/** @format */

import React, { useEffect, useState } from "react";
import profilesServices from "../../services/profiles";
import UserCard from "./UserCard";
import SendMessage from "../messaging/SendMessage";
import PortfolioPictures from "./PortfolioPictures";
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

const Profile = (props) => {
  const username = props.match.params.username;
  const errorMessage = useError();
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
    // Probably a better way to set state here so props can be passed to UserCard????
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

export default Profile;
