import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

export default function ButtonAppBar() {

  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

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

          {isLoggedIn
            ? <div>
                <Typography>
                  Estas logeado
                </Typography>
                <Button
                  onClick={handleLogout}
                  component={Link} to="/login"
                  color="inherit"
                  sx={{
                    color: 'inherit',
                    backgroundColor: 'primary.light'
                  }}
                >
                  Sign out
                </Button>
              </div>
            : <Button
                component={Link} to='/login'
                color="inherit"
                sx={{
                  color: 'inherit',
                  backgroundColor: 'primary.light'
                }}
              >
                Login
              </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}