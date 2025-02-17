import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FaRegCalendarCheck } from 'react-icons/fa';

const AgenciaGruposList = ({ userOwner, entries }) => {
    return (
        <section className="w-full mx-auto py-6 my-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">Roster</h3>

            {entries && entries.length > 0 ? (
                <>
                    <form className="sala-filter-form w-4/5 mx-auto md:flex md:flex-row md:space-x-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del grupo"
                            // value={filters.nombre}
                            // onChange={handleChange}
                            className="form-input placeholder:text-black"
                        />
                    </form>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div className="flex flex-wrap items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-800 text-lg">
                                        {entry.nombre}
                                    </h3>
                                </div>

                                <div className="flex flex-col items-end text-sm space-y-6">
                                    <a
                                        href={`/grupo/${entry.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaEye className="text-base" />
                                        <span>Ver</span>
                                    </a>
                                    <a
                                        href={`/grupos/${entry.id}/edit`}
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaPencil className="text-base" />
                                        <span>Editar</span>
                                    </a>
                                    {entry.published === 1 && (
                                        <a
                                            href={`/${userOwner.user.roles}/calendar/${entry.id}`}
                                            className="font-semibold text-gray-800 hover:text-purple-600 mt-2 flex items-center gap-2 pb-4"
                                        >
                                            <FaRegCalendarCheck className="text-xl" />
                                            <span>Gestionar reservas</span>
                                        </a>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                ''
            )}

            {userOwner.user.roles === 'agencia' ||
            (userOwner.user.roles === 'admin' &&
                userOwner.user.roles === 'grupo') ? (
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

            <Toastify />
        </section>
    );
};

export default AgenciaGruposList;
