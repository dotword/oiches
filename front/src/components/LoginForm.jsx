import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import { Input } from './Input.jsx';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { loginUserService } from '../services/loginUserService.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Iconos ojos

export const LoginForm = () => {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad

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
            navigate(`/users/account/${data.tokenInfo.id}`);
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
                    <label htmlFor="password" className="relative">
                        Contraseña*
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Introduce tu contraseña"
                                required
                                className="form-input pr-10" // Agrega padding para el botón de ojo
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                style={{ top: '7px ' }}
                                onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
                            >
                                {showPassword ? (
                                    <FaEye className="text-purpleOiches" /> // Ícono de ojo cerrado
                                ) : (
                                    <FaEyeSlash className="text-purpleOiches" /> // Ícono de ojo abierto
                                )}
                            </button>
                        </div>
                    </label>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                >
                    Iniciar sesión
                </button>
                <p className="mb-4 text-center">
                    <Link
                        to="/users/password/recover"
                        className="hover:text-purpleOiches font-semibold text-yellowOiches"
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
