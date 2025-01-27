import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/auth/AuthContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { HelmetProvider } from 'react-helmet-async'; //importacion de HelmetProvider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <AuthContextProvider>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </AuthContextProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);
