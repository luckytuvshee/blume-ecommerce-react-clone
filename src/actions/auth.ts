import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_LOADING,
  CLEAR_BASKET,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { getBaskets } from "./baskets";

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: {
          token,
          user: res.data,
        },
      });
      dispatch(getBaskets());
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (email: string, password: string) => async (
  dispatch: any
) => {
  try {
    const res = await axios.post("/api/users", { email, password });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    if (err) {
      console.log("error");
      console.log(err);
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

    dispatch(loadUser());
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

    dispatch({
      type: CLEAR_BASKET,
    });
  } catch (error) {
    console.log(error);
  }
};
