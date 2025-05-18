import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import GetAllUserNoticesService from '../../services/Noticeboard/GetAllUserNoticesService';

const ListarUserNotices = ({ token }) => {
    const { userId } = useParams();
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchUserNotices = async () => {
            try {
                const data = await GetAllUserNoticesService(token, userId);
                setNotices(data.notices);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUserNotices();
    }, [token, userId]);

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
            <Link
                to={`/notice-creacion/${userId}`}
                className="button-large max-w-48 mb-8 mx-auto"
            >
                Publica tu anuncio
            </Link>
            {notices.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Creado</th>
                                <th>Estado</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice) => (
                                <tr key={notice.id}>
                                    <td>
                                        <Link to={`/noticeboard/${notice.id}`}>
                                            <span className="flex gap-1 items-center justify-center md:justify-start">
                                                {notice.titulo}
                                                <FiExternalLink />
                                            </span>
                                        </Link>
                                    </td>

                                    <td>{formatDate(notice.createdAt)}</td>

                                    <td
                                        className={
                                            notice.estado === 'aprobado'
                                                ? 'text-green-600'
                                                : ''
                                        }
                                    >
                                        {notice.estado}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/noticeboard/${notice.id}/edit`}
                                        >
                                            <span className="flex gap-1 items-center justify-center md:justify-start">
                                                Editar anuncio
                                                <FiExternalLink />
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center">No se han encontrado anuncios.</p>
            )}
        </>
    );
};

export default ListarUserNotices;
