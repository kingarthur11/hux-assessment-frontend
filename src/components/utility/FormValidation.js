import React, { useState, useEffect } from "react";
import axios from "axios";

const FormValidation = ( ) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  // const resetForm = () => {
  //   setValues({
  //     comment: "",
  //     marchant: "",
  //     status: "",
  //     total: "",
  //     date_applied: "",
  //   });
  // };

  const onInputChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitted(true);
  };

  return {
    values,
    errors,
    onInputChange,
    handleSubmit,
    loading,
    show,
    isSubmitted,
    setValues
  };
};

export default FormValidation;

export const validate = (values) => {
  const errors = {};
  if (values.fname.length <= 3) {
    errors.fname = "value is reqired";
  }
  if (values.lname.length <= 3) {
    errors.lname = "value is reqired";
  }
  if (values.phoneNumber == "") {
    errors.phoneNumber = "value is reqired";
  }

  return errors;
};

export const LoginValidation = ( ) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const onInputChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitted(true);
  };

  return {
    values,
    errors,
    onInputChange,
    handleSubmit,
    loading,
    show,
    isSubmitted,
    setValues
  };
};

export const validateLogin = (values) => {
  const errors = {};
  if (values.fname.length <= 3) {
    errors.fname = "value is reqired";
  }
  if (values.lname.length <= 3) {
    errors.lname = "value is reqired";
  }
  if (values.phoneNumber == "") {
    errors.phoneNumber = "value is reqired";
  }

  return errors;
};

export const RegisterValidation = ( ) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const onInputChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitted(true);
  };

  return {
    values,
    errors,
    onInputChange,
    handleSubmit,
    loading,
    show,
    isSubmitted,
    setValues
  };
};

export const validateRegister = (values) => {
  const errors = {};
  if (values.fname.length <= 3) {
    errors.fname = "value is reqired";
  }
  if (values.lname.length <= 3) {
    errors.lname = "value is reqired";
  }
  if (values.phoneNumber == "") {
    errors.phoneNumber = "value is reqired";
  }

  return errors;
};