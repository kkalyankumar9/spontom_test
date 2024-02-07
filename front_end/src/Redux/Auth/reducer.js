 import { LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType";

const  initialState={
  isLoading: false,
   isError: false,
   isAuth: false,  // Corrected the property name here
   token: localStorage.getItem("token") || ""
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case SIGNUP_ERROR:
    case SIGNIN_ERROR:
      return { ...state, isError: true, isLoading: false };

    case SIGNIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,  // Corrected the property name here
        isError: false,
        isLoading: false,
        token: action.payload.token,
        // Only store necessary user details in the state, not email and password
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuth: false,  // Corrected the property name here
        isError: false,
      };

    default:
      return state;
  }
};
