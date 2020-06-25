/** @format */

import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import usersServices from "../../services/users";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import ManageMyPortfolio from "./ManageMyPortfolio";

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

const MyProfile = (params) => {
  const [user, setUser] = useState(DEFAULT_CURRENT_USER);
  const { profile } = user;

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    if (loggedInUser) {
      const myProfile = await usersServices.getLoggedInUser();
      setUser({ ...myProfile, token: loggedInUser.token });
    }
  };

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
