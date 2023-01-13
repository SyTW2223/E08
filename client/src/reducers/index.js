import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth";
import post from "./post";

// Se combinan los reducers
export default combineReducers({
  auth,
  message,
  post,
});