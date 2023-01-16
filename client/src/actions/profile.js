import { PROFILE_SUCCESS, PROFILE_FAIL } from "./types";

import * as ProfileService from "../services/profile.service";

// Creador de acciones para obtener un perfil 
export const profile = (accountName) => (dispatch) => {
  return ProfileService.getProfile(accountName).then(
    (response) => {
      console.log(response.data)
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