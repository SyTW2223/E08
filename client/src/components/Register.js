import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert } from "@mui/material";

import { register } from '../actions/auth';

export const Register = () => {
  const [username, setUsername] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(register(username, accountName, email, password))
      .then(() => {
        setUserCreated(true);
      }).catch(() => {
        setUserCreated(false);
      });
  }

  return (
    <div className="register">
      <form className="registerForm">
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
            Sign Up
          </Typography>
          <TextField
            label="Username"
            type={'text'}
            value={username}
            variant="outlined"
            margin="dense"
            placeholder="Your Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField 
            label="Account Name"
            type={'text'}
            value={accountName}
            variant="outlined"
            margin="dense"
            placeholder="@Account_Name"
            onChange={(e) => setAccountName(e.target.value)}
          />
          <TextField
            label="Email"
            type={'email'}
            value={email}
            variant="outlined"
            margin="dense"
            placeholder="yourmail@example.com" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={'password'}
            value={password}
            variant="outlined"
            margin="dense"
            placeholder="*************" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginTop: 2,
              borderRadius: 3,
              backgroundColor: 'primary.light'
            }}
            onClick={handleRegister}
          >
            Sign Me Up
          </Button>

          {message && (
            userCreated 
              ? <Alert sx ={{marginTop: 2}} severity="success" variant="filled">{message}</Alert>
              : <Alert sx ={{marginTop: 2}} severity="error" variant="filled">{message}</Alert>
          )}
        </Box>
      </form>
    </div>
  )
}