import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from "./userReducer";

const login = async (dispatch, user) => {
  // console.log("Hello Api Call");
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://social-gilt.vercel.app/api/user/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

const verifyEmail = async (dispatch, user) => {
  // console.log("Hello Api Call");
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://social-gilt.vercel.app/api/user/verify/email",
      {
        OTP: user.OTP,
        user: user.user,
      }
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

const signup = async (dispatch, user) => {
  // console.log("Hello Api Call");
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://social-gilt.vercel.app/api/user/register",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export { login, verifyEmail, signup };
