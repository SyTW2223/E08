import {
    POST_CREATE,
    POST_CREATE_FAIL
  } from "./types";

import PostService from "../services/post.service";

// Creador de acciones para settear un post 
export const Posts = (accountName, title, content, tags) => (dispatch) => {
  console.log("Posts");
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

// // Creador de acciones para obtener un post 
// export const getPosts = (accountName) => (dispatch) => {
//   return PostService.getPost(accountName).then(
//     (response) => {
//       dispatch({
//         type: POST_SUCCESS,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         error.response.data.error || error.message;

//       dispatch({
//         type: POST_FAIL, 
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   )
// }
  