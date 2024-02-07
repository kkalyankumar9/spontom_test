import axios from "axios";
import {
    LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

export const signUp = (signup_data) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await axios.post(
      `https://spontom-server.onrender.com/userauth/signup`,
      signup_data
    );
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, payload: err.message });
    return err.response.data.msg;
  }
};
export const signIn = (signin_data) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const res = await axios.post(
      `https://spontom-server.onrender.com/userauth/signin`,
      signin_data
    );
    const { token, email } = res.data;
    dispatch({ type: SIGNIN_SUCCESS, payload: { token, email } });

    console.log(token);

    return res.data.msg;
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR });
   return error.response.data.msg;
  }
};

export const logoutUser = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("Token before logout:", token);
    dispatch({ type: LOGOUT_REQUEST });
    try {
      await axios.post("https://spontom-server.onrender.com/userauth/logout", null, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
      throw err;
    }
  };