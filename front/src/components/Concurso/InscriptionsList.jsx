import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import FetchInscripcionesService from '../../services/Concurso/FetchInscripcionesService.js';
import { FiExternalLink } from 'react-icons/fi';
import Paginator from '../Paginator.jsx';
import UnsubscribeFromContest from './UnsubscribeFromContest.jsx';
import SubscribeFromContest from './SubscribeFromContest.jsx';

const InscriptionsList = ({ token }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
        acepted: '',
        order: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await FetchInscripcionesService(
                    token,
                    filters,
                    page,
                    pageSize
                );

                setFilteredUsers(data.inscripciones.rows);
                setTotal(data.inscripciones.total);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAllUsers();
    }, [token, page, filters, pageSize]);

    useEffect(() => {
        if (autoSearch) {
            setPage(1); // Reinicia la paginación cuando cambian los filtros.
        }
    }, [filters, autoSearch]);

    // Actualizar el estado de los filtros cuando el usuario cambia un valor
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
        setAutoSearch(true); // Activa búsqueda automática cuando se cambian los filtros
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <section className="py-6 border-b-2 border-greyOiches-50">
            <h2 className="text-center font-semibold text-lg mb-4">
                Proyectos inscritos al concurso
            </h2>
            <form className="grupo-filter-form mx-auto px-0 flex flex-wrap flex-row">
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del proyecto"
                        value={filters.name}
                        onChange={handleChange}
                        className="form-input md:w-[calc(75%-.25rem)]"
                    />
                    <select
                        name="acepted"
                        value={filters.acepted}
                        onChange={handleChange}
                        className="form-select md:w-[calc(25%-.25rem)]"
                    >
                        <option value="">Aceptado</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </form>
            <div className="mb-4 flex flex-col">
                {filteredUsers.length > 0 ? (
                    <table className="mx-auto">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Aceptado</th>
                                <th>Fecha alta</th>
                                <th>Baja</th>
                                <th>Cancelar/Aprobar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((filteredUser, index) => (
                                <tr key={`${index}`}>
                                    <td>
                                        <Link
                                            to={`/grupo/${filteredUser.id}`}
                                            target="_blank"
                                        >
                                            <span className="flex gap-1 items-center justify-center md:justify-start">
                                                {filteredUser.grupo_nombre}
                                                <FiExternalLink />
                                            </span>
                                        </Link>
                                    </td>
                                    <td>{filteredUser.projectAcepted}</td>
                                    <td>
                                        {formatDate(filteredUser.createdAt)}
                                    </td>

                                    <td>
                                        {filteredUser.deletedAt &&
                                            formatDate(filteredUser.deletedAt)}
                                    </td>
                                    <td>
                                        {filteredUser.projectAcepted === 0 ? (
                                            <SubscribeFromContest
                                                token={token}
                                                idGrupo={filteredUser.id}
                                            />
                                        ) : (
                                            <UnsubscribeFromContest
                                                token={token}
                                                idGrupo={filteredUser.id}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No se encontraron usuarios</p>
                )}
                <Paginator
                    setPage={setPage}
                    page={page}
                    total={total}
                    pageSize={pageSize}
                />
            </div>
            <Toastify />
        </section>
    );
};

export default InscriptionsList;
