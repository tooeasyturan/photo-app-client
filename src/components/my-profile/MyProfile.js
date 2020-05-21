import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import { UserContext } from "../UserContext";

import ManageMyPortfolio from "./ManageMyPortfolio";

const MyProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const { profile } = user;
  console.log("user from db", user.profile);

  return (
    <Grid>
      <Grid.Column>
        {!profile.id ? (
          <CreateProfile user={user} />
        ) : (
          <EditProfile user={user} />
        )}
        <ManageMyPortfolio user={user} />
      </Grid.Column>
    </Grid>
  );
};

export default MyProfile;
