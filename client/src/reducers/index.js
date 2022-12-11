import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth";

// Se combinan los reducers
export default combineReducers({
  auth,
  message,
});