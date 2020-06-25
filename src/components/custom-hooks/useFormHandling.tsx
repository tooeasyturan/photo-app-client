/** @format */

import { useState } from "react";
import { InputOnChangeData } from "semantic-ui-react";

type useFormHandlingProps = {
  formInputs: { [key: string]: string };
  callback: () => void;
  validate: () => { [key: string]: string };
};

// add CustomType
export type CustomFormType = {
  handleChange: (val: any, e: any) => void;
  handleSubmit: (e: StatusEvent) => void;
  handleStatus: (e: StatusEvent) => void;
  values: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
};

export interface StatusEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

export type ChangeType = {
  event: React.ChangeEvent<HTMLInputElement>;
  data: InputOnChangeData;
};

const useFormHandling = (formInputs, callback, validate) => {
  const [values, setValues] = useState(formInputs);
  const [errors, setErrors] = useState({});

  /* e is any because it can be of multiple types */
  const handleChange = (val: any, e: any): void => {
    console.log("e", e);
    const target: HTMLFormElement =
      "target" in e
        ? (e.target as HTMLFormElement)
        : ((e as any) as HTMLFormElement);

    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStatus = (e: StatusEvent) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
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
