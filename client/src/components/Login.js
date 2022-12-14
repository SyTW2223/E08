import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { LoadingButton } from '@mui/lab/';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import { login } from '../actions/auth';

export const Login = () => {
  let navigate = useNavigate();

  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); 

    dispatch(login(accountName, password))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  }

  if (isLoggedIn) {
    return <Navigate to ="/" />;
  }

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <Box
          display="flex"
          color="primary"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          sx={{backgroundColor: 'primary.main'}}
        >
          <Typography variant="h4" padding={3}>
            Login
          </Typography>
          <TextField
            label="Account Name"
            type={'text'}
            value={accountName}
            variant="outlined"
            margin="dense"
            placeholder="@AccountName"
            onChange={(e) => setAccountName(e.target.value)}
          />
          <TextField
            label="Password"
            type={'password'}
            value={password}
            variant="outlined"
            margin="dense"
            placeholder="***********" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            type="submit"
            color="inherit"
            sx={{
              marginTop: 2,
              borderRadius: 3,
              backgroundColor: 'primary.light'
            }}
            loading={loading}
            variant="contained"
          >
            Login
          </LoadingButton>
            
          {message && (
            <Alert sx ={{marginTop: 2}} severity="error" variant="filled">{message}</Alert>
          )}

          <Typography marginTop={1}>
            Don't have an account?
          </Typography>
          <Button
            component={Link} to='/register'
            sx={{
              marginTop: 1,
              borderRadius: 3,
              backgroundColor: 'primary.light'
            }}
            variant="contained"
            color="inherit"
          >
            Sign Up Now
          </Button>
        </Box>
      </form>
    </div>
  )
}