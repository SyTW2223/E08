import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/auth';
import { clearMessage } from  "../actions/message";

export default function ButtonAppBar() {

  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  React.useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      // Se limpia los mensajes del servidor después de renderizar
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link} to='/'
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UTOPIA 
          </Typography>
          
          {isLoggedIn
            ? <Grid container justifyContent="flex-end">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Welcome 
                </Typography>
                <Button
                  onClick={handleLogout}
                  component={Link} to="/login"
                  color="error"
                  variant='outlined'
                >
                  Sign out
                </Button>
              </Grid>
            : <Grid container justifyContent="flex-end">
                <Button
                  component={Link} to='/login'
                  color="inherit"
                  sx={{
                    color: 'inherit',
                    backgroundColor: 'primary.light'
                  }}
                >
                  Login
                </Button>
              </Grid>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}