import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            countdown: 5, // Para mostrar cuenta atrás
        };
        this.timer = null;
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary capturó un error', error, errorInfo);
        this.startReloadCountdown();
    }

    componentWillUnmount() {
        // Limpiar el timer si se desmonta antes de recargar
        clearInterval(this.timer);
    }

    startReloadCountdown() {
        this.timer = setInterval(() => {
            this.setState(
                ({ countdown }) => ({ countdown: countdown - 1 }),
                () => {
                    if (this.state.countdown <= 0) {
                        clearInterval(this.timer);
                        window.location.href = '/';
                    }
                }
            );
        }, 1000);
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
                        Lo siento mucho, me he equivocado. No volverá a ocurrir.
                    </h1>
                    <p className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:scale-105 transition-all shadow-lg">
                        Recargando en <strong>{this.state.countdown}</strong>…
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
