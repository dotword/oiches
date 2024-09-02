import { useState } from 'react';
import { Input } from './Input.jsx';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';

export const RegisterForm = () => {
    const [error, setError] = useState(null);

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
            setError('Error durante el registro. Porfavor intentalo de nuevo.');
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex justify-between md:justify-evenly max-w-md flex-col gap-y-5 lg:w-1/3 mx-auto lg:mt-20 my-14 p-4"
            >
                <h1 className="text-4xl">Registro</h1>
                <hr />
                <div className="flex gap-4">
                    <label>
                        Grupo{' '}
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
                    <label htmlFor="password">
                        Contraseña*
                        <Input
                            type="password"
                            name="password"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input"
                        />
                    </label>
                    <label htmlFor="password2">
                        Repetir contraseña*
                        <Input
                            type="password"
                            name="password2"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                {/* <p>
                    <input
                        className=" accent-purpleOiches"
                        type="checkbox"
                        name="terms"
                        required
                    />{' '}
                    Acepto los términos y condiciones
                </p> */}
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
