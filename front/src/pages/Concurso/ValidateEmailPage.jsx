import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from '../../components/Toastify.jsx';

const ValidateEmailPage = () => {
    const { verification_token } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL_BASE;

    useEffect(() => {
        const validateToken = async () => {
            if (!verification_token) {
                toast.error('Token no válido o faltante');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${url}/concurso/validate_email/${verification_token}`
                );

                const result = await response.json();

                if (response.ok && result.status === 'ok') {
                    toast.success(
                        'Email verificado correctamente. Ya puedes votar 🎉'
                    );
                } else {
                    toast.error(
                        result.message || 'No se pudo verificar el email'
                    );
                }
            } catch (error) {
                toast.error('Error al verificar el email');
            } finally {
                setLoading(false);
                // Opcional: redirigir después de unos segundos
                setTimeout(() => navigate('/votacion-concurso-Oiches'), 2000);
            }
        };

        validateToken();
    }, [verification_token, url, navigate]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center text-center p-4">
            {loading ? (
                <p className="text-lg font-medium">Verificando tu email...</p>
            ) : (
                <p className="text-lg font-medium">
                    Redirigiéndote o vuelve al sitio para votar
                </p>
            )}

            <Toastify />
        </div>
    );
};

export default ValidateEmailPage;
