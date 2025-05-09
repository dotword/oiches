import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UsersSalaGrupoList = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const type = userLogged.roles;

    return (
        <section className="w-full mx-auto py-6 my-6 border-b">
            {entries.length > 0 ? (
                <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Gestiona{' '}
                        {userOwner.user.roles === 'sala'
                            ? ' tus salas'
                            : ' tu proyecto musical'}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                {entry.totalReservas > 0 && (
                                    <p className="text-sm text-red-600 font-semibold">
                                        {entry.totalReservas} reservas
                                        pendientes
                                    </p>
                                )}

                                {/* Título del proyecto */}
                                <div className="flex flex-wrap items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-800 text-lg">
                                        {entry.nombre}
                                    </h3>
                                    {entry.published === 0 && (
                                        <p className="text-sm mt-2 text-orange-600">
                                            {userOwner.user.roles === 'sala' &&
                                                'Estamos revisando tu sala, muy pronto aparecerá publicada'}
                                            {userOwner.user.roles === 'grupo' &&
                                                'Estamos revisando tu proyecto, muy pronto aparecerá publicado'}
                                        </p>
                                    )}
                                </div>

                                {/* Enlaces de acción */}
                                <div className="flex flex-col items-end text-sm space-y-6">
                                    <Link
                                        to={
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
                                    </Link>

                                    <Link
                                        to={
                                            userOwner.user.roles === 'sala'
                                                ? `/sala/${entry.id}/edit`
                                                : `/grupo/${entry.id}/edit`
                                        }
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaPencil className="text-base" />
                                        <span>Editar</span>
                                    </Link>

                                    {entry.published === 1 && (
                                        <Link
                                            to={`/${userOwner.user.roles}/calendar/${entry.id}`}
                                            className="font-semibold text-gray-800 hover:text-purple-600 mt-2 flex items-center gap-2 pb-4"
                                        >
                                            <FaRegCalendarCheck className="text-xl" />
                                            <span>
                                                Gestionar reservas{' '}
                                                {userOwner.user.roles ===
                                                    'sala' && 'y calendario'}
                                            </span>
                                        </Link>
                                    )}
                                </div>
                                {/* Inscripcion grupo a concurso */}
                                {/* {type === 'grupo' && entry.published === 1 ? (
                                    <Link
                                        to={`/concurso/inscripcion/${entry.id}`}
                                        className="text-center"
                                    >
                                        <button className="my-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                                            Concurso Oiches 2025
                                        </button>
                                    </Link>
                                ) : (
                                    ''
                                )} */}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                ''
            )}

            {type === 'grupo' ||
            (type === 'admin' && userOwner.user.roles === 'grupo') ? (
                <Link
                    to={`/creacion-grupo/${userOwner.user.id}`}
                    className={`w-[90%] mx-auto px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        entries.length === 0
                            ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-xl'
                            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-6'
                    }`}
                >
                    {entries.length === 0
                        ? 'Publica tu proyecto musical'
                        : 'Publicar un nuevo proyecto'}
                </Link>
            ) : (
                ''
            )}

            {type === 'sala' ||
            (type === 'admin' && userOwner.user.roles == 'sala') ? (
                <Link
                    to={`/creacion-sala/${userOwner.user.id}`}
                    className={`w-[90%] mx-auto px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        entries.length === 0
                            ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-xl'
                            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-6'
                    }`}
                >
                    {entries.length === 0
                        ? 'Publica tu sala'
                        : 'Publicar una nueva sala'}
                </Link>
            ) : (
                ''
            )}
            <Toastify />
        </section>
    );
};

export default UsersSalaGrupoList;
