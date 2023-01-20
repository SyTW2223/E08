import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Avatar from '@mui/material/Avatar';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/auth';
import { profile } from '../actions/profile';
import { clearMessage } from "../actions/message";
import { getTokenExpiration } from "../helpers";

import userAvatar from '../assets/images/user_profile_icon.png';

export default function ButtonAppBar() {
  let navigate = useNavigate();

  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector(state => state.auth);
  const currentProfile = useSelector(state => state.profile);

  const [profileLoaded, setProfileLoaded] = useState(false);

  const dispatch = useDispatch();
  let location = useLocation();

  const handleLogout = React.useCallback(() => {
    setProfileLoaded(false);
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      // Se limpia los mensajes del servidor después de renderizar
      dispatch(clearMessage());
    }
    if (isLoggedIn) {
      dispatch(profile(currentUser.accountName))
        .then(() => {
          setProfileLoaded(true);
        }).catch(() => {
          const tokenExpiration = getTokenExpiration(currentUser.accessToken);
          if (tokenExpiration < new Date()) {
            handleLogout();
          }
          setProfileLoaded(false);
        });
    }
  }, [dispatch, location, isLoggedIn, currentUser, handleLogout]);

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

          {!["/", "/home"].includes(location.pathname)
            ? <IconButton
              aria-label="back to main"
              component={Link} to="/"
              edge='start'
              sx={{ display: { xs: 'flex', md: 'none', marginRight: '0.25em' } }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            : null
          }

          {isLoggedIn && profileLoaded
            ? <Grid container justifyContent="flex-end">
              <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, mt: 0.4, flexGrow: 1 }}>
                Welcome, {currentProfile.username}!
              </Typography>
              <Grid item paddingRight={1}>
                <Avatar
                  alt="link to profile"
                  src={currentProfile.profilePicture || userAvatar}
                  component={Link} to='/profile'
                />
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="logout"
                  component={Link} to="/login"
                  color="error"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </Grid>
            </Grid>
            : <Grid container justifyContent="flex-end">
              <Grid item>
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
            </Grid>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}