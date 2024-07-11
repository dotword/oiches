import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import { AuthProvider } from './authContext.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <AuthProvider>
    <App />
    </AuthProvider>
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> 48f1105a2bc72be31174a62754ce17f7f5c4ddf1
  </React.StrictMode>,
)
