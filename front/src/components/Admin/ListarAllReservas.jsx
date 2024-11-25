import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import Paginator from '../Paginator.jsx';
import FetchAllReservasService from '../../services/Admin/FetchAllReservasService';

const ListarAllReservas = ({ token }) => {
    const [reservas, setReservas] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        salaname: '',
        gruponame: '',
        confirm: '',
        order: '',
    });

    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchAllReservas = async () => {
            try {
                const data = await FetchAllReservasService(
                    token,
                    filters,
                    page,
                    pageSize
                );

                setReservas(data.data.reservas.rows);
                setTotal(data.data.reservas.total);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAllReservas();
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
        <>
            <section>
                <h3 className="text-lg font-semibold text-center my-6">
                    Histórico Reservas
                </h3>

                <form className="grupo-filter-form mx-auto px-0 flex flex-wrap flex-row">
                    <select
                        name="order"
                        value={filters.order}
                        onChange={handleChange}
                        className="py-0 px-1 text-sm form-input max-w-20"
                    >
                        <option value="DESC">Fecha &#8595;</option>
                        <option value="ASC">Fecha &#8593;</option>
                    </select>
                    <select
                        name="confirm"
                        value={filters.confirm}
                        onChange={handleChange}
                        className="form-select max-w-40"
                    >
                        <option value="">Estado</option>
                        <option value="0">Sin confirmar</option>
                        <option value="1">Confirmada</option>
                    </select>
                    <input
                        name="salaname"
                        value={filters.salaname}
                        placeholder="Nombre de la sala"
                        onChange={handleChange}
                        className="form-select md:w-2/6"
                    />
                    <input
                        name="gruponame"
                        value={filters.gruponame}
                        placeholder="Nombre del músico"
                        onChange={handleChange}
                        className="form-select md:w-2/6"
                    />
                </form>

                {reservas.length > 0 ? (
                    <>
                        <table className="max-w-5xl mx-auto">
                            <thead>
                                <tr>
                                    <th>Artista</th>
                                    <th>Sala</th>
                                    <th>Estado</th>
                                    <th>Fecha concierto</th>
                                    <th>Fecha solicitud</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservas.map((reserva) => (
                                    <tr key={reserva.id}>
                                        <td>
                                            <Link
                                                to={`/grupo/${reserva.grupo_id}`}
                                                target="_blank"
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {reserva.grupo_nombre}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/sala/${reserva.sala_id}`}
                                                target="_blank"
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {reserva.sala_nombre}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        </td>
                                        <td>
                                            {reserva.confirmada === 0 ? (
                                                <span className="block font-normal text-red-600">
                                                    Sin confirmar
                                                </span>
                                            ) : (
                                                <span className="block font-normal text-green-600">
                                                    Confirmada
                                                </span>
                                            )}
                                        </td>
                                        <td>{formatDate(reserva.fecha)}</td>
                                        <td>{formatDate(reserva.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </>
                ) : (
                    <p className="text-center">
                        No se han encontrado reservas.
                    </p>
                )}
            </section>
        </>
    );
};

export default ListarAllReservas;
