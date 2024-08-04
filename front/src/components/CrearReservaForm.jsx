import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import { useState } from 'react';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import { ConfirmationModal } from './ConfirmModal.jsx';

export const CrearReservaForm = () => {
    const { idSala } = useParams();
    const url = `${import.meta.env.VITE_API_URL_BASE}/reservar-sala/${idSala}`;
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormValues(new FormData(e.target));
        setIsModalOpen(true);
    };
    const handleConfirm = async () => {
        setIsModalOpen(false);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    authorization: `${token}`,
                },
                body: formValues,
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(response);
                throw new Error(`${data.message} `);
            }

            toast.success(
                'Reserva creada con éxito espere a que la sala confirme su reserva.'
            );
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mx-auto max-w-6xl"
            >
                <h2 className="text-2xl">Elija los datos para la reserva :</h2>
                <label htmlFor="fecha">
                    Elija una fecha para la reserva:
                    <input
                        className="block"
                        type="date"
                        name="fecha"
                        required
                    />
                </label>
                <label htmlFor="horaInicio">
                    Elija una hora para el inicio de la reserva:
                    <input
                        className="block"
                        type="time"
                        name="horaInicio"
                        required
                    />
                </label>
                <label htmlFor="horaFin">
                    Elija una hora aproximada para el fin de la reserva:
                    <input
                        className="block"
                        type="time"
                        name="horaFin"
                        required
                    />
                </label>
                <div className="flex justify-evenly">
                    <button className="button" type="submit">
                        Crear Reserva
                    </button>
                    <button className="button bg-red-500" type="reset">
                        Borrar
                    </button>
                </div>
            </form>
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                text={'¿Estás seguro de que quieres enviar esta reserva?'}
            />
            <Toastify />
        </>
    );
};
