import { useState } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { IoIosArrowDown } from 'react-icons/io';

const ValidateEmailWithCodeForm = () => {
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_API_URL_BASE;

    const handleSubmit = async (e) => {
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
        <div>
            <div
                className="cursor-pointer transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="flex justify-between items-center max-w-72 mx-auto mb-4 text-white bg-black p-2 rounded-lg font-semibold">
                    <span>¿Tienes el código de verificación?</span>
                    <IoIosArrowDown className="w-5 h-5" />
                </h3>
            </div>
            {isOpen && (
                <div className="mt-2 bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 mb-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        Si recibiste un email pero no hiciste clic en el enlace,
                        puedes introducir el código aquí:
                    </p>

                    <form
                        onSubmit={handleSubmit}
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
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Validando...' : 'Validar código'}
                        </button>
                    </form>
                </div>
            )}
            <Toastify />
        </div>
    );
};

export default ValidateEmailWithCodeForm;
