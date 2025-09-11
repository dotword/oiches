import { useCallback, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import UsersSalaGrupoList from './UsersSalaGrupoList.jsx';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import useUser from '../../hooks/useUser.jsx';
import AgenciaGestion from '../Agencias/AgenciaGestion.jsx';
import AdminDeleteUsers from '../Admin/AdminDeleteUsers.jsx';
import UserAvatar from './UserAvatar.jsx';
import AccountConfiguration from './AccountConfiguration.jsx';
import { IoChevronForward } from 'react-icons/io5';
import AdvertiserDashboard from '../Advertisers/AdvertiserDashboard.jsx';

const VITE_API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

// Role constants to avoid magic strings and typos
const ROLES = {
    ADMIN: 'admin',
    ADVERTISER: 'anunciante',
    AGENCY: 'agencia',
    SALA: 'sala',
    GRUPO: 'grupo',
};

const DeleteAccountSection = ({ onOpen }) => (
    <>
        <div className="text-black">
            <p className="font-semibold text-lg mt-40">Eliminar cuenta</p>
            <p className="text-sm">
                Esta acción es irreversible. Todos tus datos serán eliminados
                permanentemente.
            </p>
        </div>
        <button
            onClick={onOpen}
            className="btn-account max-w-44 min-w-32 bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
        >
            Eliminar cuenta
        </button>
    </>
);

const NoticesSection = ({ userId }) => (
    <section className="mt-12 pb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Mis anuncios
        </h2>
        <div className="flex flex-wrap gap-8 mt-8">
            <Link
                to={`/noticeboard/user/${userId}`}
                className="bg-purpleOiches hover:bg-moradoOiches text-white font-semibold py-2 px-6 rounded-lg transition-transform hover:scale-105"
            >
                Gestionar mis anuncios
            </Link>
            <Link
                to="/noticeboard"
                className="p-2 rounded-lg border border-purpleOiches text-purpleOiches hover:text-white hover:bg-purpleOiches flex items-end"
            >
                Todos los anuncios <IoChevronForward className="text-xl" />
            </Link>
        </div>
    </section>
);

const AuthUser = () => {
    const { userLogged, token, loading, signOut } = useContext(AuthContext);
    const { userId } = useParams();
    const userData = useUser(userId); // asume que devuelve { user: {...} } o null mientras carga
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    // Delete handler: useCallback para evitar recrearlo en cada render
    const handleDelete = useCallback(async () => {
        const controller = new AbortController();
        try {
            const response = await fetch(`${VITE_API_URL_BASE}/users/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                // opcional: parsear json con el error si la API lo devuelve
                const text = await response.text().catch(() => null);
                console.error('Delete failed:', text);
                toast.error('Error al eliminar la cuenta');
                return;
            }

            toast.success('Cuenta eliminada correctamente');
            // cerrar sesión y redirigir inmediatamente (no necesitamos setTimeout)
            signOut();
            navigate('/');
        } catch (err) {
            if (err.name === 'AbortError') {
                console.warn('Delete request aborted');
            } else {
                console.error(err);
                toast.error('Error al eliminar la cuenta');
            }
        }
    }, [token, signOut, navigate]);

    // simple guard while either auth or user data loads
    if (loading || !userData) {
        return <h2 className="text-center text-xl">Cargando...</h2>;
    }

    // derived booleans -> mucho más legible que condicionales complejos inline
    const loggedRole = userLogged?.roles;
    const targetRole = userData?.user?.roles;
    const isAdmin = loggedRole === ROLES.ADMIN;
    const isOwner = userLogged?.id === userId;
    const isAdvertiser = loggedRole === ROLES.ADVERTISER;

    const canAccessMain = (isOwner && !isAdvertiser) || isAdmin;

    const handleConfirmDelete = () => {
        handleDelete();
        setModalOpen(false);
    };

    // Ramas claras según rol/permiso

    // SALAS, GRUPOS Y AGENCIAS
    if (
        userLogged &&
        (targetRole === ROLES.SALA ||
            targetRole === ROLES.GRUPO ||
            targetRole === ROLES.AGENCY)
    ) {
        return (
            <>
                <div className="w-11/12 mx-auto mb-12">
                    <UserAvatar
                        userData={userData}
                        userId={userId}
                        token={token}
                        userLogged={userLogged}
                    />

                    {/* Si es sala o grupo mostrar sección de anuncios */}
                    {(targetRole === ROLES.SALA ||
                        targetRole === ROLES.GRUPO) && (
                        <>
                            <UsersSalaGrupoList
                                userLogged={userLogged}
                                token={token}
                                userOwner={userData}
                            />
                            <NoticesSection userId={userId} />
                        </>
                    )}

                    {/* Si es agencia */}
                    {targetRole === ROLES.AGENCY && (
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

                    {/* botón/eliminar cuenta para usuarios normales (no admin, no agencia) */}
                    {!isAdmin && targetRole !== ROLES.AGENCY && (
                        <DeleteAccountSection
                            onOpen={() => setModalOpen(true)}
                        />
                    )}

                    {/* admin puede usar el componente para eliminar usuarios */}
                    {isAdmin && (
                        <AdminDeleteUsers
                            token={token}
                            userId={userId}
                            type={targetRole}
                        />
                    )}
                </div>

                <Toastify />

                {modalOpen && (
                    <ConfirmationModal
                        isOpen={modalOpen}
                        text="¿Estás seguro que quieres eliminar tu cuenta? Se borrarán todos los datos asociados a tu cuenta: grupos, salas, imágenes, votos, etc..."
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setModalOpen(false)}
                        classConfirm={'bg-red-500'}
                    />
                )}
            </>
        );
    }

    if (isAdvertiser && !isAdmin) {
        return <AdvertiserDashboard userId={userId} token={token} />;
    }

    if (isAdmin) {
        return (
            <>
                <h1 className="text-center font-semibold text-lg mb-4">
                    Admin Dashboard
                </h1>
                <div className="flex flex-wrap gap-8">
                    <Link
                        to="/admin-dashboard"
                        className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform mt-8 hover:scale-105"
                    >
                        Usuarios
                    </Link>
                    <Link
                        to="/admin-advertisers"
                        className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform mt-8 hover:scale-105"
                    >
                        Anunciantes
                    </Link>
                    <Link
                        to="/admin-reservas"
                        className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform mt-8 hover:scale-105"
                    >
                        Reservas
                    </Link>
                    <Link
                        to="/admin-noticeboard"
                        className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform mt-8 hover:scale-105"
                    >
                        Noticeboard
                    </Link>
                </div>
                <AccountConfiguration
                    userLogged={userLogged}
                    userData={userData}
                    userId={userId}
                    token={token}
                />
            </>
        );
    }

    if (!canAccessMain) {
        return (
            <h1 className="text-center text-xl">
                No puedes acceder a esta página
            </h1>
        );
    }
};

export default AuthUser;
