import {
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../actions/types";


const user = JSON.parse(localStorage.getItem("user"));
const username = user ? user.username : "";
const initialState = { username: username, description: "", profilePicture: "", posted: [], likedPosts: [] }

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        description: payload.description,
        profilePicture: payload.profilePicture,
        posted: payload.posts,
        likedPosts: payload.likedPosts,
      };
    case PROFILE_FAIL:
      return {
        ...state,
      }
    default:
      return state;
  }
}
