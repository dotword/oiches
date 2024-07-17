import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const UserValidationPopup = () => {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const { registrationCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const validateUser = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL_BASE}/users/validate/${registrationCode}`;
                const response = await fetch(url, {
                    method: 'GET',
                });
                const result = await response.json();

                setStatus(result.status);
                setMessage(result.message);

                // Redirigir al usuario al login u otra página si la validación es exitosa
                if (result.status === 'ok') {
                    navigate('/login');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Error durante la validación. Por favor, inténtalo de nuevo.');
            }
        };

        validateUser();
    }, [registrationCode, navigate]);

    const handleRedirect = () => {
        if (status === 'ok') {
            navigate('/login'); // Redirigir al login u otra página
        } else {
            setStatus(null); // Limpiar el estado si no es 'ok'
        }
    };

    if (status === null) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">{status === 'ok' ? 'Validación Exitosa' : 'Validación Fallida'}</h2>
                <p className="mb-4">{message}</p>
                <button
                    onClick={handleRedirect}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    {status === 'ok' ? 'Ir al Login' : 'Cerrar'}
                </button>
            </div>
        </div>
    );
};

