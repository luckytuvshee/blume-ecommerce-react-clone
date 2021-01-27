import { combineReducers } from "redux";
import project from "./project";
import editor from "./editor";
import image from "./image";
import auth from "./auth";

export default combineReducers({
  project,
  editor,
  image,
  auth,
});
