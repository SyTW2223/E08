import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../reducers/posts/postsSlice'


// Crea la store de Redux
export default configureStore({
  reducer: {
    posts: postsReducer
  }
})