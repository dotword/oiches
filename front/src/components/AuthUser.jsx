import { useContext, useState } from 'react';
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

const AuthUser = () => {
    const { userLogged, token } = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [edit, setEdit] = useState(false);

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
        setUserId(userLogged.id);
    };
    const handleAvatarSubmit = async (e) => {
        try {
            e.preventDefault();
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
        setUserId(userLogged.id);
    };
    const handleEmailSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = new FormData();
            data.append('email', newEmail);

            await modifyUserEmailService({ data, userId, token });

            toast.success('Email cambiado con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePasswordSubmit = async (e) => {
        try {
            e.preventDefault();

            const data = new FormData();
            data.append('email', userLogged.email);
            data.append('password', password);
            data.append('newPassword', newPassword);

            await modifyUserPasswordService({ data, token });

            toast.success('Email cambiado con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return userLogged ? (
        <>
            <div className="md:flex md:justify-around md:items-end md:max-w-3xl md:mx-auto">
                <section className="mb-4 flex flex-col items-center gap-2 md:self-start">
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
                                            userLogged.avatar
                                                ? `${
                                                      import.meta.env
                                                          .VITE_API_URL_BASE
                                                  }/uploads/${
                                                      userLogged.avatar
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
                        {previewUrl ? (
                            <div className="mt-3 max-w-80">
                                <input
                                    type="submit"
                                    value="Cambiar avatar"
                                    className="btn-account max-w-44"
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </form>
                    <p>
                        <span className="font-semibold">Usuario: </span>
                        {userLogged.username}
                    </p>
                    <p>
                        <span className="font-semibold">Email: </span>
                        {userLogged.email}
                    </p>
                </section>

                <section className="flex flex-col mb-4 items-center gap-2">
                    {edit === true ? (
                        <div className="my-4 flex flex-wrap flex-col gap-8 text-center">
                            <form
                                onSubmit={handleEmailSubmit}
                                className="flex flex-col items-center gap-2"
                            >
                                <label className="font-semibold">
                                    Cambiar email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newEmail}
                                    placeholder="Introduce tu nuevo email"
                                    onChange={handleEmailChange}
                                    className="form-input mt-0"
                                />

                                <input
                                    type="submit"
                                    value="Guardar"
                                    className="btn-account max-w-44"
                                />
                            </form>

                            <form
                                onSubmit={handlePasswordSubmit}
                                className="flex flex-col items-center gap-2"
                            >
                                <span className="font-semibold">
                                    Cambiar contraseña:{' '}
                                </span>
                                <div>
                                    <label>Contraseña:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Introduce tu contraseña actual"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                                        className="form-input"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Guardar"
                                    className="btn-account max-w-44"
                                />
                            </form>
                        </div>
                    ) : (
                        ''
                    )}
                    <button
                        type="button"
                        className="btn-account max-w-44 min-w-32"
                        onClick={() => {
                            edit === false ? setEdit(true) : setEdit(false);
                        }}
                    >
                        {edit === false ? 'Editar datos' : 'Cerrar'}
                    </button>
                </section>
            </div>

            <UsersSalaGrupoList />
            <ListarReservas /> 

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AuthUser;
