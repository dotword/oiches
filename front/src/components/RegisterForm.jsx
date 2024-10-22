import { useState } from 'react';
import { Input } from './Input.jsx';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de ojo

export const RegisterForm = () => {
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña
    const [showPassword2, setShowPassword2] = useState(false); // Estado para la visibilidad de repetir contraseña

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formValues = new FormData(e.target);
            const data = {
                roles: formValues.get('roles'),
                username: formValues.get('name'),
                password: formValues.get('password'),
                email: formValues.get('email'),
            };
            const password2 = formValues.get('password2');

            if (data.password !== password2) {
                toast.error('Las contraseñas no coinciden');
                return;
            }
            const url = import.meta.env.VITE_API_URL_BASE;

            const response = await fetch(`${url}/users/registro`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            });

            const result = await response.json();
            const { status, message } = result;

            if (status === 'error') {
                toast.error(message);
            }

            if (status === 'ok') {
                toast.success(message);
            }
        } catch (err) {
            toast.error(err.message);
            setError(
                'Error durante el registro. Por favor, inténtalo de nuevo.'
            );
        }
    };

    // Función para cambiar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para cambiar la visibilidad de repetir contraseña
    const togglePassword2Visibility = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex justify-between mb-16 marker:md:justify-evenly max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20 mt-14"
            >
                <h1 className="text-4xl">Registro</h1>
                <hr className="mb-4 md:-mb-1" />
                <div className="flex gap-4">
                    <label>
                        Artista{' '}
                        <input
                            className="accent-purpleOiches"
                            type="radio"
                            name="roles"
                            value="grupo"
                        />
                    </label>
                    <label>
                        Sala{' '}
                        <input
                            className=" accent-purpleOiches "
                            type="radio"
                            required
                            name="roles"
                            value="sala"
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-5 justify-center">
                    <label htmlFor="name">
                        Username*
                        <Input
                            type="text"
                            name="name"
                            placeholder="miusername"
                            required
                            className="form-input"
                        />
                    </label>
                    <label htmlFor="email">
                        Email*
                        <Input
                            type="email"
                            name="email"
                            placeholder="Youremail@example.com"
                            required
                            className="form-input"
                        />
                    </label>

                    {/* Campo de contraseña con funcionalidad de mostrar/ocultar */}
                    <label htmlFor="password" className="relative w-full">
                        Contraseña*
                        <Input
                            type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                            name="password"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input w-full pr-10" // Añadir padding-right para que el ícono no cubra el texto
                        />
                        <span
                            onClick={togglePasswordVisibility} // Al hacer clic, cambia la visibilidad
                            className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer" //centramos el icono a la linea de texto
                        >
                            {showPassword ? (
                                <FaEye className="text-purpleOiches" /> // Ícono de ojo Abierto
                            ) : (
                                <FaEyeSlash className="text-purpleOiches" /> // Ícono de ojo Cerrado
                            )}
                        </span>
                    </label>

                    {/* Campo de repetir contraseña con funcionalidad de mostrar/ocultar */}
                    <label htmlFor="password2" className="relative w-full">
                        Repetir contraseña*
                        <Input
                            type={showPassword2 ? 'text' : 'password'} // Cambia el tipo según el estado
                            name="password2"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input w-full pr-10" // Añadir padding-right para que el ícono no tape lo escrito
                        />
                        <span
                            onClick={togglePassword2Visibility} // Al hacer clic, cambia la visibilidad
                            className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer" //centramos el icono a la linea de texto
                        >
                            {showPassword2 ? (
                                <FaEye className="text-purpleOiches" /> // Ícono de ojo cerrado
                            ) : (
                                <FaEyeSlash className="text-purpleOiches" /> // Ícono de ojo abierto
                            )}
                        </span>
                    </label>
                </div>
                <p>
                    <input
                        className="accent-purpleOiches"
                        type="checkbox"
                        name="terms"
                        required
                    />{' '}
                    Acepto la{' '}
                    <a
                        href="/politica-privacidad"
                        target="blank"
                        className="text-yellowOiches"
                    >
                        política de privacidad
                    </a>
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                >
                    Crear cuenta
                </button>
            </form>
            <Toastify />
        </>
    );
};
