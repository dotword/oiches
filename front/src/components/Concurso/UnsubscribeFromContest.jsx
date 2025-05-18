import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const UnsubscribeFromContest = ({ token, idGrupo }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (idGrupo) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/concurso/unsubscribe/${idGrupo}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Has eliminado tu inscripción al concurso.');
                setModalOpen(false);
                setTimeout(() => {
                    navigate(`/grupo/${idGrupo}`);
                }, 3000);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (idGrupo) => {
        setItemToDelete(idGrupo);
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
                className="btn-account w-80 self-end bg-red-600 margin-r-0 mt-16"
                onClick={() => openModal(idGrupo)}
            >
                Eliminar tu proyecto musical del concurso
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas desinscribirte del concurso?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    classConfirm={'bg-red-500'}
                />
            )}
            <Toastify />
        </>
    );
};

export default UnsubscribeFromContest;
