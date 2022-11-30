import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UTOPIA
          </Typography>
          <Typography 
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Posts
          </Typography>
          <Button
            color="inherit"
            sx={{
              color: 'inherit',
              backgroundColor: 'primary.light'
            }}
          >
            LogIn
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}