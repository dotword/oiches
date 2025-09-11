import { useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const ResetAdvertClicks = ({ clicks, token, idAdvert }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = async (idAdvert) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-clics/${idAdvert}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Reseteado con éxito');
                setModalOpen(false);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (id) => {
        setItemToDelete(id);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        handleDelete(itemToDelete);
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <section className="mt-12">
            <p>Nº de clicks: {clicks}</p>
            <button
                className="btn-account max-w-44 min-w-32 bg-red-600"
                onClick={() => openModal(idAdvert)}
            >
                Resetear estadísticas
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text="¿Estás seguro de que deseas eliminar las estadísticas de este anuncio?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                />
            )}
            <Toastify />
        </section>
    );
};

export default ResetAdvertClicks;
