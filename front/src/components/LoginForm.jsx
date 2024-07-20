import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import { Input } from './Input.jsx';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { loginUserService } from '../services/loginUserService.jsx';

export const LoginForm = () => {
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { signIn } = auth;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formValues = new FormData(e.target);
            const dataForm = {
                password: formValues.get('password'),
                email: formValues.get('email'),
            };
            const { data } = await loginUserService(dataForm);
            signIn(data.token, data.user);
            toast.success('Inicio de sesión exitoso');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error('Error al iniciar sesión');
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex justify-between md:justify-evenly max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20 mt-14"
            >
                <h1 className="text-4xl">Iniciar sesión</h1>
                <p>Lorem ipsum dolor sit amet consectetur</p>
                <hr />
                <div className="flex flex-col gap-5 justify-center">
                    <label htmlFor="email">
                        Email*
                        <Input
                            type="email"
                            name="email"
                            placeholder="Introduce tu email"
                            required
                            className="form-input"
                        />
                    </label>
                    <label htmlFor="password">
                        Contraseña*
                        <Input
                            type="password"
                            name="password"
                            placeholder="Introduce tu contraseña"
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                >
                    Iniciar sesión
                </button>
                <p className="mt-4 text-center">
                    <Link
                        to="/recover-password"
                        className="hover:text-purpleOiches text-yellowOiches"
                    >
                        Recuperar contraseña
                    </Link>
                </p>
            </form>
            <Toastify />
        </>
    );
};

export default LoginForm;
