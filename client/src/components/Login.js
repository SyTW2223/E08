import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button } from "@mui/material";

import { Link } from 'react-router-dom';

import { login } from '../actions/auth';

export const Login = () => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="login">
      <form className="loginForm">
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
          <Button 
            sx={{
              marginTop: 2,
              borderRadius: 3,
              backgroundColor: 'primary.light'
            }}
            variant="contained"
            color="inherit"
            onClick={() => {
              dispatch(login(accountName, password))
                .then(() => {
                  console.log('Usuario encontrado');
                }).catch(() => {
                  console.log('Error con contraseña o usuario');
                });
            }}
          >
            Login
          </Button>
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