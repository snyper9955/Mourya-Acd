import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import { getApiBaseUrl } from './utils/api'

// Configure global API base URL
axios.defaults.baseURL = getApiBaseUrl();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    
  </StrictMode>,
)

// Service Worker removed to prevent stale cache looping
