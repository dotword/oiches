import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "./Input.jsx";
import { recoverPasswordService } from '../services/recoverPasswordService.jsx';

const RecoverPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await recoverPasswordService({ email });
            setSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico');
            toast.success('Enlace de recuperación enviado');
        } catch (error) {
            setError(error.message);
            toast.error('Error al enviar el enlace de recuperación');
        }
    };

    return (
        <>
            <section>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3>Recuperar contraseña</h3>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <hr />
                        <div>
                            <label htmlFor="email">
                                Correo electrónico*
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Introduce tu correo electrónico"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                        <button
                            type="submit"
                        >
                            Enviar enlace de recuperación
                        </button>
                        <p>
                            <Link to="/login">
                                Volver al inicio de sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};

export default RecoverPasswordForm;
