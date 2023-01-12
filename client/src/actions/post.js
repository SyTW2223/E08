import {
    POST_SUCCES,
    SET_MESSAGE,
    POST_FAIL_FOUND,
    POST_FAIL,
    POST_DELETE,
    POST_CREATE
  } from "./types";

import PostService from "../services/post.service";


// Creador de acciones para obtener un post 
export const getPosts = (accountName) => (dispatch) => {
  return PostService.getPost(accountName).then(
    (response) => {
      dispatch({
        type: POST_SUCCES,
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
        type: POST_FAIL, 
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  )
}
  