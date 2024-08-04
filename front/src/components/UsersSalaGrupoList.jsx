import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { ConfirmationModal } from './ConfirmModal.jsx'; // Asegúrate de que la ruta es correcta
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify.jsx';

const UsersSalaGrupoList = () => {
    const { userLogged, token } = useAuth();
    const { VITE_API_URL_BASE } = import.meta.env;
    const [salas, setSalas] = useState(userLogged.salas || []);
    const [grupos, setGrupos] = useState(userLogged.grupos || []);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);

    const handleDelete = async (id, type) => {
        const endpoint = type === 'sala' ? `/salas/delete/${id}` : `/grupos/delete/${id}`;
        try {
            const response = await fetch(`${VITE_API_URL_BASE}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                if (type === 'sala') {
                    setSalas((prev) => prev.filter((sala) => sala.id !== id));
                } else {
                    setGrupos((prev) => prev.filter((grupo) => grupo.id !== id));
                }
                toast.success('Eliminado con éxito');
                setModalOpen(false); // Cierra el modal después de eliminar
            } else {
                toast.error('Error al eliminar');
                console.error('Error eliminando:', response.statusText);
            }
        } catch (error) {
            toast.error('Error al eliminar');
            console.error('Error eliminando:', error);
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
        <section className="mt-8 border-y-2 border-greyOiches-50 py-6 md:flex md:flex-col md:items-center">
            {userLogged.roles === 'sala' ? (
                <>
                    {salas.length > 0 ? (
                        <>
                            <h2 className="text-center font-semibold text-lg mb-6">
                                Gestiona tus salas
                            </h2>
                            <ul className="mb-4">
                                {salas.map((sala) => (
                                    <li
                                        key={sala.id}
                                        className="flex items-center justify-center gap-2 mb-2"
                                    >
                                        <IoIosArrowForward />{' '}
                                        <a href={`/sala/${sala.id}/edit`}>
                                            {sala.nombre}
                                        </a>
                                        <a href={`/sala/${sala.id}/edit`}>
                                            <FaPencil className="text-sm text-purpleOiches" />
                                        </a>
                                        <button onClick={() => openModal(sala.id, 'sala')}>
                                            <FaTrashAlt className="text-sm text-purpleOiches" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        ''
                    )}
                    <a
                        href="/creacion-sala"
                        className="btn-account max-w-44 min-w-32"
                    >
                        Crea una sala
                    </a>
                </>
            ) : (
                <>
                    {grupos.length > 0 ? (
                        <>
                            <h2 className="text-center font-semibold text-lg mb-6">
                                Gestiona tu grupo
                            </h2>
                            <ul className="mb-4">
                                {grupos.map((grupo) => (
                                    <li
                                        key={grupo.id}
                                        className="flex items-center justify-center gap-2 mb-2"
                                    >
                                        <IoIosArrowForward />{' '}
                                        <a href={`/grupos/${grupo.id}/edit`}>
                                            {grupo.nombre}
                                        </a>
                                        <a href={`/grupos/${grupo.id}/edit`}>
                                            <FaPencil className="text-sm text-purpleOiches" />
                                        </a>
                                        <button onClick={() => openModal(grupo.id, 'grupo')}>
                                            <FaTrashAlt className="text-sm text-purpleOiches" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <a
                            href="/creacion-grupo"
                            className="btn-account max-w-44 min-w-32"
                        >
                            Crea un grupo
                        </a>
                    )}
                </>
            )}
            {modalOpen && (
                <ConfirmationModal 
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas eliminar este ${deleteType === 'sala' ? 'sala' : 'grupo'}? Perderás todos los datos relacionados con este ${deleteType === 'sala' ? 'sala' : 'grupo'}, incluyendo imágenes, reservas, votos, etc.`}
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            )}
            <Toastify />
        </section>
    );
};

export default UsersSalaGrupoList;
