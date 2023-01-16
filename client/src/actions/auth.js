import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";

// Creador de acciones para registro
export const register = (username, accountName, email, password) => (dispatch) => {
  return AuthService.register(username, accountName, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: REGISTER_FAIL, 
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  )
}

// Creador de acciones para login
export const login = (accountName, password)=> (dispatch) => {
  return AuthService.login(accountName, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      })

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;
      
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  )
}


// Creador de acciones para salir de la sesión
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
}