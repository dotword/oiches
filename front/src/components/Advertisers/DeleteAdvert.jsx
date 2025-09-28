import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const DeleteAdvert = ({ userLogged, token, id, status }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const navigate = useNavigate();

    if (status === 'published') {
        return (
            <h1 className="text-center text-xl">
                No puedes eliminar un anuncio que está publicado
            </h1>
        );
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-advert/${id}`,
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
                    navigate(`/users/account/${userLogged.id}`);
                }, 3000);
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
            <button
                className="btn-account max-w-44 min-w-32 bg-red-600"
                onClick={() => openModal(id)}
            >
                Eliminar
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text="¿Estás seguro de que deseas eliminar este anuncio?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                />
            )}
            <Toastify />
        </section>
    );
};

export default DeleteAdvert;
