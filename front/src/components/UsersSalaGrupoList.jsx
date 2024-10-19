import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ConfirmationModal } from './ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify.jsx';
import useListSalasGrupoUser from '../hooks/useListSalasGrupoUser.jsx';

const UsersSalaGrupoList = ({ userLogged, token, userOwner }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const idUserOwner = userOwner.user.id;

    const { entries = [], setEntries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const type = userLogged.roles;

    const handleDelete = async (id) => {
        const endpoint =
            type === 'sala' ? `/salas/delete/${id}` : `/grupos/delete/${id}`;
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
                setEntries((prevEntries) =>
                    prevEntries.filter((entry) => entry.id !== id)
                );
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
            {entries.length > 0 ? (
                <>
                    <h2 className="text-center font-semibold text-lg mb-6">
                        Gestiona{' '}
                        {userOwner.user.roles === 'sala'
                            ? ' tus salas'
                            : ' tu grupo'}
                    </h2>
                    <ul className="mb-4">
                        {entries.map((entry) => (
                            <li
                                key={entry.id}
                                className="flex items-center justify-center gap-4 mb-2"
                            >
                                <IoIosArrowForward /> {entry.nombre}
                                <a
                                    href={
                                        userOwner.user.roles === 'sala'
                                            ? `/sala/${entry.id}/edit`
                                            : `/grupos/${entry.id}/edit`
                                    }
                                >
                                    <FaPencil className="text-lg text-purpleOiches" />
                                </a>
                                <button
                                    onClick={() =>
                                        openModal(
                                            entry.id,
                                            type === 'salas'
                                                ? 'salas'
                                                : 'grupos'
                                        )
                                    }
                                >
                                    <FaTrashAlt className="text-lg text-purpleOiches" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                ''
            )}

            {(type === 'grupo' && entries.length === 0) ||
            // (type === 'admin' && entries.length === 0) ||
            (type === 'admin' &&
                userOwner.user.roles === 'grupo' &&
                entries.length === 0) ? (
                <a
                    href={`/creacion-grupo/${userOwner.user.id}`}
                    className="btn-account text-xl"
                >
                    Publica tu proyecto musical
                </a>
            ) : (
                ''
            )}

            {type === 'sala' ||
            (type === 'admin' && userOwner.user.roles == 'sala') ? (
                <a
                    href={`/creacion-sala/${userOwner.user.id}`}
                    className="btn-account text-xl"
                >
                    Publica tu sala
                </a>
            ) : (
                ''
            )}

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

export default UsersSalaGrupoList;
