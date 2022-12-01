import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index'


// Crea la store de Redux
export default configureStore({
  reducer: rootReducer
})