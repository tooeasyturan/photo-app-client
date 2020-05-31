/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React from "react";
import profilesService from "../../services/profiles.tsx";
import useFormHandling from "../custom-hooks/useFormHandling.tsx";
import ManageProfilePage from "./ManageProfilePage.tsx";

// Component for editing user with status 'model' after initial profile has been created.

const CREATE_PROFILE_OPTIONS = {
  country: "",
  region: "",
  description: "",
  shootingStyle: [],
};

const CreateProfile = ({ user }) => {
  const { handleChange, handleSubmit, values } = useFormHandling(
    CREATE_PROFILE_OPTIONS,
    submit,
    validateModel
  );

  function validateModel() {
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
    />
  );
};

export default CreateProfile;
