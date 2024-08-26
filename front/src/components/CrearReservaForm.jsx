import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import { useState } from 'react';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import { ConfirmationModal } from './ConfirmModal.jsx';

export const CrearReservaForm = () => {
<<<<<<< HEAD
    const { idSala } = useParams();
    const url = `${import.meta.env.VITE_API_URL_BASE}/reservar-sala/${idSala}`;
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState('');
=======
    const { idSala } = useParams(); // Obtén el idSala de los parámetros de la URL
    const url = `${import.meta.env.VITE_API_URL_BASE}/reservar-sala/${idSala}`; // Construye la URL con el idSala
    const { token } = useAuth(); // Obtén el token de autenticación
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal de confirmación
    const [formValues, setFormValues] = useState(null); // Estado para almacenar los valores del formulario
>>>>>>> origin/main

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setFormValues(formData); // Almacena los valores del formulario en el estado
        setIsModalOpen(true); // Abre el modal de confirmación
    };

    const handleConfirm = async () => {
        setIsModalOpen(false); // Cierra el modal
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                },
                body: formValues, // Envía los valores del formulario
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la reserva'); // Maneja posibles errores del servidor
            }

            toast.success(
                'Reserva creada con éxito. Espere a que la sala confirme su reserva.'
            ); // Notificación de éxito
        } catch (error) {
<<<<<<< HEAD
            toast.error(error.message); // mostramos error con Toastify
=======
            toast.error(error.message); // Notificación de error
>>>>>>> origin/main
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Cierra el modal si el usuario cancela
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
