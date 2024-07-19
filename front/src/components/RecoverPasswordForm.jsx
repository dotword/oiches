import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from './Input.jsx';
import RecoverPasswordService from '../services/RecoverPasswordService.js';

const RecoverPasswordForm = ({ className }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formValues = new FormData(e.target);
            const dataForm = {
                email: formValues.get('email'),
            };
            await RecoverPasswordService(dataForm);

            setSuccess(
                'Se ha enviado un enlace de recuperación a tu correo electrónico'
            );
            toast.success('Enlace de recuperación enviado');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error('Error al enviar el enlace de recuperación');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <h1 className="text-4xl">Recupera tu acceso</h1>
            <p>
                ¿Olvidaste o perdiste tu contraseña? Escribe tu correo y te
                enviaremos un link para resetearla
            </p>
            <div className="flex flex-col gap-5 justify-center">
                <label htmlFor="email">Email*</label>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />
                <button
                    type="submit"
                    className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                >
                    Enviar enlace
                </button>
            </div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </form>
    );
};

export default RecoverPasswordForm;
