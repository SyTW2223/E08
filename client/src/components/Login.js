import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";


export const Login = () => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");


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
          <Typography variant="h4" padding={3} textAling="center">
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
          >
            Login
          </Button>
          <Typography marginTop={1}>
            Don't have an account?
          </Typography>
          <Button 
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