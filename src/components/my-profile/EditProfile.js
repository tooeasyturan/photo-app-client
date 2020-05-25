/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React, { useContext } from "react";
import profilesService from "../../services/profiles";
import ManageProfilePage from "./ManageProfilePage.tsx";
import useFormHandling from "../custom-hooks/useFormHandling";
import { UserContext } from "../UserContext";

// Component for editing user with status 'photographer' after initial profile has been created.

const EditProfile = ({ user }) => {
  // const [user, setUser] = useContext(UserContext);

  // console.log("EDIT PROFILE");
  const profile = user.profile[0];

  const EDIT_PROFILE_OPTIONS = {
    country: profile.country ? profile.country : "",
    region: profile.region ? profile.region : "",
    description: profile.description ? profile.description : "",
    shootingStyle: profile.shootingStyle ? profile.shootingStyle : "",
  };

  const {
    handleChange,
    handleLocation,
    handleSubmit,
    values,
  } = useFormHandling(EDIT_PROFILE_OPTIONS, submit, validateProfile);

  function validateProfile() {
    let errors = {};
    return errors;
  }

  async function submit() {
    try {
      await profilesService.create(user, values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ManageProfilePage
      user={user}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditProfile;
