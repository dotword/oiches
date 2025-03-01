import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import Paginator from '../Paginator.jsx';
import FetchAllNoticesService from '../../services/Admin/FetchAllNoticesService.js';
const ListarAllNotices = ({ token }) => {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
        confirm: '',
        order: '',
        orderField: 'fecha',
    });
    const [autoSearch, setAutoSearch] = useState(true);

    useEffect(() => {
        const fetchAllNotices = async () => {
            try {
                const data = await FetchAllNoticesService(
                    token,
                    filters,
                    page,
                    pageSize
                );

                setNotices(data.notices.rows);
                setTotal(data.notices.total);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAllNotices();
    }, [token, page, filters, pageSize]);

    //     if (!reservaAEliminar) return; // Verificar que hay una reserva seleccionada
    //     try {
    //         const response = await fetch(
    //             `${VITE_API_URL_BASE}/admin-borrar-reserva/${reservaAEliminar}`,
    //             {
    //                 method: 'DELETE',
    //                 headers: {
    //                     authorization: token,
    //                 },
    //             }
    //         );

    //         if (!response.ok) {
    //             toast.error('Fallo al eliminar la reserva');
    //         }

    //         // Actualizar el estado de reservas
    //         setReservas(
    //             reservas.filter((reserva) => reserva.id !== reservaAEliminar)
    //         );
    //         toast.success('Su reserva se ha eliminado con éxito');
    //     } catch (error) {
    //         toast.error('Error eliminando la reserva');
    //     } finally {
    //         // Cerrar el modal y limpiar el estado
    //         setCancelModalOpen(false);
    //         setReservaAEliminar(null);
    //     }
    // };
    useEffect(() => {
        if (autoSearch) {
            setPage(1); // Reinicia la paginación cuando cambian los filtros.
        }
    }, [filters, autoSearch]);

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
                <form className="flex gap-4 mb-8">
                    <select
                        name="order"
                        value={`${filters.orderField}_${filters.order}`} // Combina campo y dirección
                        onChange={handleChange}
                        className="py-0 px-1 form-input md:w-[calc(25%-.25rem)]"
                    >
                        <option value="createdAt_ASC">
                            Fecha solicitud &#8593;
                        </option>
                        <option value="createdAt_DESC">
                            Fecha solicitud &#8595;
                        </option>
                    </select>

                    <select
                        name="estado"
                        value={filters.estado}
                        onChange={handleChange}
                        className="form-select md:w-[calc(25%-.25rem)]"
                    >
                        <option value="">Estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                    </select>
                </form>

                {notices.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Usuario</th>
                                    <th>Creado</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notices.map((notice) => (
                                    <tr key={notice.id}>
                                        <td>
                                            <Link
                                                to={`/noticeboard/${notice.id}`}
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {notice.titulo}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/users/account/${notice.usuario_id}`}
                                            >
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {notice.userName}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        </td>
                                        <td>{formatDate(notice.createdAt)}</td>

                                        <td>{notice.estado}</td>
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
                    <p className="text-center">No se han encontrado notices.</p>
                )}
            </section>
        </>
    );
};

export default ListarAllNotices;
