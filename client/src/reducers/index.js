import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

// Se combinan los reducers
const appReducer = combineReducers({
  auth,
  message,
  profile,
  post,
})

// Se exporta el reducer raíz
export const rootReducer = (state, action) => {
  if (action.type === '@APP/LOGOUT') {
    // En caso de logout, se reinicia el state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};