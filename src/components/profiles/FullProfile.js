/** @format */

import React, { useEffect, useState, useContext } from "react";
import profilesServices from "../../services/profiles";
import uuid from "uuid/v4";
import FullProfileView from "./FullProfileView";
import { Image } from "semantic-ui-react";
import { useError } from "../ErrorBoundaryContext";

const DEFAULT_USER_PROFILE = {
  info: [],
  profile: [],
  avatar: [],
  upload: [],
};

// Names are pretty confusing here. Could help to update db schema as well.

const FullProfile = (props) => {
  const errorMessage = useError();
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);
  const username = props.match.params.username;
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
      info: user,
      profile: user.profile[0],
      avatar: user.avatar[0].avatar,
      upload: user.upload,
    });
  };

  const displayPortfolioPictures = upload.map((portfolioPicture) => (
    <Image
      key={uuid()}
      src={portfolioPicture.portfolio}
      wrapped
      ui={true}
      alt=''
      rounded
      style={{ cursor: "pointer", margin: "0.5em" }}
    />
  ));

  return (
    <FullProfileView
      profile={profile}
      displayPortfolioPictures={displayPortfolioPictures}
      username={username}
    />
  );
};

export default FullProfile;
