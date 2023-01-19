import {
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../actions/types";


const initialState = { description: "", posted: [], likedPosts: [] };

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
