import { useState } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { IoIosArrowDown } from 'react-icons/io';

const ValidateEmailWithCodeForm = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenValidate, setIsOpenValidate] = useState(false);
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

    const handleValidateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${url}/concurso/validate_email/${code}`,
                {
                    method: 'GET',
                }
            );

            const result = await response.json();

            if (response.ok && result.status === 'ok') {
                toast.success(
                    'Email verificado correctamente. Ya puedes votar 🎉'
                );
            } else {
                toast.error(result.message || 'Código inválido o expirado');
            }
        } catch (error) {
            toast.error('Hubo un error al validar tu código');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="grid mb-8 justify-center gap-4 md:gap-8 md:flex md:flex-wrap">
                <div
                    className="cursor-pointer transition max-md:order-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 className="flex justify-between items-center max-w-72 mx-auto mb-4 text-white bg-black p-2 rounded-lg font-semibold">
                        <span>Inscribe tu email para votar</span>
                        <IoIosArrowDown className="w-5 h-5" />
                    </h3>
                </div>

                <div
                    className="cursor-pointer transition max-md:order-3"
                    onClick={() => setIsOpenValidate(!isOpenValidate)}
                >
                    <h3 className="flex justify-between items-center max-w-72 mx-auto mb-4 text-white bg-black p-2 rounded-lg font-semibold">
                        <span>¿Tienes el código de verificación?</span>
                        <IoIosArrowDown className="w-5 h-5" />
                    </h3>
                </div>

                {isOpen && (
                    <div className="w-full max-md:order-2">
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto max-w-xl bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 text-center selection:flex justify-between flex-col gap-5"
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
                {isOpenValidate && (
                    <div className="w-full max-md:order-4">
                        <div className="mx-auto max-w-xl bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 text-center selection:flex justify-between flex-col gap-5">
                            <p className="text-sm text-gray-600 mb-4">
                                Si recibiste un email pero no hiciste clic en el
                                enlace, puedes introducir el código aquí:
                            </p>

                            <form
                                onSubmit={handleValidateSubmit}
                                className="flex flex-col items-center gap-4 max-w-sm mx-auto"
                            >
                                <input
                                    type="text"
                                    name="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Código de verificación"
                                    required
                                    className="form-input w-full"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`button w-full py-3 font-semibold ${
                                        loading
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    {loading
                                        ? 'Validando...'
                                        : 'Validar código'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Toastify />
        </>
    );
};

export default ValidateEmailWithCodeForm;
