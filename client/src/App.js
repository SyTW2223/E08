import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

import Navbar from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Main } from './components/Main';
import { Profile } from './components/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E4F9F5',
      light: '#A0E4CB',
      dark: '#0D4C92'
    },
    secondary: {
      main: '#40514E'
    },
    background: {
      default: '#40514E'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
