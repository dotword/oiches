import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import ListAdvertiserAdvService from '../../services/Advertisers/ListAdvertiserAdvService';

const ListAdvertiserAdv = ({ userId, token }) => {
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const fetchUserAds = async () => {
            try {
                const data = await ListAdvertiserAdvService(token, userId);
                setAdverts(data.adverts);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUserAds();
    }, [token, userId]);

    const formatDate = (dateString) => {
        if (!dateString) return ''; // si es null, undefined o cadena vacía

        const date = new Date(dateString);
        if (isNaN(date)) return ''; // si la fecha no es válida

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const today = new Date();

    return (
        <>
            {adverts.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Publicado</th>
                                <th>Caduca</th>
                                <th>Estado</th>
                                <th>Estadísticas</th>
                                <th>Editar / Renovar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adverts.map((ad) => (
                                <tr key={ad.id}>
                                    <td>{ad.title}</td>

                                    <td>{formatDate(ad.publishedAt)}</td>
                                    <td
                                        className={
                                            new Date(ad.expiresAt) > today
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }
                                    >
                                        {formatDate(ad.expiresAt)}
                                    </td>

                                    <td
                                        className={
                                            ad.status === 1 &&
                                            new Date(ad.expiresAt) >= today
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }
                                    >
                                        {ad.status === 1 &&
                                        new Date(ad.expiresAt) >= today
                                            ? 'Publicado'
                                            : ad.status === 1 &&
                                              new Date(ad.expiresAt) < today
                                            ? 'Caducado'
                                            : 'Pendiente'}
                                    </td>
                                    <td>Nº clics: {ad.clicks}</td>

                                    <td>
                                        {ad.status === 1 &&
                                        new Date(ad.expiresAt) >= today ? (
                                            'No puedes editar un anuncio publicado'
                                        ) : (
                                            <Link to={`/edit-advert/${ad.id}`}>
                                                <span className="flex gap-1 items-center justify-center md:justify-start">
                                                    {ad.status === 1
                                                        ? 'Renovar anuncio'
                                                        : 'Editar anuncio'}
                                                    <FiExternalLink />
                                                </span>
                                            </Link>
                                        )}
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

export default ListAdvertiserAdv;
