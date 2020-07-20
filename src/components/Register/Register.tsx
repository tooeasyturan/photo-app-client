/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React, { useState } from "react";
import usersService from "../../services/users";
import useFormHandling, {
  CustomFormType,
} from "../custom-hooks/useFormHandling";
import { Redirect } from "react-router-dom";
import RegisterView from "./RegisterView";
import validateRegistration from "./validateRegistration";

const USER_REGISTER_OBJECT = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  status: "",
  confirmPassword: "",
  email: "",
};

const Register = () => {
  const {
    handleChange,
    handleStatus,
    handleSubmit,
    values,
    errors,
  } = useFormHandling(USER_REGISTER_OBJECT, submit, validateRegistration);
  const [created, setCreated] = useState(false);

  async function submit() {
    await usersService.createUser(values);
    setCreated(true);
  }

  return (
    <div>
      {!created ? (
        <RegisterView
          values={values}
          handleChange={handleChange}
          handleStatus={handleStatus}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      ) : (
        // {" "}
        <>
          <Redirect to='/login' />
        </>
      )}
    </div>
  );
};

export default Register;
