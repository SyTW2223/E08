import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

// Más adelante haremos que la barra cambie según el estado
import Navbar from './components/Navbar';

import { PostsList } from './components/posts/PostsList';
import { Login } from './components/Login';
import { Register } from './components/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E4F9F5',
      light: '#A0E4CB',
      dark: '#0D4C92'
    },
    background: {
      default: '#40514E'
    }
  }
})

function App() {
    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
            <Routes>
              <Route path="/" element = {<PostsList />}/>
              <Route path="/home" element = {<PostsList />}/>
              <Route path="/login" element = {<Login />}/>
              <Route path="/register" element = {<Register />}/>
              <Route path="/profile" element = {<PostsList />}/>
            </Routes>
        </Router>
      </ThemeProvider>
    )
}

export default App;
