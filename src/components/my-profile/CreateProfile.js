/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import profilesService from "../../services/profiles";
import ManageProfilePage from "./ManageProfilePage";
import useFormHandling from "../custom-hooks/useFormHandling";
import { UserContext } from "../UserContext";

// Component for editing user with status 'model' after initial profile has been created.

const CREATE_PROFILE_OPTIONS = {
  location: {
    country: "",
    region: "",
  },
  description: "",
  shootingStyle: [],
};

const CreateProfile = ({ user }) => {
  console.log("CREATE PROFILE");
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

export default CreateProfile;
