/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React from "react";
import profilesService from "../../services/profiles.tsx";
import ManageProfilePage from "./ManageProfilePage.tsx";
import useFormHandling from "../custom-hooks/useFormHandling.tsx";

// Component for editing user with status 'photographer' after initial profile has been created.

const EditProfile = ({ user }) => {
  const profile = user.profile;

  const EDIT_PROFILE_OPTIONS = {
    country: profile.country ? profile.country : "",
    region: profile.region ? profile.region : "",
    description: profile.description ? profile.description : "",
    shootingStyle: profile.shootingStyle ? profile.shootingStyle : "",
  };

  const {
    handleChange,
    handleSubmit,
    values,
    handleLocation,
  } = useFormHandling(EDIT_PROFILE_OPTIONS, submit, validateProfile);

  function validateProfile() {
    let errors = {};
    return errors;
  }

  async function submit() {
    try {
      await profilesService.createProfile(values);
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
      handleLocation={handleLocation}
    />
  );
};

export default EditProfile;
