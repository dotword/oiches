import { useState } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
// import RecoverPasswordService from '../../services/Users/RecoverPasswordService.js';
import { IoIosArrowDown } from 'react-icons/io';

const RegisterEmailForVoteForm = () => {
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const formValues = new FormData(e.target);
    //         const dataForm = {
    //             email: formValues.get('email'),
    //         };
    //         await RecoverPasswordService(dataForm);

    //         toast.success(
    //             'Se ha enviado un enlace de recuperación a tu correo electrónico'
    //         );
    //     } catch (error) {
    //         toast.error('Error al enviar el enlace de recuperación');
    //     }
    // };

    return (
        <>
            <div className="w-full">
                <div
                    className="cursor-pointer transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 className="flex justify-between items-center max-w-72 mx-auto mb-4 text-white bg-black px-3 py-2 rounded-lg text-lg font-semibold">
                        <span>Inscribe tu email para votar</span>
                        <IoIosArrowDown className="w-5 h-5" />
                    </h3>
                </div>
                {isOpen && (
                    <div className="mt-2 bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 mb-6 text-center">
                        <p>
                            1. Introduce tu email en el formulario y recibirás
                            un correo para verificar tu dirección.
                        </p>
                        <p>
                            2. Ya puedes votar a tus 3 artistas/grupos favoritos
                        </p>
                        <form
                            // onSubmit={handleSubmit}
                            className="flex justify-between md:justify-evenly max-w-md flex-col gap-5 p-2 md:w-1/3 mx-auto my-6"
                        >
                            <div className="flex flex-col gap-5 justify-center">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Introduce tu email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />

                                <button
                                    type="submit"
                                    className="button py-3 font-semibold"
                                >
                                    Validar email
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <Toastify />
        </>
    );
};

export default RegisterEmailForVoteForm;
