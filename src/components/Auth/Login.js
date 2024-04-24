import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useSelector, useDispatch, connect } from "react-redux";
import { LoginValidation, validateLogin } from "../utility/FormValidation";
import { loginUser } from "../../redux/actions/authActions";
import {Toaster} from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { errors, values, onInputChange, handleSubmit, isSubmitted } =
  LoginValidation(validateLogin);
  const [loading, setIsLoading] = useState(false);

  const onFormSubmit = async (obj) => {
    dispatch(loginUser(obj, navigate));
  };

  // console.log(isLoading)

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
      <Toaster />
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
              value={values.email}
              onChange={(e) => onInputChange(e)}
            />
            {errors && errors.email ? (
            <div className="style-error">{errors.email}</div>
            ) : (
            <div className=""></div>
            )}
            <input
              className="w-100 my-3"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={(e) => onInputChange(e)}
            />
            {errors && errors.password ? (
            <div className="style-error">{errors.password}</div>
            ) : (
            <div className=""></div>
            )}
            {isLoading ? (
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
