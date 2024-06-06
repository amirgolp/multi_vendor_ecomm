import React from 'react'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import ReactQueryProvider from './contextProviders/QueryClientProvider.tsx'
import { ThemeProvider, useTheme } from './contextProviders/ThemeContext.tsx'
import Login from './pages/Login'
import Signup from './pages/Signup.tsx'

const AppContent: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme()

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/signup">Sign-Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

const App: React.FC = () => (
  <ReactQueryProvider>
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  </ReactQueryProvider>
)

export default App
