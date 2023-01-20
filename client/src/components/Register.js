import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert, FormControl } from "@mui/material";

import { register } from '../actions/auth';

export const Register = () => {
  const [username, setUsername] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    //Validate username
    if (!username.match(/^[a-zA-Z0-9]{1,25}$/)) {
      setUsernameError("The username must have a length less than or equal to 25 and can only contain alphanumeric characters.");
      return;
    } else {
      setUsernameError("");
    }
    //Validate accountName
    if (!accountName.match(/^[a-zA-Z0-9]{1,20}$/)) {
      setAccountNameError("The account name must have a length less than or equal to 20 and can only contain alphanumeric characters.");
      return;
    } else {
      setAccountNameError("");
    }
    //Validate email
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("The email is not valid.");
      return;
    } else {
      setEmailError("");
    }

    //Validate password
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      setPasswordError("The password must have at least 8 characters and contain at least one letter and one number.");
      return;
    } else {
      setPasswordError("");
    }
    dispatch(register(username, accountName, email, password))
      .then(() => {
        setUserCreated(true);
      }).catch(() => {
        setUserCreated(false);
      });
  }

  return (
    <div className="register">
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
        sx={{ backgroundColor: 'primary.main' }}
      >
        <form className="registerForm" onSubmit={handleRegister}>
          <Typography variant="h4" padding={2}>
            Sign Up
          </Typography>
          <FormControl>
            <TextField
              label="Username"
              type={'text'}
              value={username}
              required={true}
              variant="outlined"
              margin="dense"
              placeholder="Your Name"
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError !== ""}
              helperText={usernameError}
            />
            <TextField
              label="Account Name"
              type={'text'}
              value={accountName}
              required={true}
              variant="outlined"
              margin="dense"
              placeholder="@Account_Name"
              onChange={(e) => setAccountName(e.target.value)}
              error={accountNameError !== ""}
              helperText={accountNameError}
            />

            <TextField
              label="Email"
              type={'email'}
              value={email}
              required={true}
              variant="outlined"
              margin="dense"
              placeholder="yourmail@example.com"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError !== ""}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type={'password'}
              value={password}
              required={true}
              variant="outlined"
              margin="dense"
              placeholder="*************"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError !== ""}
              helperText={passwordError}
            />
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              sx={{
                marginTop: 2,
                borderRadius: 3,
                backgroundColor: 'primary.light'
              }}
            >
              Sign Me Up
            </Button>

            {message && (
              userCreated
                ? <Alert sx={{ marginTop: 2 }} severity="success" variant="filled">{message}</Alert>
                : <Alert sx={{ marginTop: 2 }} severity="error" variant="filled">{message}</Alert>
            )}

          </FormControl>
        </form>
      </Box>
    </div>
  )
}