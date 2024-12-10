import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../../assets/Live.jpg';
import { motion } from 'framer-motion';
import Seo from '../../components/SEO/Seo.jsx';

const UserValidationPage = () => {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const { registrationCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const validateUser = async () => {
            try {
                const url = `${
                    import.meta.env.VITE_API_URL_BASE
                }/users/validate/${registrationCode}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();

                if (response.status === 200) {
                    setStatus(result.status);
                    setMessage(result.message);
                    toast.success(result.message);
                } else if (response.status === 409) {
                    setStatus('error');
                    setMessage('El usuario ya está activado');
                    toast.info('El usuario ya está activado');
                } else {
                    setStatus('error');
                    setMessage(result.message);
                    toast.error(result.message);
                }
            } catch (error) {
                setStatus('error');
                setMessage(
                    'Error durante la validación. Por favor, inténtalo de nuevo.'
                );
                toast.error('Error durante la validación');
            }
        };

        validateUser();
    }, [registrationCode]);

    const handleRedirect = () => {
        if (status === 'ok') {
            navigate('/login');
        } else {
            navigate('/register');
        }
    };

    if (status === null) return <p>Validando usuario...</p>;

    return (
        <>
            {/* SEO Configuración */}
            <Seo
                title="Validación de Usuario - Oiches"
                description="Completa la validación de tu cuenta en Oiches y accede a una experiencia personalizada en la plataforma."
                url={`https://oiches.com/validar-usuario/${registrationCode}`}
                keywords="validación de usuario, Oiches, activación de cuenta"
                noIndex={true} // Evitamos indexar una página temporal
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-gradient-to-t bg-opacity-50 z-50"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    opacity: '0.9',
                }}
            >
                <ToastContainer />
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-xl mb-4">
                        {status === 'ok'
                            ? 'Validación Exitosa'
                            : 'Validación Fallida'}
                    </h2>
                    <p className="mb-4">{message}</p>
                    <button
                        onClick={handleRedirect}
                        className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        {status === 'ok' ? 'Ir al Login' : 'Intentar de Nuevo'}
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default UserValidationPage;
