/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

import React from "react";
import usersService from "../../services/users";
import useFormHandling, {
  CustomFormType,
} from "../custom-hooks/useFormHandling";
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

  async function submit() {
    await usersService.createUser(values);
  }

  return (
    <div>
      <RegisterView
        values={values}
        handleChange={handleChange}
        handleStatus={handleStatus}
        handleSubmit={handleSubmit}
        errors={errors}
      />{" "}
      :{/* <>
        <Redirect to='/login' />
      </> */}
    </div>
  );
};

export default Register;
