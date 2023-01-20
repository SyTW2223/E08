import React from 'react'
import { Post } from './Post'
import { Stack, Paper, Box, Typography } from '@mui/material'


export const PostsList = ({ posts }) => {
  if (posts.length > 0) {
    return (
      <Stack> 
        { posts.map((post, index) => <Post id={post._id} title={post.title} accountName={post.accountName} profilePicture={post.profilePicture} content={post.content} index={index} tags={post.tags}/> ) }
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
