import { useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const DeleteAdminVote = ({ token, idVoto }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);

    const handleDelete = async (idVoto) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/concurso/vote/${idVoto}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Has eliminado el voto.');
                setModalOpen(false);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (idVoto) => {
        setItemToDelete(idVoto);
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
            <button
                className="btn-account bg-red-600 "
                onClick={() => openModal(idVoto)}
            >
                Eliminar
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas borrar el voto?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                />
            )}
            <Toastify />
        </>
    );
};

export default DeleteAdminVote;
