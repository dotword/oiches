import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import EditNoticeService from '../../services/Noticeboard/EditNoticeService.js';
import useNotice from '../../hooks/useNotice.jsx';
import { ConfirmationModal } from '../ConfirmModal.jsx';

const NoticeEdicion = () => {
    const { idNotice } = useParams();
    const { VITE_API_URL_BASE } = import.meta.env;
    const { userLogged, token } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const navigate = useNavigate();
    const { notice } = useNotice({ idNotice, token });

    const [updatedNotice, setUpdatedNotice] = useState({
        provincia: '',
        titulo: '',
        descripcion: '',
    });
    useEffect(() => {
        if (notice) {
            setUpdatedNotice({
                provincia: notice.provinciaId || '',
                titulo: notice.titulo || '',
                descripcion: notice.descripcion || '',
            });
        }
    }, [notice]);

    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData();

            dataForm.append('provincia', updatedNotice.provincia);
            dataForm.append('titulo', updatedNotice.titulo);
            dataForm.append('descripcion', updatedNotice.descripcion);

            await EditNoticeService({ token, idNotice, dataForm });

            toast.success('Has modificado tu anuncio con éxito');
            setTimeout(() => {
                navigate(`/noticeboard/user/${notice.usuario_id}`);
            }, 3000);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    if (!userLogged) {
        return (
            <h1 className="text-center text-xl">
                No puedes acceder a esta página
            </h1>
        );
    }
    const handleDelete = async (idNotice) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-notice/${idNotice}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Eliminado con éxito');
                setModalOpen(false);
                setTimeout(() => {
                    navigate(`/noticeboard/user/${notice.usuario_id}`);
                }, 3000);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (idNotice) => {
        setItemToDelete(idNotice);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        handleDelete(itemToDelete, deleteType);
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setItemToDelete(null);
        setDeleteType(null);
    };
    return (
        <>
            <h3 className="text-center font-semibold text-lg mb-8">
                Busco... {notice.category}
            </h3>
            <form
                onSubmit={handleSubmit}
                className="mb-12 md:flex md:flex-wrap gap-x-8"
            >
                <label
                    htmlFor="titulo"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Título:*</span>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título del anuncio"
                        value={updatedNotice.titulo}
                        required
                        onChange={(e) =>
                            setUpdatedNotice({
                                ...updatedNotice,
                                titulo: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="provincia"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Provincia:</span>
                    <select
                        id="provincia"
                        name="provincia"
                        value={updatedNotice.provincia}
                        className="form-select"
                        onChange={(e) =>
                            setUpdatedNotice({
                                ...updatedNotice,
                                provincia: e.target.value,
                            })
                        }
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </label>

                <label
                    htmlFor="descripcion"
                    className="flex flex-col mb-4 md:w-full"
                >
                    <span className="font-semibold">Descripción:*</span>
                    <textarea
                        name="descripcion"
                        value={updatedNotice.descripcion}
                        onChange={(e) =>
                            setUpdatedNotice({
                                ...updatedNotice,
                                descripcion: e.target.value,
                            })
                        }
                        required
                        className="form-textarea"
                        maxLength="2000"
                    />
                    <p className="mt-1 text-gray-500 text-sm">
                        2000 caracteres como máximo
                    </p>
                </label>

                <input
                    type="submit"
                    value="Editar"
                    className="btn-account my-8 mx-auto p-3 w-full max-w-80 font-semibold"
                />

                {error && <p className="text-red-500">{error}</p>}
            </form>
            {userLogged && (
                <div className="flex justify-end gap-8">
                    <button
                        className="btn-account max-w-44 min-w-32 bg-red-600"
                        onClick={() => openModal(idNotice)}
                    >
                        Eliminar anuncio
                    </button>
                    {modalOpen && (
                        <ConfirmationModal
                            isOpen={modalOpen}
                            text={`¿Estás seguro de que deseas eliminar este anuncio?`}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                            classConfirm={'bg-red-500'}
                        />
                    )}
                </div>
            )}

            <Toastify />
        </>
    );
};

export default NoticeEdicion;
