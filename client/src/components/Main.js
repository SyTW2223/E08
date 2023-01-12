import React from "react";
import { useState } from "react";
import { Stack, Box, Container, Typography, Paper, TextField, FormControl, Grid, Autocomplete, Button } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
// import { PostsList } from "./posts/PostsList";

const tags = [
  { label: 'Science' },
  { label: 'Computers' },
  { label: 'Gaming' },
  { label: 'Sports' },
  { label: 'Music' }
]


export const Main = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);

  return (
    <div className="mainContent">
      <Box marginY="2em" sx={{ width: '100%' }}>
        <Container
          sx={{
            backgroundColor: "#ffff",
            borderRadius: 3
          }}>
          <Stack>
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <MessageIcon fontSize="large" sx={{marginTop:"10px"}} />
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
                      <Autocomplete
                        multiple
                        value= {tag}
                        options={tags}
                        sx={{ width: "100%" }}
                        required={true}
                        onChange={(e) => setTag(e.target.value)}
                        renderInput={(params) => <TextField {...params} label="Tags" />} />
                    </Grid>
                    <Grid item sx={{alignSelf: "center", width:"50%"}}>
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


