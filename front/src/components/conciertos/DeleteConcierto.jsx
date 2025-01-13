import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const DeleteConcierto = ({ token, conciertoId }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (conciertoId) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-concert/${conciertoId}`,
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
                    navigate(`/admin-dashboard`);
                }, 3000);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (conciertoId) => {
        setItemToDelete(conciertoId);
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
        <section className="mt-12">
            <button
                className="btn-account max-w-44 min-w-32 bg-red-600"
                onClick={() => openModal(conciertoId)}
            >
                Eliminar
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas eliminar este concierto`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                />
            )}
            <Toastify />
        </section>
    );
};

export default DeleteConcierto;
