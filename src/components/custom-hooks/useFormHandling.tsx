/** @format */

import { useState } from "react";

interface FormReturns {
  handleChange: () => void;
  handleStatus: () => void;
  handleSubmit: () => void;
  values: {};
  errors: {};
}

const useFormHandling = (formInputs, callback, validate) => {
  const [values, setValues] = useState<{}>(formInputs);
  const [errors, setErrors] = useState<{}>({});

  const handleChange = (val, e) => {
    const { name, value } = e.target ? e.target : e;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStatus = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formErrors = validate(values);
    Object.keys(formErrors).length === 0 ? callback() : setErrors(formErrors);
  };

  return {
    handleChange,
    handleStatus,
    handleSubmit,
    values,
    errors,
  };
};

export default useFormHandling;
