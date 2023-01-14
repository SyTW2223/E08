import React from 'react'
import { Post } from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { Stack, Paper, Box, Typography } from '@mui/material'

import { getAllPosts } from '../../actions/post';


export const PostsList = () => {
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const currentPost = useSelector(state => state.post);
  const posts = currentPost.posts
  const postFound = currentPost.postFound


  if (postFound) {
    return (
      <Stack> 
        { posts.map((post) => <Post title={post.title} accountName={post.accountName} content={post.content} likes={1} tags={post.tags}/> ) }
      </Stack>
    )
  } else {
    return (
      <Stack sx={{ marginBottom: "2em" }}>
        <Paper elevation={3}>
          <Box display="flex" flexDirection="row" alignItems="center" sx={{ justifyContent: "center" }} padding={2}>
            <Typography variant="body2">
              No posts found
            </Typography>
          </Box>
        </Paper>
      </Stack>
    )
  }
}
