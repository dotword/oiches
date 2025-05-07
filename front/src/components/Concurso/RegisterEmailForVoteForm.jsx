import { useState } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { IoIosArrowDown } from 'react-icons/io';

const RegisterEmailForVoteForm = () => {
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_API_URL_BASE;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formValues = new FormData(e.target);
            const dataForm = {
                email: formValues.get('email'),
            };

            const response = await fetch(
                `${url}/concurso/vote/verification-code`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(dataForm),
                }
            );

            const result = await response.json();

            if (response.ok && result.status === 'ok') {
                toast.success(
                    'Te hemos enviado un correo con el enlace para validar tu email y poder votar'
                );
            } else {
                toast.error(
                    result.message || 'Hubo un problema al registrar tu email'
                );
            }
        } catch (error) {
            toast.error('Error al enviar el enlace de recuperación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                className="cursor-pointer transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="flex justify-between items-center max-w-72 mx-auto mb-4 text-white bg-black p-2 rounded-lg font-semibold">
                    <span>Inscribe tu email para votar</span>
                    <IoIosArrowDown className="w-5 h-5" />
                </h3>
            </div>
            {isOpen && (
                <div className="mt-2 bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 mb-6 text-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-between md:justify-evenly flex-col gap-5 p-2 my-6"
                    >
                        <div className="flex flex-col gap-5 justify-center">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Introduce tu email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input max-w-md mx-auto"
                            />
                            <div className="">
                                <input
                                    type="checkbox"
                                    name="basesConfirmed"
                                    required
                                />{' '}
                                Acepto la{' '}
                                <a
                                    href="/politica-votacion"
                                    target="_blank"
                                    className="underline"
                                >
                                    Política de privacidad y participación
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`button py-3 font-semibold transition ${
                                    loading
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                {loading ? 'Enviando...' : 'Validar email'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <Toastify />
        </div>
    );
};

export default RegisterEmailForVoteForm;
