import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/auth';
import { clearMessage } from "../actions/message";

export default function ButtonAppBar() {

  const { isLoggedIn } = useSelector(state => state.auth);
  const { username: currentUsername } = useSelector(state => state.profile);

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
            component={Link} to='/'
            sx={{
              mr: 4,
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

          {!["/", "/main"].includes(location.pathname)
            ? <IconButton
              aria-label="back to main"
              component={Link} to="/"
              edge='start'
              sx={{ display: { xs: 'flex', md: 'none', marginRight: '0.25em'} }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            : null
          }

          {isLoggedIn
            ? <Grid container justifyContent="flex-end">
              <Typography variant="h6" component="div" sx={{ mt: 0.4, flexGrow: 1 }}>
                Welcome, {currentUsername}!
              </Typography>
              <IconButton
                aria-label="profile icon of user"
                component={Link} to='/profile'
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-label="logout"
                component={Link} to="/login"
                color="error"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
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