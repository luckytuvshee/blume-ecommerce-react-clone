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
  user: Object | null;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: state = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: true,
};

const auth = (state = initialState, action: any) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
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
      const token = payload;
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
