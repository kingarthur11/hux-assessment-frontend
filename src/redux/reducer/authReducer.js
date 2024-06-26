import * as types from "../constant/auth";
const initialState = {
  login: null,
  isAuth: null,
  isLoggedIn: false,
  isSigned: false,
  isLoading: false,
  isSuccess: false,
  register: null,
  email: null,
  isSignedup: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.SET_SIGNUPBTN:
      return {
        ...state,
        signup_btn: action.payload,
      };
    case types.REGISTER_USER:
      return {
        ...state,
        isLoading: false,
        register: action.payload,
        isSignedup: action.success,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        login: action.payload,
        isLoggedIn: action.success,
      };
    
    case types.CLEAR_USERS:
      return {
        ...state,
        login: null,
        isLoggedIn: false,
      };
    case types.AUTHORIZE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case types.AUTHORIZE_FAIL:
      return {
        ...state,
        login: null,
        isAuth: false,
        isLoggedIn: false,
        isSigned: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export { authReducer };
