import React from "react";
import { Paper, Stack, Box, Container, Typography, Grid } from "@mui/material";

export const Main = () => {
  return (
    <div className="mainContent">
      <Box marginY="2em" sx={{ width: '100%' }}>
        <Container
          sx={{
            backgroundColor: "#ffff",
            borderRadius: 3
          }}>
          <Box sx={{paddingTop:"2em"}}>
            <Typography variant="h4">
              Posts Destacados:
            </Typography>
          </Box >
          <Stack spacing={2} mt={2}>
            <Paper elevation={5}>
              <Box marginY="1em" marginLeft="1em"  marginRight="1em"  sx={{ width: '100%' }}>
                <Grid>
                  <Grid>
                    <Typography variant="h6">
                      Nombre del usuario 
                    </Typography>
                  </Grid>
                  <Grid md="auto" sx={{marginLeft:"1em",  marginRight:"1em"}}>
                    <Typography > 
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Typography>
                  </Grid>
                  <Grid sx={{justifyContent: "right"}}>
                    <Box display="flex" >
                      hola
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              
            </Paper>
            <Paper elevation={5}>
              <article className="post-excerpt">
                <h3>"aaaaa"</h3>
                <p className="post-content">"bbbbbbb"</p>
              </article>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}


