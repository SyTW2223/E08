import {
    POST_CREATE,
    POST_CREATE_FAIL,
    POST_SUCCESS,
    POST_FAIL_FOUND
  } from "./types";

import PostService from "../services/post.service";

// Creador de acciones para settear un post 
export const Posts = (accountName, title, content, tags) => (dispatch) => {
  return PostService.setPost(accountName, title, content, tags).then(
    (response) => {
      dispatch({
        type: POST_CREATE,
        payload:  response.data ,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: POST_CREATE_FAIL, 
        payload: message,
      });

      return Promise.reject();
    }
  )
}

// Creador de acciones para obtener un post 
export const getAllPosts = () => (dispatch) => {
  return PostService.getPosts().then(
    (response) => {
      dispatch({
        type: POST_SUCCESS,
        payload:  response.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: POST_FAIL_FOUND, 
        payload: message,
      });

      return Promise.reject();
    }
  )
}
  