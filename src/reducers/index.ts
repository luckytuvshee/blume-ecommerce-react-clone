import { combineReducers } from "redux";
import auth from "./auth";
import basket from "./basket";
import product from "./product";

export default combineReducers({
  auth,
  basket,
  product,
});
