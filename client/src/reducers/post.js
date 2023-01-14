import {
    POST_SUCCESS,
    POST_FAIL_FOUND,
    POST_CREATE,
    POST_CREATE_FAIL
  } from "../actions/types";


const initialState = {postStart: true, postCreate: false, postFound: false, posts: null};

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
    default:
      return state;
    }
  }
