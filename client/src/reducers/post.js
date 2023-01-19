import {
    POST_SUCCESS,
    POST_FAIL_FOUND,
    POST_CREATE,
    POST_CREATE_FAIL,
    POST_LIKE,
    POST_LIKE_FAIL,
    POST_DELETE,
    POST_DELETE_FAIL,
    PAGINATED_POST_SUCCESS,
    PAGINATED_POST_FAIL
  } from "../actions/types";


const initialState = {postStart: true, postCreate: false, postFound: false, next:1 , totalPages:1, postLike:false, posts: []};

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
      return {
        ...state,
        postLike: true,
        posts: state.posts.map(post => post._id === payload._id ? payload : post)
      };
    case POST_LIKE_FAIL:
      return {
        ...state,
        postLike: false,
      };
    case POST_DELETE:
      return {
        ...state,
        postDelete: true,
        posts: state.posts.filter(post => post._id !== payload._id)
      };
    case POST_DELETE_FAIL:
      return {
        ...state,
        postDelete: false,
      };
    case PAGINATED_POST_SUCCESS:
      const next = Number(Number(payload.current) + Number(1));
      const posts = payload.posts.filter(post => !state.posts.includes(post));
      return {
        ...state,
        postFound: true,
        posts: state.posts.concat(posts),
        next: next,
        current: payload.current,
        totalPages: payload.pages,
      };
    case PAGINATED_POST_FAIL:
      return {
        ...state,
        postFound: false,
      };
    default:
      return state;
    }
  }
