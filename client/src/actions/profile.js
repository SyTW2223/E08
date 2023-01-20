import { PROFILE_SUCCESS, PROFILE_FAIL } from "./types";

import * as ProfileService from "../services/profile.service";

// Creador de acciones para obtener un perfil 
export const profile = (accountName) => (dispatch) => {
  return ProfileService.getProfile(accountName).then(
    (response) => {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: response.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: PROFILE_FAIL,
        payload: message
      });

      return Promise.reject();
    }
  )
}

// Creador de acciones para editar un perfil
export const editProfile = (accountName, profileChanges) => (dispatch) => {
  return ProfileService.patchProfile(accountName, profileChanges).then(
    (response) => {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: response.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: PROFILE_FAIL,
        payload: message
      });

      return Promise.reject();
    }
  )
}