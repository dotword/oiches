import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import AdminPublishAdvertService from '../../services/Advertisers/AdminPublishAdvertService.js';

const AdminPubishAdvert = ({
    idAdvert,
    newExpiresAt,
    publishedAt,
    status,
    userLogged,
    token,
}) => {
    const [updatedAdvert, setUpdatedAdvert] = useState({
        status: '',
        newExpiresAt: '',
        publishedAt: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const formatToInputDate = (dateInput) => {
        if (!dateInput) return '';
        // If already YYYY-MM-DD
        if (
            typeof dateInput === 'string' &&
            /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
        )
            return dateInput;
        // If ISO like 2025-10-04T00:00:00.000Z or Date object
        const d = new Date(dateInput);
        if (!isNaN(d)) return d.toISOString().slice(0, 10); // YYYY-MM-DD in UTC
        return '';
    };

    useEffect(() => {
        setUpdatedAdvert({
            status:
                status !== undefined && status !== null ? String(status) : '',
            newExpiresAt: formatToInputDate(newExpiresAt),
            publishedAt: formatToInputDate(publishedAt) || '',
        });
    }, [status, newExpiresAt, publishedAt]);

    if (!userLogged || userLogged.roles !== 'admin') {
        return (
            <h1 className="text-center text-xl">
                No puedes acceder a esta página
            </h1>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const dataForm = new FormData();
            dataForm.append('status', updatedAdvert.status);
            dataForm.append('newExpiresAt', updatedAdvert.newExpiresAt);
            dataForm.append('publishedAt', updatedAdvert.publishedAt);

            await AdminPublishAdvertService({ idAdvert, dataForm, token });

            toast.success('Has publicado el anuncio con éxito');
        } catch (err) {
            console.error('publish advert error:', err);
            const msg =
                err?.response?.data?.message ||
                err.message ||
                'Error desconocido';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h3 className="text-center font-semibold text-lg mb-8">
                Admin publicar anuncio
            </h3>

            <form
                onSubmit={handleSubmit}
                className="sm:grid grid-cols-3 gap-x-2"
            >
                <label className="mb-4">
                    <span className="font-semibold">Status:*</span>
                    <select
                        name="status"
                        value={updatedAdvert.status}
                        required
                        onChange={(e) =>
                            setUpdatedAdvert({
                                ...updatedAdvert,
                                status: e.target.value,
                            })
                        }
                        className="form-select"
                    >
                        <option value="">Selecciona</option>
                        <option value="1">1 (Publicado)</option>
                        <option value="0">0 (Pendiente)</option>
                    </select>
                </label>

                <label className="mb-4">
                    <span className="font-semibold">Publicado:*</span>
                    <input
                        type="date"
                        name="publishedAt"
                        value={updatedAdvert.publishedAt}
                        required
                        onChange={(e) =>
                            setUpdatedAdvert({
                                ...updatedAdvert,
                                publishedAt: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>
                <label className="mb-4">
                    <span className="font-semibold">Caducidad:*</span>
                    <input
                        type="date"
                        name="newExpiresAt"
                        value={updatedAdvert.newExpiresAt}
                        required
                        onChange={(e) =>
                            setUpdatedAdvert({
                                ...updatedAdvert,
                                newExpiresAt: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <input
                    type="submit"
                    value={loading ? 'Publicando...' : 'Publicar anuncio'}
                    disabled={loading}
                    className="btn-account col-span-3 font-semibold"
                />

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            <Toastify />
        </>
    );
};

export default AdminPubishAdvert;
