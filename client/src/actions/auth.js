import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";

// Creador de acciones para registro
export const register = (username, accountName, email, password) => (dispatch) => {
  return AuthService.register(username, accountName, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.data
      });
      return Promise.reject();
    }
  )
}

export const login = (accountName, password)=> (dispatch) => {
  return AuthService.login(accountName).then(
    (response) => {
      const passwordAccount = response.data.password
      if (password === passwordAccount) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        })
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: "Contraseña incorrecta"
        })
      }
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.data
      });
      return Promise.reject();
    }
  )
}