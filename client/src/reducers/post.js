import {
    POST_SUCCESS,
    SET_MESSAGE,
    POST_FAIL_FOUND,
    POST_FAIL,
    POST_DELETE,
    POST_CREATE,
    POST_CREATE_FAIL
  } from "../actions/types";


const initialState = {postStart: true};

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
    default:
      return state;
    }
  }
