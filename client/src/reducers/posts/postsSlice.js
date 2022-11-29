import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {id: '1', title: 'First Post!', content: 'Hello'},
  {id: '2', title: 'Second Post!', content: 'More hello'},
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
});

export const { increment } = postsSlice.actions;

export default postsSlice.reducer;