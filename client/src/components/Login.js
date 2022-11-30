import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";


export const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="login">
      <form className="loginForm">
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
        >
          <Typography variant="h3" padding={3} textAling="center">
            Login
          </Typography>
          <TextField 
            type={'text'}
            value={name}
            variant="outlined"
            margin="dense"
            placeholder="Name" 
            onChange={(e) => setName(e.target.value)}
          />
          <TextField 
            type={'email'}
            value={email}
            variant="outlined"
            margin="dense"
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            type={'password'}
            value={password}
            variant="outlined"
            margin="dense"
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button sx={{marginTop: 2, borderRadius: 3}} variant="contained" color="warning">
            Login
          </Button>
          <Button sx={{marginTop: 2, borderRadius: 3}}>
            Sign In Now
          </Button>
        </Box>
      </form>
    </div>
  )
}