import {
  PROFILE_SUCCESS,
} from "../actions/types";


const user = JSON.parse(localStorage.getItem("user"));
const initialState = user 
    ? { username: user.username, description: "", posted: [], likedPosts: [] }
    : { username: "", description: "", posted: [], likedPosts: [] };

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        description: payload.description,
        posted: payload.posts,
        likedPosts: payload.likedPosts,
      };
    default:
      return state;
  }
}
