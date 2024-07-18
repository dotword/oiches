import { useState } from 'react';
import { Input } from './Input.jsx';
import {  toast, } from 'react-toastify';
import { Link } from 'react-router-dom';

export const RegisterForm = ({ className }) => {
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
            setError(
                'Error durante el registro. Porfavor intentalo de nuevo.'
            );
        }
    };

    return (
        <>
            <section className="absolute top-1 left-1/2 justify-between hidden w-1/2 p-6 lg:flex lg:text-black ">
                <button className="flex hover:text-purpleOiches gap-1">
                    <svg
                        className="self-center"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                        />
                    </svg>{' '}
                    Back
                </button>
                <p>
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="  hover:text-purpleOiches text-yellowOiches">
                        {' '}
                        Log in
                    </Link>
                </p>
            </section>
            <form onSubmit={handleSubmit} className={className}>
                <h3 className="text-4xl">Registro</h3>
                <p>Lorem ipsum dolor sit amet consectetur</p>
                <hr />
                <div className="flex gap-4 pla">
                    <label>
                        Grupo <input className='accent-purpleOiches' type="radio" name="roles" value="grupo" />
                    </label>
                    <label>
                        Sala{' '}
                        <input
                            className=' accent-purpleOiches '
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
                            placeholder="Led Zeppelin"
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
                <p>
                    <input className=' accent-purpleOiches' type="checkbox" name="terms" required /> Acepto los
                    términos y condiciones
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="p-4 w-full hover:text-white hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                >
                    Crear cuenta
                </button>
            </form>
        </>
    );
};
