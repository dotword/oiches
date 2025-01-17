import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FaRegCalendarCheck } from 'react-icons/fa';

const UsersSalaGrupoList = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const type = userLogged.roles;

    return (
        <section className="w-full mx-auto py-6 my-6 bg-white">
            {entries.length > 0 ? (
                <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Gestiona{' '}
                        {userOwner.user.roles === 'sala'
                            ? ' tus salas'
                            : ' tu grupo'}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                {/* Título del proyecto */}
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-800 text-lg">
                                        {entry.nombre}
                                    </h3>
                                </div>

                                {/* Enlaces de acción */}
                                <div className="flex flex-col items-end text-sm space-y-6">
                                    <a
                                        href={
                                            userOwner.user.roles === 'sala'
                                                ? `/sala/${entry.id}`
                                                : `/grupo/${entry.id}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaEye className="text-base" />
                                        <span>Ver</span>
                                    </a>
                                    <a
                                        href={
                                            userOwner.user.roles === 'sala'
                                                ? `/sala/${entry.id}/edit`
                                                : `/grupos/${entry.id}/edit`
                                        }
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaPencil className="text-base" />
                                        <span>Editar</span>
                                    </a>
                                    <a
                                        href={`/${userOwner.user.roles}/calendar/${entry.id}`}
                                        className="font-semibold text-gray-800 hover:text-purple-600 mt-2 flex items-center gap-2 pb-4"
                                    >
                                        <FaRegCalendarCheck className="text-xl" />
                                        <span>
                                            Gestionar reservas{' '}
                                            {userOwner.user.roles === 'sala' &&
                                                'y calendario'}
                                        </span>
                                    </a>
                                </div>
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
                    className={`w-[90%] mx-auto px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        entries.length === 0
                            ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-xl'
                            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-6'
                    }`}
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
                    className={`w-[90%] mx-auto px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        entries.length === 0
                            ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-xl'
                            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-6'
                    }`}
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
