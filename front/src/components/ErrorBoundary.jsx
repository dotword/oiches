import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary capturó un error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
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
                        Refresca la página y vuelve a la Home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
