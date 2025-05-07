import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import getAgenciasGruposService from '../../services/Agencias/getAgenciasGruposService.js';
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';

const AgenciaGruposList = () => {
    const { idAgencia } = useParams();
    const { token } = useContext(AuthContext);
    const [entries, setEntries] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        order: '',
        orderField: '',
    });

    useEffect(() => {
        const getEntry = async () => {
            try {
                if (idAgencia) {
                    const json = await getAgenciasGruposService({
                        token,
                        filters,
                        idAgencia,
                    });

                    setEntries(json.agenciaList);
                }
            } catch (error) {
                toast.error(
                    error.message || 'Error al traer el roster de la agencia.'
                );
            }
        };

        getEntry();
    }, [token, filters, idAgencia]);

    // Actualizar el estado de los filtros cuando el usuario cambia un valor
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'order') {
            // Dividir el valor combinado en orderField y order
            const [orderField, order] = value.split('_');
            setFilters({
                ...filters,
                orderField,
                order,
            });
        } else {
            // Actualizar otros filtros como confirm, salaname, gruponame
            setFilters({
                ...filters,
                [name]: value,
            });
        }
    };

    return (
        <section className="w-full mx-auto pb-6 mb-6 bg-white">
            {entries && entries.length > 0 ? (
                <>
                    <form className="grupo-filter-form max-w-2xl mx-auto flex mb-6">
                        <input
                            name="name"
                            value={filters.name}
                            placeholder="Buscar... Nombre del músico/grupo"
                            onChange={handleChange}
                            className="form-select"
                        />
                    </form>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                            >
                                <div className="flex flex-wrap items-center justify-between mb-3">
                                    <h3 className="font-medium text-lg">
                                        {entry.nombre}
                                    </h3>
                                    {entry.published === 0 && (
                                        <p className="text-sm mt-2 text-orange-600">
                                            Estamos revisando tu proyecto, muy
                                            pronto aparecerá publicado
                                        </p>
                                    )}
                                </div>

                                <div className="flex text-sm justify-between">
                                    <Link
                                        to={`/grupo/${entry.id}`}
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaEye className="text-base" />
                                        <span>Ver</span>
                                    </Link>

                                    <Link
                                        to={`/grupo/${entry.id}/edit`}
                                        className="text-purple-600 flex items-center gap-2 hover:underline focus:outline focus:ring-2 focus:ring-purple-600"
                                    >
                                        <FaPencil className="text-base" />
                                        <span>Editar</span>
                                    </Link>
                                </div>
                                {entry.published === 1 && (
                                    <Link
                                        to={`/grupo/calendar/${entry.id}`}
                                        className="font-semibold hover:text-purple-600 mt-2 flex items-center gap-2 justify-end"
                                    >
                                        <FaRegCalendarCheck className="text-xl" />
                                        <span>Gestionar reservas</span>
                                    </Link>
                                )}
                                {/* {entry.published === 1 ? (
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

            <Link
                to={`/creacion-grupo/${idAgencia}`}
                className={`w-[90%] mx-auto px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    entries.length === 0
                        ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-xl'
                        : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-6'
                }`}
            >
                {entries.length === 0
                    ? 'Publica tu artista o grupo'
                    : 'Publicar un nuevo artista o grupo'}
            </Link>

            <Toastify />
        </section>
    );
};

export default AgenciaGruposList;
