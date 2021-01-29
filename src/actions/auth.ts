import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  AUTH_LOADING,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      dispatch({
        type: USER_LOADED,
        payload: token,
      });
    }
  } catch (err) {
    console.log("error : ");
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => async (dispatch: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log("error");
      console.log(errors);
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const loginUser = (email: string, password: string) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });

    const res = await axios.post("/api/auth", { email, password });
    const token = res.data;

    console.log("token");
    console.log(token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      console.log("error");
      console.log(errors);
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
