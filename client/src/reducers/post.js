import {
    POST_SUCCES,
    SET_MESSAGE,
    POST_FAIL_FOUND,
    POST_FAIL,
    POST_DELETE,
    POST_CREATE
  } from "./types";


import PostService from "../services/post.service";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? {isLoggedIn: true, user}:{isLoggedIn: false, user: null};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_SUCCESS:
      return {
        ...state,
        postFound: true,
        posts: payload.posts,
      };
    case POST_FAIL:
      return {
        ...state,
        postFound: false,
        posts: [],
      };
    default:
      return state;
    }
  }
