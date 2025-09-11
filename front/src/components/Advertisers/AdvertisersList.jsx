import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import FetchAllAdvertsService from '../../services/Advertisers/FetchAllAdvertsService.js';
import { FiExternalLink } from 'react-icons/fi';
import Paginator from '../Paginator.jsx';

const AdvertisersList = ({ token }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        title: '',
        active: '',
        status: '',
        package: '',
        companyName: '',
        userActive: '',
        order: '',
        expired: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    useEffect(() => {
        const fetchAllAdverts = async () => {
            try {
                const data = await FetchAllAdvertsService(
                    token,
                    filters,
                    page,
                    pageSize
                );

                setFilteredUsers(data.adverts.rows);
                setTotal(data.adverts.total);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAllAdverts();
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

    const getDateOnlyUtcMs = (dateInput) => {
        if (!dateInput) return null;
        const d = new Date(dateInput); // acepta ISO string o Date
        // Construimos un valor en milisegundos usando UTC para evitar shifts por zona horaria
        return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    };

    const today = new Date();
    const todayUtcMs = Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate()
    );

    return (
        <section className="py-6 border-b-2 border-greyOiches-50">
            <form className="grid gap-2 grid-cols-6 mb-12 md:grid-cols-9">
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="form-select col-span-3 md:col-span-2"
                >
                    <option value="">Status</option>
                    <option value="1">Aprobado</option>
                    <option value="0">Pendiente</option>
                </select>

                <select
                    name="expired"
                    value={filters.expired}
                    onChange={handleChange}
                    className="form-select col-span-3 md:col-span-2"
                >
                    <option value="">Caducado</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>

                <input
                    type="text"
                    name="package"
                    placeholder="Package del anuncio"
                    value={filters.package}
                    onChange={handleChange}
                    className="form-select col-span-3 md:col-span-2"
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Título del anuncio"
                    value={filters.title}
                    onChange={handleChange}
                    className="form-input col-span-3 md:col-span-3"
                />

                <input
                    type="text"
                    name="companyName"
                    placeholder="Nombre empresa"
                    value={filters.companyName}
                    onChange={handleChange}
                    className="form-input col-span-6 md:col-span-5"
                />

                <select
                    name="userActive"
                    value={filters.userActive}
                    onChange={handleChange}
                    className="form-select col-span-3 md:col-span-2"
                >
                    <option value="">Usuario activo</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>
                <select
                    name="order"
                    value={filters.order}
                    onChange={handleChange}
                    className="form-select col-span-3 md:col-span-2"
                >
                    <option value="DESC">Reciente</option>
                    <option value="ASC">Antiguo</option>
                </select>
            </form>

            <div className="mb-4 flex flex-col">
                {filteredUsers.length > 0 ? (
                    <table className="mx-auto">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Published</th>
                                <th>Expired</th>
                                <th>Package</th>
                                <th>Nº Clics</th>
                                <th>Company</th>
                                <th>User active</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((filteredUsers) => {
                                const advertExpiredUtcMs = getDateOnlyUtcMs(
                                    filteredUsers.expiresAt
                                );
                                return (
                                    <tr key={`${filteredUsers.id}`}>
                                        <td>
                                            {filteredUsers.title && (
                                                <Link
                                                    to={`/edit-advert/${filteredUsers.id}`}
                                                    target="_blank"
                                                >
                                                    <span className="flex gap-1 items-center justify-center md:justify-start">
                                                        {filteredUsers.title}
                                                        <FiExternalLink />
                                                    </span>
                                                </Link>
                                            )}
                                        </td>
                                        <td
                                            className={
                                                filteredUsers.status === 1
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }
                                        >
                                            {filteredUsers.status === 1
                                                ? 'Aceptado'
                                                : filteredUsers.status === 0
                                                ? 'Pendiente'
                                                : ''}
                                        </td>
                                        <td>
                                            {filteredUsers.publishedAt &&
                                                formatDate(
                                                    filteredUsers.publishedAt
                                                )}
                                        </td>
                                        <td
                                            className={
                                                advertExpiredUtcMs > todayUtcMs
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }
                                        >
                                            {filteredUsers.expiresAt &&
                                                formatDate(
                                                    filteredUsers.expiresAt
                                                )}
                                        </td>
                                        <td>{filteredUsers.package}</td>
                                        <td>{filteredUsers.clicks}</td>
                                        <td>
                                            <Link
                                                to={`/advertiser-details/edit/${filteredUsers.user_id}`}
                                                target="_blank"
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {filteredUsers.companyName}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        </td>
                                        <td>{filteredUsers.userActive}</td>
                                        <td>
                                            {formatDate(
                                                filteredUsers.createdAt
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No se encontraron anuncios</p>
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

export default AdvertisersList;
