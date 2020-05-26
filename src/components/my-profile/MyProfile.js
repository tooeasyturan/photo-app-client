/** @format */

import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import ManageMyPortfolio from "./ManageMyPortfolio";
import usersServices from "../../services/users";
import { useEffect } from "react";

const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

const DEFAULT_CURRENT_USER = {
  firstName: "",
  lastName: "",
  username: loggedInUser ? loggedInUser.username : "",
  status: "",
  profile: {},
  upload: [],
  avatar: [],
};

const MyProfile = () => {
  const [user, setUser] = useState(DEFAULT_CURRENT_USER);
  const { profile } = user;

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    console.log("fetching user...");
    if (loggedInUser) {
      const myProfile = await usersServices.auth(loggedInUser);
      setUser({ ...myProfile, token: loggedInUser.token });
    }
  };

  console.log("fetched user", user);

  window.user = user;

  return (
    <Grid>
      <Grid.Column>
        {profile && Object.entries(user.profile).length > 0 ? (
          <EditProfile user={user} />
        ) : (
          <CreateProfile user={user} />
        )}
        <ManageMyPortfolio user={user} />
      </Grid.Column>
    </Grid>
  );
};

export default MyProfile;
