import { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import {
    modifyUserAvatarService,
    modifyUserEmailService,
    modifyUserPasswordService,
} from '../../services/Users/userEditService.js';
import userIcon from '/DefaultProfile2.png';
import { FaPencilAlt } from 'react-icons/fa';
import UsersSalaGrupoList from './UsersSalaGrupoList.jsx';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser.jsx';
import { FaPencil } from 'react-icons/fa6';
// import AgenciaCreacion from '../Agencias/AgenciaCreacion.jsx';
import AgenciaGestion from '../Agencias/AgenciaGestion.jsx';

const AuthUser = () => {
    const { userLogged, token, loading, signOut } = useContext(AuthContext);
    const { userId } = useParams();
    const userData = useUser(userId);
    const [avatar, setAvatar] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const emailInputRef = useRef(null); // Referencia para el input de email
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [edit, setEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { VITE_API_URL_BASE } = import.meta.env;
    const navigate = useNavigate();

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

    if (loading) {
        return <h2 className="text-center text-xl">Cargando...</h2>;
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${VITE_API_URL_BASE}/users/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response.ok) {
                toast.success('Eliminando cuenta con éxito');
                setTimeout(() => {
                    signOut();
                    navigate('/');
                }, 3000);
            } else {
                toast.error('Error al eliminar la cuenta');
            }
        } catch (error) {
            toast.error('Error al eliminar la cuenta');
        }
    };

    const handleConfirm = () => {
        handleDelete();
        setModalOpen(false);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('avatar', avatar);

            await modifyUserAvatarService({ data, userId, token });

            toast.success('Avatar cambiado con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

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

    return (userLogged && userLogged.id === userId) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <>
            <div className="w-11/12 mx-auto mb-12">
                <section className="mb-4 flex flex-col items-center gap-2 md:self-start">
                    <p className="font-semibold text-2xl text-gray-900">
                        {userData.user.username}
                    </p>
                    <form onSubmit={handleAvatarSubmit}>
                        <div className="sect-photo w-40 h-40">
                            <FaPencilAlt className="absolute right-8 text-gray-900 text-2xl z-10" />
                            <span className="border-photos rounded-full">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Vista previa"
                                        className="w-40 h-40 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={
                                            userData.user.avatar
                                                ? `${
                                                      import.meta.env
                                                          .VITE_API_URL_BASE
                                                  }/uploads/${
                                                      userData.user.avatar
                                                  }`
                                                : userIcon
                                        }
                                        alt="avatar"
                                        className="w-40 h-40 object-cover"
                                    />
                                )}
                                <input
                                    type="file"
                                    name="avatar"
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleAvatarChange}
                                />
                            </span>
                        </div>
                        {previewUrl && (
                            <div className="mt-3 max-w-80 text-center">
                                <input
                                    type="submit"
                                    value="Cambiar avatar"
                                    className="btn-account max-w-44"
                                />
                            </div>
                        )}
                    </form>
                    {userLogged &&
                    userLogged.roles === 'admin' &&
                    userLogged.id === userId ? (
                        <Link
                            to="/admin-dashboard"
                            className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform mt-8 hover:scale-105"
                        >
                            Admin Dashboard
                        </Link>
                    ) : (
                        ''
                    )}
                </section>

                {userLogged && userData.user.roles !== 'agencia' && (
                    <UsersSalaGrupoList
                        userLogged={userLogged}
                        token={token}
                        userOwner={userData}
                    />
                )}

                {userLogged && userData.user.roles === 'agencia' && (
                    <AgenciaGestion
                        userLogged={userLogged}
                        token={token}
                        userOwner={userData}
                    />
                )}
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
                                {editEmail
                                    ? 'Guardar nuevo email'
                                    : 'Cambiar email'}
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
                            <form
                                onSubmit={handlePasswordSubmit}
                                className="space-y-4"
                            >
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
                                                    ? setPassword(
                                                          e.target.value
                                                      )
                                                    : type === 'new'
                                                    ? setNewPassword(
                                                          e.target.value
                                                      )
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
                    <div className="text-black">
                        <p className="font-semibold text-lg mt-40">
                            Eliminar cuenta
                        </p>
                        <p className="text-sm">
                            Esta acción es irreversible. Todos tus datos serán
                            eliminados permanentemente.
                        </p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="btn-account max-w-44 min-w-32 bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
                    >
                        Eliminar cuenta
                    </button>
                </section>
            </div>
            <Toastify />
            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text="¿Estás seguro que quieres eliminar tu cuenta? Se borrarán todos los datos asociados a tu cuenta: grupos, salas, imágenes, votos, etc..."
                    onConfirm={handleConfirm}
                    onCancel={() => setModalOpen(false)}
                    classConfirm={'bg-red-500'}
                />
            )}
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AuthUser;
