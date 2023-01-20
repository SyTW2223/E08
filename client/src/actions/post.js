import {
  POST_CREATE,
  POST_CREATE_FAIL,
  POST_SUCCESS,
  POST_FAIL_FOUND,
  POST_LIKE,
  POST_LIKE_FAIL,
  POST_DELETE,
  POST_DELETE_FAIL,
  PAGINATED_POST_SUCCESS,
  PAGINATED_POST_FAIL,
  CLEAR_POSTS
} from "./types";
import PostService from "../services/post.service";

// Creador de acciones para settear un post 
export const Posts = (accountName, profilePicture, title, content, tags) => (dispatch) => {
  return PostService.setPost(accountName, profilePicture, title, content, tags).then(
    (response) => {
      dispatch({
        type: POST_CREATE,
        payload: response.data,
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
        payload: response.data
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

// Creador de acciones para obtener los posts paginados 
export const getPagedPost = (page) => (dispatch) => {
  return PostService.paginationPosts(page).then(
    (response) => {
      dispatch({
        type: PAGINATED_POST_SUCCESS,
        payload: response.data
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: PAGINATED_POST_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// Creador de acciones para obtener posts por sus ids
export const getPostsFromIds = (ids) => (dispatch) => {
  return PostService.getPostsFromIds(ids).then(
    (response) => {
      dispatch({
        type: POST_SUCCESS,
        payload: response.data
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

// Creador de acciones para dar like a un post
export const likePost = (id, accountLike) => (dispatch) => {
  return PostService.likePosts(id, accountLike).then(
    (response) => {
      dispatch({
        type: POST_LIKE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: POST_LIKE_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  )
}

// Creador de acciones para para borrar un post
export const deletePost = (id, accountDelete) => (dispatch) => {
  return PostService.deletePosts(id, accountDelete).then(
    (response) => {
      dispatch({
        type: POST_DELETE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.data.error || error.message;

      dispatch({
        type: POST_DELETE_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  )
}

// Creador de acciones para limpiar posts
export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POSTS,
  });

  return Promise.resolve();
}

