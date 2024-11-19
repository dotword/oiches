import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ConfirmationModal } from './ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify.jsx';
import useListSalasGrupoUser from '../hooks/useListSalasGrupoUser.jsx';

const DeleteUserSalaGrupo = ({ userLogged, token, id, type }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    console.log(type);

    // const idUserOwner = userOwner.user.id;

    // const { entries = [], setEntries } = useListSalasGrupoUser({
    //     token,
    //     idUserOwner,
    // });

    // console.log('entries ', entries);

    // const type = userLogged.roles;

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

                // Filtrar la entrada eliminada de las entradas actuales
                // setEntries((prevEntries) =>
                //     prevEntries.filter((entry) => entry.id !== id)
                // );
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
        <section className="py-6 flex border-b-2 border-greyOiches-50 flex-col items-center">
            <button
                onClick={() =>
                    openModal(id, type === 'salas' ? 'salas' : 'grupos')
                }
            >
                <FaTrashAlt className="text-red-600 ml-4 text-sm" />
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
