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
                'Reserva creada con éxito. Espere a que la sala confirme su reserva.'
            );
        } catch (error) {
            toast.error(error.message); // mostramos error con Toastify
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 md:items-center"
            >
                <h2 className="text-xl font-semibold mb-3">
                    Datos de la reserva
                </h2>
                <div className="mb-2">
                    <label htmlFor="fecha" className="font-semibold">
                        Fecha de la reserva
                    </label>
                    <input
                        className="block md:mx-auto"
                        type="date"
                        name="fecha"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="horaInicio" className="font-semibold">
                        Hora de inicio de la reserva
                    </label>
                    <input
                        className="block md:mx-auto"
                        type="time"
                        name="horaInicio"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="horaFin" className="font-semibold">
                        Hora final de la reserva
                    </label>
                    <input
                        className="block md:mx-auto"
                        type="time"
                        name="horaFin"
                        required
                    />
                </div>
                <div className="flex justify-evenly mt-6 gap-6">
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
