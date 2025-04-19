import { useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Toastify.jsx';

const SubscribeFromContest = ({ token, idGrupo }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToAcept, setItemToAcept] = useState(null);
    const [aceptType, setAceptType] = useState(null);

    const handleAccept = async (idGrupo) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/concurso/subscribe/${idGrupo}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Has aceptado la inscripción al concurso.');
                setModalOpen(false);
            } else {
                toast.error('Error al aceptar');
            }
        } catch (error) {
            toast.error('Error al aceptar');
        }
    };

    const openModal = (idGrupo) => {
        setItemToAcept(idGrupo);
        setModalOpen(true);
    };

    const confirmAcept = () => {
        handleAccept(itemToAcept, aceptType);
    };

    const cancelAcept = () => {
        setModalOpen(false);
        setItemToAcept(null);
        setAceptType(null);
    };

    return (
        <>
            <button
                className="btn-account w-80 self-end bg-green-600 margin-r-0"
                onClick={() => openModal(idGrupo)}
            >
                Aceptar el proyecto musical al concurso
            </button>

            {modalOpen && (
                <ConfirmationModal
                    isOpen={modalOpen}
                    text={`¿Estás seguro de que deseas inscribir este proyecto?`}
                    onConfirm={confirmAcept}
                    onCancel={cancelAcept}
                    classConfirm={'bg-green-500'}
                />
            )}
            <Toastify />
        </>
    );
};

export default SubscribeFromContest;
