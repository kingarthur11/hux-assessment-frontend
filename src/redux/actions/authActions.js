import * as types from "../constant/auth";
import toast from "react-hot-toast";

import {
  register,
  login_user,
} from "../api/auth";

export const registerUser = (dataObj, navigate) => async (dispatch) => {
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  const { formData, message } = await register(dataObj);
  // console.log(formData);
  // return true
  if (formData) {
    dispatch({
      type: types.REGISTER_USER,
      payload: formData,
      success: true,
    });
    toast.success("Registration was successful");
    navigate("/login");
  }
  if (message) {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const loginUser = (dataObj, navigate) => async (dispatch) => {
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  const { data, message } = await login_user(dataObj);
  if (data) {
    const { user, token } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    dispatch({ type: types.LOGIN_USER, payload: user, success: true });
    toast.success("Login was successful");
    navigate("/");
  }

  if (message) {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const logOut = (navigate) => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  dispatch({
    type: types.AUTHORIZE_FAIL,
    payload: "please login again!",
  });
  navigate("/login");
};

export const RefreshUser = () => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("user"));
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  if (data) {
    dispatch({ type: types.LOGIN_USER, payload: data, success: true });
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: "please login again!",
    });
  }
};

