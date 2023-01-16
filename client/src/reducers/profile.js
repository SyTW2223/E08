import {
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../actions/types";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? {isLoggedIn: true, user}:{isLoggedIn: false, user: null};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        description: payload.description,
        posted: payload.posts,
        likedPosts: payload.likedPosts,
      };
    default:
      return state;
    }
  }
