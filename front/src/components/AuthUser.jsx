import { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/auth.context';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import {
    modifyUserAvatarService,
    modifyUserEmailService,
    modifyUserPasswordService,
} from '../services/userEditService';
import { ListarReservas } from '../components/ListarReservas.jsx';
import userIcon from '/DefaultProfile2.png';
import { FaPencilAlt } from 'react-icons/fa';
import UsersSalaGrupoList from './UsersSalaGrupoList.jsx';
// import UsersSalaGrupoList from './DeleteUserSalaGrupo.jsx';
import { ConfirmationModal } from './ConfirmModal.jsx';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser.jsx';

const AuthUser = () => {
    const { userLogged, token, loading } = useContext(AuthContext);
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
            // setUserId(userLogged.id); // Actualiza el ID del usuario
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
                emailInputRef.current.focus(); // Poner el foco en el input de email
            }, 0); // Asegúrate de que el setEditEmail se complete antes de poner el foco
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
            <div className="md:max-w-3xl md:mx-auto mb-12">
                <section className="mb-4 flex flex-col items-center gap-2 md:self-start">
                    <p className="font-semibold text-lg">
                        {userData.user.username}
                    </p>
                    <form onSubmit={handleAvatarSubmit}>
                        <div className="sect-photo w-40 h-40">
                            <FaPencilAlt className="absolute right-4 text-greyOiches text-2xl z-10" />
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

                <UsersSalaGrupoList
                    userLogged={userLogged}
                    token={token}
                    userOwner={userData}
                />

                <section className="flex flex-col mb-4 py-6 items-center gap-2 border-b-2 border-greyOiches-50">
                    <form className="flex flex-col justify-center gap-2 w-full">
                        <input
                            type="email"
                            name="email"
                            value={newEmail}
                            placeholder="Introduce tu nuevo email"
                            onChange={handleEmailChange}
                            onClick={handleEmailInputClick}
                            disabled={!editEmail}
                            ref={emailInputRef}
                            className="form-input max-w-96 m-auto bg-transparent text-center"
                        />
                        <button
                            onClick={handleEmailButtonClick}
                            className="btn-account m-auto"
                        >
                            {editEmail
                                ? 'Guardar nuevo email'
                                : 'Cambiar email'}
                        </button>
                        {editEmail && (
                            <button
                                onClick={handleOutsideClick}
                                className="btn-account bg-red-600 m-auto"
                            >
                                Cancelar
                            </button>
                        )}
                    </form>
                    {edit ? (
                        <div className="my-4 flex flex-wrap flex-col gap-8">
                            <form
                                onSubmit={handlePasswordSubmit}
                                className="flex flex-col gap-2"
                            >
                                <div>
                                    <label>Contraseña actual:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Introduce tu contraseña actual"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label>Nueva contraseña:</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        placeholder="Introduce tu nueva contraseña"
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password2">
                                        Repetir contraseña*{' '}
                                    </label>
                                    <input
                                        type="password"
                                        name="password2"
                                        value={repeatNewPassword}
                                        placeholder="Repite la nueva contraseña"
                                        onChange={(e) =>
                                            setRepeatNewPassword(e.target.value)
                                        }
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Guardar"
                                    className="btn-account max-w-44 mx-auto"
                                />
                            </form>
                        </div>
                    ) : (
                        ''
                    )}
                    <button
                        type="button"
                        className="btn-account max-w-44 min-w-32 "
                        onClick={() => setEdit(!edit)}
                    >
                        {edit ? 'Cancelar' : 'Cambiar contraseña'}
                    </button>
                </section>

                {userLogged && (
                    <ListarReservas
                        userLogged={userLogged}
                        userData={userData}
                        token={token}
                        loading={loading}
                    />
                )}

                <section className="flex justify-end mt-28">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="btn-account max-w-44 min-w-32 bg-red-600"
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
                />
            )}
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AuthUser;
