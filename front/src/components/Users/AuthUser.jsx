import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import UsersSalaGrupoList from './UsersSalaGrupoList.jsx';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser.jsx';
import AgenciaGestion from '../Agencias/AgenciaGestion.jsx';
import AdminDeleteUsers from '../Admin/AdminDeleteUsers.jsx';
import UserAvatar from './UserAvatar.jsx';
import AccountConfiguration from './AccountConfiguration.jsx';

const AuthUser = () => {
    const { userLogged, token, loading, signOut } = useContext(AuthContext);
    const { userId } = useParams();
    const userData = useUser(userId);
    const [modalOpen, setModalOpen] = useState(false);
    const { VITE_API_URL_BASE } = import.meta.env;
    const navigate = useNavigate();

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

    return (userLogged && userLogged.id === userId) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <>
            <div className="w-11/12 mx-auto mb-12">
                <UserAvatar
                    userData={userData}
                    userId={userId}
                    token={token}
                    userLogged={userLogged}
                />
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

                <AccountConfiguration
                    userLogged={userLogged}
                    userData={userData}
                    userId={userId}
                    token={token}
                />
                {userLogged &&
                    userLogged.roles !== 'admin' &&
                    userData.user.roles !== 'agencia' && (
                        <>
                            <div className="text-black">
                                <p className="font-semibold text-lg mt-40">
                                    Eliminar cuenta
                                </p>
                                <p className="text-sm">
                                    Esta acción es irreversible. Todos tus datos
                                    serán eliminados permanentemente.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="btn-account max-w-44 min-w-32 bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
                            >
                                Eliminar cuenta
                            </button>
                        </>
                    )}
                {userLogged && userLogged.roles === 'admin' && (
                    <AdminDeleteUsers
                        token={token}
                        userId={userId}
                        type={userData.user.roles}
                    />
                )}
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
