import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import FetchVotersService from '../../services/Concurso/FetchVotersService.js';
import DeleteAdminVote from './DeleteAdminVote.jsx';
import Paginator from '../Paginator.jsx';

const AdminVotersList = ({ token }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 25;
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({
        email: '',
    });
    const [autoSearch, setAutoSearch] = useState(true); // Control para búsqueda automática

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await FetchVotersService(
                    token,
                    filters,
                    page,
                    pageSize
                );
                setFilteredUsers(data.voters.rows);
                setTotal(data.voters.total);
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
            <form className="grupo-filter-form mx-auto px-0 flex flex-wrap flex-row">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={filters.email}
                    onChange={handleChange}
                    className="form-input md:w-[calc(75%-.25rem)]"
                />
            </form>
            <div className="mb-4 flex flex-col">
                {filteredUsers.length > 0 ? (
                    <table className="mx-auto">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Verificado</th>
                                <th>Token</th>
                                <th>Proyecto votado</th>
                                <th>Fecha alta</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((filteredUser, index) => (
                                <tr key={`${index}`}>
                                    <td>{filteredUser.email}</td>
                                    <td>{filteredUser.verified}</td>
                                    <td className="text-sm">
                                        {filteredUser.verification_token}
                                    </td>
                                    <td>{filteredUser.grupo_nombre}</td>
                                    <td>
                                        {formatDate(filteredUser.created_at)}
                                    </td>
                                    <td>
                                        <DeleteAdminVote
                                            token={token}
                                            idVoto={filteredUser.vote_id}
                                        />
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

export default AdminVotersList;
