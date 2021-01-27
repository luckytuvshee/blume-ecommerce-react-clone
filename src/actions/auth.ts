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

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    //
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

    const user = {};

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    // dispatch(loadUser());
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
export const logout = (history: any) => async (dispatch: any) => {
  try {
    //

    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: LOGOUT,
    });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
