import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import Dashboard from "../Dashboard";
import { RegisterValidation, validateRegister } from "../utility/FormValidation";

const Register = () => {
  const { errors, values, onInputChange, handleSubmit, isSubmitted } =
  RegisterValidation(validateRegister);
  const navigate = useNavigate();
  const tokenString = JSON.parse(localStorage.getItem("accessToken"));
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (obj) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}register`,
        obj
      );
      const formData = await response.data;
      setIsLoading(false);
      navigate(`/login`);
      if (formData) {
        setIsLoading(false);
      }
      return { formData };
    } catch (error) {
      const message = error.response;
      setIsLoading(false);
      return { message };
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length == 0 && isSubmitted) {
      onFormSubmit(values);
    }
  }, [errors]);

  useEffect(() => {
    if (tokenString) {
        navigate(`/`)
    }
  }, []);

  return (
    <div className="login-content">
      <div className="left-side">
        <div className="left-content">
          <h4>
            “If you want to go quickly, go alone. If you want to go far, go
            together.”– African Proverb
          </h4>
        </div>
      </div>
      <div className="righ-side">
        <div className="right-content text-center">
          <h3 className="">Register a New Account</h3>
          <h4 className="">Create an account</h4>
          <form onSubmit={handleSubmit}>
            <input
              className="w-100 my-2"
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => onInputChange(e)}
            />
            <input
              className="w-100 my-2"
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => onInputChange(e)}
            />
            <input
              className="w-100 my-1 mb-3"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onInputChange(e)}
            />
            {isLoading ? (
              <button color="primary" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit">Sign Up</button>
            )}
          </form>
          <p className="py-3">
            {" "}
            Already have an account?{" "}
            <span className="text-primary">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
