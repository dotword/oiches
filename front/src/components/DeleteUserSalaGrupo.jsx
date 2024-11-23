import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from './ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify.jsx';

const DeleteUserSalaGrupo = ({ userLogged, token, id, type }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const endpoint =
            type === 'sala' || type === 'admin'
                ? `/salas/delete/${id}`
                : `/grupos/delete/${id}`;
        try {
            const response = await fetch(`${VITE_API_URL_BASE}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });

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

    const openModal = (id, type) => {
        setItemToDelete(id);
        setDeleteType(type);
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
                onClick={() =>
                    openModal(id, type === 'salas' ? 'salas' : 'grupos')
                }
            >
                Eliminar
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas eliminar este ${
                        deleteType === 'sala' ? 'sala' : 'grupo'
                    }? Perderás todos los datos relacionados con este ${
                        deleteType === 'sala' ? 'sala' : 'grupo'
                    }, incluyendo imágenes, reservas, votos, etc.`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
            <Toastify />
        </section>
    );
};

export default DeleteUserSalaGrupo;
