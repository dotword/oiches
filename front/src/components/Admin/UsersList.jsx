import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import FetchAllUsersService from '../../services/Admin/FetchAllUsersService.js';
import { FiExternalLink } from 'react-icons/fi';
import Paginator from '../Paginator.jsx';

const UsersList = ({ token }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        username: '',
        roles: '',
        order: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await FetchAllUsersService(
                    token,
                    filters,
                    page,
                    pageSize
                );

                setFilteredUsers(data.data.user.rows);
                setTotal(data.data.user.total);
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
                Usuarios de Oiches
            </h2>
            <form className="grupo-filter-form mx-auto px-0 flex flex-wrap flex-row">
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={filters.username}
                        onChange={handleChange}
                        className="form-input md:w-[calc(25%-.25rem)]"
                    />
                    <select
                        name="active"
                        value={filters.active}
                        onChange={handleChange}
                        className="form-select md:w-[calc(25%-.25rem)]"
                    >
                        <option value="">Activo</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                    <select
                        name="roles"
                        value={filters.roles}
                        onChange={handleChange}
                        className="form-select md:w-[calc(25%-.25rem)]"
                    >
                        <option value="">Roles</option>
                        <option value="sala">Salas</option>
                        <option value="grupo">Músicos</option>
                        <option value="agencia">Agencias</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select
                        name="published"
                        value={filters.published}
                        onChange={handleChange}
                        className="form-select md:w-[calc(25%-.25rem)]"
                    >
                        <option value="">Publicado</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div className="w-full flex gap-4">
                    <input
                        name="provincia"
                        value={filters.provincia}
                        placeholder="Provincia"
                        onChange={handleChange}
                        className="form-select md:w-[calc(35%-.25rem)]"
                    />
                    <input
                        name="name"
                        value={filters.name}
                        placeholder="Nombre sala, músico, agencia"
                        onChange={handleChange}
                        className="form-select md:w-[calc(45%-.25rem)]"
                    />
                    <select
                        name="order"
                        value={filters.order}
                        onChange={handleChange}
                        className="py-0 px-1 form-input md:w-[calc(20%-.25rem)]"
                    >
                        <option value="DESC">Recientes</option>
                        <option value="ASC">Antiguas</option>
                    </select>
                </div>
            </form>
            <div className="mb-4 flex flex-col">
                {filteredUsers.length > 0 ? (
                    <table className="mx-auto">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Activo</th>
                                <th>Role</th>
                                <th>Fecha alta</th>
                                <th>Nombre</th>
                                <th>Publicado</th>
                                <th>Sala/Grupo publicado</th>
                                <th>Provincia</th>
                                <th>Baja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((filteredUsers, index) => (
                                <tr key={`${index}`}>
                                    <td>
                                        <Link
                                            to={`/users/account/${filteredUsers.usuario_id}`}
                                            target="_blank"
                                        >
                                            <span className="flex gap-1 items-center justify-center md:justify-start">
                                                {filteredUsers.username}
                                                <FiExternalLink />
                                            </span>
                                        </Link>
                                    </td>
                                    <td>{filteredUsers.active}</td>
                                    <td>{filteredUsers.roles}</td>
                                    <td>
                                        {formatDate(filteredUsers.createdAt)}
                                    </td>
                                    <td>
                                        {filteredUsers.sala_id !== null && (
                                            <Link
                                                to={`/sala/${filteredUsers.sala_id}`}
                                                target="_blank"
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {filteredUsers.sala_nombre}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        )}
                                        {filteredUsers.grupo_id !== null &&
                                            filteredUsers.agencia_id ===
                                                null && (
                                                <Link
                                                    to={`/grupo/${filteredUsers.grupo_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 items-center justify-center md:justify-start">
                                                        {
                                                            filteredUsers.grupo_nombre
                                                        }
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            )}
                                        {filteredUsers.agencia_id !== null &&
                                            filteredUsers.grupo_nombre ===
                                                null && (
                                                <Link
                                                    to={`/agencia/${filteredUsers.agencia_id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 items-center justify-center md:justify-start">
                                                        {
                                                            filteredUsers.agencia_nombre
                                                        }
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            )}
                                        {filteredUsers.agencia_id !== null &&
                                            filteredUsers.grupo_nombre !==
                                                null && (
                                                <>
                                                    <Link
                                                        to={`/agencia/${filteredUsers.agencia_id}`}
                                                        target="_blank"
                                                    >
                                                        <span className="flex gap-1 items-center justify-center md:justify-start text-sm">
                                                            {
                                                                filteredUsers.agencia_nombre
                                                            }
                                                            <FiExternalLink />
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        to={`/grupo/${filteredUsers.grupo_id}`}
                                                        target="_blank"
                                                    >
                                                        <span className="flex gap-1 items-center justify-center md:justify-start text-sm">
                                                            {
                                                                filteredUsers.grupo_nombre
                                                            }
                                                            <FiExternalLink />
                                                        </span>
                                                    </Link>
                                                </>
                                            )}
                                    </td>
                                    <td>
                                        {filteredUsers.roles === 'grupo' &&
                                            filteredUsers.grupo_published}
                                        {filteredUsers.roles === 'sala' &&
                                            filteredUsers.sala_published}
                                        {filteredUsers.roles === 'agencia' &&
                                            filteredUsers.agencia_published}
                                    </td>
                                    <td>
                                        {filteredUsers.roles === 'grupo' &&
                                            filteredUsers.grupo_published ===
                                                1 &&
                                            formatDate(
                                                filteredUsers.grupo_createdAt
                                            )}
                                        {filteredUsers.roles === 'sala' &&
                                            filteredUsers.sala_published ===
                                                1 &&
                                            formatDate(
                                                filteredUsers.sala_createdAt
                                            )}
                                        {filteredUsers.agencia_id !== null &&
                                            filteredUsers.grupo_nombre ===
                                                null &&
                                            formatDate(filteredUsers.createdAt)}

                                        {filteredUsers.agencia_id !== null &&
                                            filteredUsers.grupo_nombre !==
                                                null &&
                                            formatDate(
                                                filteredUsers.grupo_createdAt
                                            )}
                                    </td>
                                    <td>
                                        {filteredUsers.provincia_grupo_nombre ||
                                            filteredUsers.provincia_sala_nombre ||
                                            filteredUsers.provincia_agencia_nombre}
                                    </td>

                                    <td>
                                        {filteredUsers.deletedAt &&
                                            formatDate(filteredUsers.deletedAt)}
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

export default UsersList;
