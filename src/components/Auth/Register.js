import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import {Toaster} from "react-hot-toast";
import { useSelector, useDispatch, connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { RegisterValidation, validateRegister } from "../utility/FormValidation";

const Register = () => {
  const { errors, values, onInputChange, handleSubmit, isSubmitted } =
  RegisterValidation(validateRegister);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenString = JSON.parse(localStorage.getItem("accessToken"));
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  

  const onFormSubmit = async (obj) => {
    dispatch(registerUser(obj, navigate));
  };

  useEffect(() => {
    if (Object.keys(errors).length == 0 && isSubmitted) {
      onFormSubmit(values);
    }
  }, [errors]);


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
          <h3 className="">Register a New Account</h3>
          <h4 className="">Create an account</h4>
          <form onSubmit={handleSubmit}>
            <input
              className="w-100 my-2"
              type="text"
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={(e) => onInputChange(e)}
            />
            {errors && errors.name ? (
            <div className="style-error">{errors.name}</div>
            ) : (
            <div className=""></div>
            )}
            <input
              className="w-100 my-2"
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
              className="w-100 my-1 mb-3"
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
