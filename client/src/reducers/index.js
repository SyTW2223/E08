import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth";
import profile from "./profile";

// Se combinan los reducers
export default combineReducers({
  auth,
  message,
  profile,
});