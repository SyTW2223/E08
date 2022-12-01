import { combineReducers } from "redux";
import auth from "./auth";

// Se combinan los reducers
export default combineReducers({
  auth,
});