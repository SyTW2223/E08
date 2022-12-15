import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

// Más adelante haremos que la barra cambie según el estado
import Navbar from './components/Navbar';

import { Login } from './components/Login';
import { Register } from './components/Register';
import { Main } from './components/Main';

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
              <Route path="/" element = {<Main />}/>
              <Route path="/home" element = {<Main />}/>
              <Route path="/login" element = {<Login />}/>
              <Route path="/register" element = {<Register />}/>
              <Route path="/profile" element = {<Main />}/>
            </Routes>
        </Router>
      </ThemeProvider>
    )
}

export default App;
