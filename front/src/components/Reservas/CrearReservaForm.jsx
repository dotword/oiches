import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import { useState, useEffect } from 'react';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../ConfirmModal.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CrearReservaForm = ({ idUserOwner, calendarActive }) => {
    const { idSala } = useParams();
    const url = `${import.meta.env.VITE_API_URL_BASE}/reservar-sala/${idSala}`;
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value, // Manejo de checkbox y valores normales
        });
    };

    // useEffect para establecer el valor por defecto
    useEffect(() => {
        if (entries.length > 0 && !formValues.project) {
            setFormValues((prev) => ({
                ...prev,
                project: entries[0].id, // Asigna el primer ID como valor por defecto
            }));
        }
    }, [entries, formValues.project]);

    // Obtener fechas disponibles del backend
    useEffect(() => {
        const fetchAvailableDates = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL_BASE
                    }/salas/${idSala}/fechas-disponibles`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (!response.ok)
                    throw new Error('Error al cargar las fechas disponibles.');

                const data = await response.json();
                setAvailableDates(
                    data.result.fechasDisponibles.map((date) => new Date(date))
                );
            } catch (error) {
                toast.error(
                    error.message || 'Error al conectar con el servidor.'
                );
            }
        };
        fetchAvailableDates();
    }, [idSala, token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedDate) {
            toast.error('Por favor, selecciona una fecha.');
            return;
        }
        const formattedDate = `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
        ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

        setFormValues({
            ...formValues,
            fecha: formattedDate,
        });
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        setIsModalOpen(false);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la reserva.');
            }

            toast.success(
                'Reserva creada con éxito. Espere a que la sala confirme su reserva.'
            );
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return calendarActive === 1 && availableDates.length === 0 ? (
        <p className="mt-4 text-center text-red-700 font-semibold">
            No hay ninguna fecha disponible en estos momentos.
        </p>
    ) : (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
                {entries.length > 0 && (
                    <div className="my-4 mx-auto flex gap-3 md:gap-8">
                        <label
                            htmlFor="project"
                            className="flex flex-wrap justify-center"
                        >
                            <span className="font-semibold text-center mb-2">
                                Elige tu proyecto musical:
                            </span>
                            <select
                                id="project"
                                name="project"
                                value={formValues.project || ''}
                                required
                                className="form-select"
                                onChange={handleChange}
                            >
                                {entries.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>
                                        {grupo.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}

                <div className="my-4 flex flex-wrap justify-center gap-3 md:gap-8">
                    <div>
                        <p className="font-semibold mb-2">
                            Fecha en la que quieres tocar*
                        </p>
                        <Calendar
                            onChange={setSelectedDate}
                            tileDisabled={
                                calendarActive === 1
                                    ? ({ date }) =>
                                          !availableDates.some(
                                              (availableDate) =>
                                                  availableDate
                                                      .toISOString()
                                                      .split('T')[0] ===
                                                  date
                                                      .toISOString()
                                                      .split('T')[0]
                                          )
                                    : undefined
                            }
                        />
                    </div>

                    <div className="w-full max-w-96 md:w-auto md:max-w-full md:mt-6">
                        <label
                            htmlFor="flexible"
                            className="flex gap-3 mb-2 w-full"
                        >
                            <span className="font-semibold">
                                ¿Fechas flexibles?
                            </span>
                            <input
                                type="checkbox"
                                name="flexible"
                                id="flexible"
                            />
                        </label>
                        <label htmlFor="message" className="w-full mt-2">
                            <span className="font-semibold">Mensaje:</span>
                            <textarea
                                name="message"
                                required
                                className="form-textarea min-h-28"
                                maxLength="1000"
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        message: e.target.value,
                                    })
                                }
                            ></textarea>
                            <p className="mt-1 text-gray-500 text-sm">
                                1000 caracteres como máximo.
                            </p>
                        </label>
                    </div>
                </div>

                <div className="flex gap-4 mt-6 justify-center">
                    <button className="bg-gradient-to-r from-moradoOiches to-purpleOiches text-white font-bold py-2 px-8 rounded-lg shadow-lg transition-transform hover:scale-105">
                        Enviar solicitud
                    </button>
                </div>
            </form>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                text={'¿Estás seguro de que quieres enviar esta reserva?'}
                classCancel={'bg-red-500'}
            />
            <Toastify />
        </>
    );
};

export default CrearReservaForm;
