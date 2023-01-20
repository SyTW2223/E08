import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack, Box, Container, Typography, Paper,
  TextField, FormControl, Grid, Button,
  InputLabel, Select, MenuItem, OutlinedInput, ListItemText
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

import { PostsList } from "./posts/PostsList";
import { Posts } from '../actions/post';
import { getPagedPost } from '../actions/post';
import InfiniteScroll from 'react-infinite-scroll-component';


const tags = [
  'Science',
  'Computers',
  'Gaming',
  'Sports',
  'Music'
]


export const Main = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [postCreate, setPostCreate] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector(state => state.auth);
  const currentProfile = useSelector(state => state.profile);
  const { posts: currentPosts} = useSelector(state => state.post);
  const dispatch = useDispatch();
  const nextPage = useSelector(state => state.post.next);
  const totalPages = useSelector(state => state.post.totalPages);

  React.useEffect(() => {
    dispatch(getPagedPost(1));
  }, [dispatch]);

  const handlePost = (e) => {
    const nameAccount = currentUser.accountName;
    const profilePicture = currentProfile.profilePicture;
    dispatch(Posts(nameAccount, profilePicture, title, content, tag)).then(() => {
      setPostCreate(true);
    }).catch(() => {
      setPostCreate(false);
    });
  }

  const HasMore = () => {
    if (nextPage <= totalPages) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  return (
    <div className="mainContent">
      <Box marginY="2em" sx={{ width: '100%' }}>
        <Container
          sx={{
            backgroundColor: "#ffff",
            borderRadius: 3,
            padding: 2,
          }}>
          {
            isLoggedIn ? (
              <form className="postForm" onSubmit={handlePost}>
                <Stack>
                  <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <MessageIcon fontSize="large" sx={{ marginTop: "10px" }} />
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item container direction="column" spacing={2}>
                          <Grid item >
                            <Typography variant="body2">
                              <FormControl sx={{ width: '100%' }}>
                                <TextField
                                  label="Title"
                                  value={title}
                                  type={'text'}
                                  required={true}
                                  message="A post is required"
                                  multiline
                                  onChange={(e) => setTitle(e.target.value)}
                                  sx={{ width: '100%' }}
                                ></TextField>
                              </FormControl>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2">
                              <FormControl sx={{ width: '100%' }}>
                                <TextField
                                  label="Content"
                                  value={content}
                                  type={'text'}
                                  required={true}
                                  message="A post is required"
                                  multiline
                                  onChange={(e) => setContent(e.target.value)}
                                  sx={{ width: '100%' }}
                                ></TextField>
                              </FormControl>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel>Tag</InputLabel>
                              <Select
                                multiple
                                value={tag}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                              >
                                {tags.map((tag) => (
                                  <MenuItem key={tag} value={tag}>
                                    <ListItemText primary={tag} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item sx={{ alignSelf: "center", width: "50%" }}>
                            <Box padding={2} >
                              <Button
                                type="submit"
                                variant="contained"
                                color="inherit"
                                sx={{ width: "100%" }}>
                                Post
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Stack>
              </form>
            ) : (
              <Box 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center" 
                padding={2} 
                bgcolor = 'primary.light' 
                sx={{ borderRadius: 3 }}
                >
                <Typography variant="h5">
                  Please login to post
                </Typography>
              </Box>
            )
          }
          <Stack>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding={2}>
              <Typography variant="h5">
                Recent Posts
              </Typography>
            </Box>
          </Stack>
          <Stack >
            <InfiniteScroll
              dataLength={currentPosts.length || 0}
              hasMore={HasMore}
              next = {() => {
                dispatch(getPagedPost(nextPage));
              } }
              loader={
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" padding={2}>
                  <h4>Loading...</h4>
                </Box>
              }
              >
              <PostsList posts={currentPosts} />
            </InfiniteScroll>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}


