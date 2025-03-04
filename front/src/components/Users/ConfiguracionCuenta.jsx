import { useState, useRef, useEffect } from 'react';
import {
    modifyUserEmailService,
    modifyUserPasswordService,
} from '../../services/Users/userEditService';
import { toast } from 'react-toastify';
import { FaPencil } from 'react-icons/fa6';

const ConfiguracionCuenta = ({ userLogged, userData, userId, token }) => {
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const emailInputRef = useRef(null); // Referencia para el input de email
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [edit, setEdit] = useState(false);

    // Manejador del clic fuera del input y del botón
    const handleOutsideClick = (event) => {
        // Asegurarnos de que el clic sea fuera del input
        if (
            emailInputRef.current &&
            !emailInputRef.current.contains(event.target) &&
            editEmail
        ) {
            setEditEmail(false); // Desactivar el modo de edición
            setNewEmail(userLogged.email); // Restaurar el email original
        }
    };

    useEffect(() => {
        if (userLogged) {
            setNewEmail(userData.user.email || ''); // Actualiza el estado del email si existe
        }
    }, [userLogged, userData.user.email]);

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };
    // Función para vaciar el input de email al hacer clic
    const handleEmailInputClick = () => {
        if (editEmail) {
            setNewEmail(''); // Vaciar el input si está en modo de edición
        }
    };

    const handleEmailButtonClick = async (e) => {
        e.preventDefault();

        if (!editEmail) {
            // Activar el modo de edición
            setEditEmail(true);
            setTimeout(() => {
                emailInputRef.current.focus();
            }, 0);
        } else {
            // Guardar el nuevo email
            try {
                const data = new FormData();
                data.append('email', newEmail);

                await modifyUserEmailService({ data, userId, token });

                toast.success('Email cambiado con éxito');
                setEditEmail(false); // Desactivar el modo de edición
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('email', userData.user.email);
            data.append('password', password);
            data.append('newPassword', newPassword);

            if (newPassword !== repeatNewPassword) {
                toast.error('Las contraseñas no coinciden');
                return;
            }

            await modifyUserPasswordService({ data, token });

            toast.success('Contraseña cambiada con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section className="w-full max-w-md bg-white overflow-hidden mt-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 mt-6">
                    Configuración de cuenta
                </h2>
            </div>

            <form className="py-4 space-y-6">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={newEmail}
                            placeholder="Introduce tu nuevo email"
                            onChange={handleEmailChange}
                            onClick={handleEmailInputClick}
                            disabled={!editEmail}
                            ref={emailInputRef}
                            className="w-[90%] bg-gray-100 form-input"
                        />
                        {editEmail && (
                            <FaPencil className="text-lg text-purple-600 absolute right-0 top-0" />
                        )}
                    </div>
                </label>

                <div className="flex gap-2">
                    <button
                        onClick={handleEmailButtonClick}
                        className={`w-[90%] px-4 py-2 text-sm text-white rounded-md ${
                            editEmail
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                        }`}
                    >
                        {editEmail ? 'Guardar nuevo email' : 'Cambiar email'}
                    </button>
                    {editEmail && (
                        <button
                            onClick={handleOutsideClick}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {edit && (
                <div className="w-full max-w-md space-y-8">
                    <h3 className="text-2xl font-light text-gray-900 mb-6 mt-6">
                        Cambiar contraseña
                    </h3>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {['current', 'new', 'repeat'].map((type) => (
                            <div key={type} className="space-y-2">
                                <label
                                    htmlFor={`${type}-password`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {type === 'current'
                                        ? 'Contraseña actual'
                                        : type === 'new'
                                        ? 'Nueva contraseña'
                                        : 'Repetir contraseña'}
                                </label>
                                <input
                                    id={`${type}-password`}
                                    type="password"
                                    value={
                                        type === 'current'
                                            ? password
                                            : type === 'new'
                                            ? newPassword
                                            : repeatNewPassword
                                    }
                                    placeholder={`Introduce tu ${
                                        type === 'current'
                                            ? 'contraseña actual'
                                            : type === 'new'
                                            ? 'nueva contraseña'
                                            : 'nueva contraseña otra vez'
                                    }`}
                                    onChange={(e) =>
                                        type === 'current'
                                            ? setPassword(e.target.value)
                                            : type === 'new'
                                            ? setNewPassword(e.target.value)
                                            : setRepeatNewPassword(
                                                  e.target.value
                                              )
                                    }
                                    required
                                    className="w-[90%] px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-[90%] px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                        >
                            Guardar nueva contraseña
                        </button>
                    </form>
                </div>
            )}

            <div className="py-4">
                <button
                    type="button"
                    className="w-[90%] px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                    onClick={() => setEdit(!edit)}
                >
                    {edit
                        ? 'Cancelar cambio de contraseña'
                        : 'Cambiar contraseña'}
                </button>
            </div>
        </section>
    );
};

export default ConfiguracionCuenta;
