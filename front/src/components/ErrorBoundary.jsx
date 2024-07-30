import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();

    // Limpiar el estado de error al cambiar la ubicación
    useEffect(() => {
        setHasError(false);
    }, [location]);

    const componentDidCatch = (error, errorInfo) => {
        setHasError(true);
        console.error('ErrorBoundary capturó un error', error, errorInfo);
    };

    if (hasError) {
        return (
            <div
                className="flex flex-col items-center justify-center min-h-screen"
                style={{ backgroundColor: '#121212', color: '#FFFFFF' }}
            >
                <img
                    src="/Horizontal_blanco.webp"
                    alt="Logo de Oiches"
                    className="mt-4"
                />
                <h1 className="text-2xl mt-4">
                    Lo siento mucho, me he equivocado; no volverá a ocurrir.
                </h1>
                <Link
                    to="/"
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:scale-105 transition-all shadow-lg"
                >
                    Volver a la Home
                </Link>
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;
