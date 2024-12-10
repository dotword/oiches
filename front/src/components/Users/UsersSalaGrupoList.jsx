import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const UsersSalaGrupoList = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const type = userLogged.roles;

    return (
        <section className="py-6 flex border-b-2 border-greyOiches-50 flex-col items-center">
            {entries.length > 0 ? (
                <>
                    <h2 className="text-center font-semibold text-lg mb-6">
                        Gestiona{' '}
                        {userOwner.user.roles === 'sala'
                            ? ' tus salas'
                            : ' tu grupo'}
                    </h2>
                    <ul className="mb-4">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="flex items-center justify-center gap-4 mb-2"
                            >
                                <a
                                    href={
                                        userOwner.user.roles === 'sala'
                                            ? `/sala/${entry.id}/edit`
                                            : `/grupos/${entry.id}/edit`
                                    }
                                    className="btn-account bg-footercolor text-xl flex gap-4 items-center hover:text-white hover:bg-purpleOiches"
                                >
                                    {entry.nombre}

                                    <FaPencil className="text-white text-sm" />
                                </a>

                                <a
                                    href={
                                        userOwner.user.roles === 'sala'
                                            ? `/sala/${entry.id}`
                                            : `/grupo/${entry.id}`
                                    }
                                    target="_blank"
                                >
                                    <FaEye className="text-green-900 text-xl" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                ''
            )}

            {type === 'grupo' ||
            (type === 'admin' && userOwner.user.roles === 'grupo') ? (
                <a
                    href={`/creacion-grupo/${userOwner.user.id}`}
                    className={`btn-account ${
                        entries.length === 0 ? 'text-xl' : 'mt-6'
                    } `}
                >
                    {entries.length === 0
                        ? 'Publica tu proyecto musical'
                        : 'Publicar un nuevo proyecto'}
                </a>
            ) : (
                ''
            )}

            {type === 'sala' ||
            (type === 'admin' && userOwner.user.roles == 'sala') ? (
                <a
                    href={`/creacion-sala/${userOwner.user.id}`}
                    className={`btn-account ${
                        entries.length === 0 ? 'text-xl' : 'mt-6'
                    } `}
                >
                    {entries.length === 0
                        ? 'Publica tu sala'
                        : 'Publicar una nueva sala'}
                </a>
            ) : (
                ''
            )}
            <Toastify />
        </section>
    );
};

export default UsersSalaGrupoList;
