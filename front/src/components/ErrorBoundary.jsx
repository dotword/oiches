import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary capturó un error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
                    <FaCrown className="text-yellow-500" size={50} />
                    <h1 className="text-2xl mt-4">
                        Lo siento mucho, me he equivocado; no volverá a ocurrir.
                    </h1>
                    <Link
                        to="/"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Volver a la Home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
