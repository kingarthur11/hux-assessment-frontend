import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { LoginValidation, validateLogin } from "../utility/FormValidation";

const Login = () => {
  const { errors, values, onInputChange, handleSubmit, isSubmitted } =
  LoginValidation(validateLogin);
  const [loading, setIsLoading] = useState(false);
  const notify = () => toast("Weldone, you have successfully added a todo");

  const onFormSubmit = async (obj) => {
    try {
      setIsLoading(true);
      console.log(obj);
      const response = await axios.post( `${process.env.REACT_APP_BASE_URL}login`, obj );
      const formData = await response.data;
      const token = await formData.data;
      localStorage.setItem("accessToken", JSON.stringify(token));
      console.log(token);
      setIsLoading(false);
      notify()
      // navigate(`/`);
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
    const tokenString = JSON.parse(localStorage.getItem("accessToken"));
    if (tokenString) {
      navigate(`/`);
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
          <h3 className="pt-3">Login To Your Account</h3>
          <h4 className="py-3">
            Sign into your account
          </h4>
          <form onSubmit={handleSubmit}>
            <input
              className="w-100 my-1"
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => onInputChange(e)}
            />
            <input
              className="w-100 my-3"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onInputChange(e)}
            />
            {loading ? (
              <button color="primary" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit">Sign In</button>
            )}
          </form>
          <p className="pt-3">
            {" "}
            Don't have an account yet?{" "}
            <span className="text-primary">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
