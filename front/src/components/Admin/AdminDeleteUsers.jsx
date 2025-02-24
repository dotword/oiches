import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const AdminDeleteUsers = ({ token, userId, type }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [secondConfirm, setSecondConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-${type}/${userId}`,
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
                    navigate(`/users/account/${userId}`);
                }, 3000);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (userId) => {
        setItemToDelete(userId);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (!secondConfirm) {
            // Primera confirmación → activa segunda confirmación
            setSecondConfirm(true);
        } else {
            // Segunda confirmación → eliminar usuario
            handleDelete(itemToDelete);
        }
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setSecondConfirm(false);
        setItemToDelete(null);
    };

    return (
        <section className="mt-12">
            <button
                className="btn-account w-56 bg-red-600 p-2"
                onClick={() => openModal(userId)}
            >
                Eliminar cuenta del usuario
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={
                        secondConfirm
                            ? '¿Estás completamente seguro? ¡Esta acción es irreversible!'
                            : '¿Estás seguro de que deseas eliminar este usuario? Perderás todos los datos relacionados.'
                    }
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                    classCancel={'bg-green-500'}
                />
            )}
            <Toastify />
        </section>
    );
};

export default AdminDeleteUsers;
