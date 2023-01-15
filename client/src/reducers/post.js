import {
    POST_SUCCESS,
    POST_FAIL_FOUND,
    POST_CREATE,
    POST_CREATE_FAIL,
    POST_LIKE,
    POST_LIKE_FAIL,
  } from "../actions/types";


const initialState = {postStart: true, postCreate: false, postFound: false, postLike:false, posts: []};

export default function PostReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_CREATE:
      return {
        ...state,
        postCreate: true,
        content: payload.content
      };
    case POST_CREATE_FAIL:
      return {
        ...state,
        postCreate: false,
      };
    case POST_SUCCESS:
      return {
        ...state,
        postFound: true,
        posts: payload.reverse(),
      };
    case POST_FAIL_FOUND:
      return {
        ...state,
        postFound: false,
      };
    case POST_LIKE:
      const estado = state;
      const hola = estado.posts;
      const postIndex = hola.findIndex(post => post._id === payload._id);
      hola[postIndex] = payload;

      return {
        ...state,
        postLike: true,
        posts: hola,
      };
    case POST_LIKE_FAIL:
      return {
        ...state,
        postLike: false,
      };
    default:
      return state;
    }
  }
