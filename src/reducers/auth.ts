import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  AUTH_LOADING,
} from "../actions/types";

interface state {
  isAuthenticated: boolean;
  loading: boolean;
  user: Object | null;
  token: string | null;
}

const initialState: state = {
  isAuthenticated: false,
  loading: true,
  user: null,
  token: localStorage.getItem("token"),
};

const auth = (state = initialState, action: any) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const token = payload.signInUserSession.accessToken.jwtToken;
      localStorage.setItem("token", token);
      return {
        ...state,
        token,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      console.log("loading is: " + state.loading);
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
