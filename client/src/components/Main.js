import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  Stack, Box, Container, Typography, Paper, 
  TextField, FormControl, Grid,  Button, 
  InputLabel, Select, MenuItem, OutlinedInput, ListItemText
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

import { setPosts } from '../actions/post';

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
  const { user: currentUser } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  console.log(postCreate);

  const handlePost = (e) => {
    e.preventDefault();
    console.log("handlePost");
    console.log(currentUser.accountName, title, content, tag);
    const nameAcount = currentUser.accountName;
    dispatch(setPosts(nameAcount, title, content, tag).then(() => {
        setPostCreate(true);
      }).catch(() => {
        setPostCreate(false);
      }));
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
            borderRadius: 3
          }}>
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
          <Stack>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding={2}>
              <Typography variant="h5">
                Recent Posts
              </Typography>
            </Box>
          </Stack>
          <Stack >

          </Stack>
        </Container>
      </Box>
    </div>
  )
}


