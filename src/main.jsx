/**
 * main.jsx
 * Entry point for Sheeva AI Assistant application
 * @author Your Name
 * @version 1.0.0
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'

/**
 * Render the application with UserContext provider
 * This wraps the entire app with context for state management
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </StrictMode>,
)