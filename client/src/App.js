import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
// import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'

// Más adelante haremos que la barra cambie según el estado
import Navbar from './components/Navbar';

import { PostsList } from './components/posts/PostsList';
import { Login } from './components/Login';

function App() {
    return(
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element = {<PostsList />}/>
            <Route path="/home" element = {<PostsList />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<PostsList />}/>
            <Route path="/profile" element = {<PostsList />}/>
          </Routes>
        </div>
      </Router> 
    )
}

export default App;
