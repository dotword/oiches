import { useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';

const CalendarioDisponibilidad = ({ idSala }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { token } = useAuth();
    const [selectedDates, setSelectedDates] = useState([]);
    const [fechasDisponibles, setFechasDisponibles] = useState([]);
    const [calendarActive, setCalendarActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const oneYearFromNow = new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
    );

    // Función para formatear fechas a 'YYYY-MM-DD'
    const formatDate = (date) =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;

    // Cargar fechas disponibles del backend
    useEffect(() => {
        const fetchFechasDisponibles = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/salas/${idSala}/fechas-disponibles`,
                    {
                        headers: { Authorization: token },
                    }
                );

                if (!response.ok)
                    throw new Error('Error al cargar las fechas disponibles.');

                const { result } = await response.json();

                setFechasDisponibles(
                    result.fechasDisponibles.map((date) =>
                        formatDate(new Date(date))
                    )
                );
                setCalendarActive(result.calendarActive); // Aquí se actualiza el estado
            } catch (error) {
                toast.error(
                    error.message || 'Error al conectar con el servidor.'
                );
            }
        };

        fetchFechasDisponibles();
    }, [idSala, token, VITE_API_URL_BASE]);

    // Cambiar estado de `calendarActive`
    const toggleCalendarActive = async () => {
        setLoading(true);
        try {
            const newCalendarState = !calendarActive;

            const response = await fetch(
                `${VITE_API_URL_BASE}/reservas/salas/${idSala}/calendar-active`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ calendarActive: newCalendarState }),
                }
            );

            if (!response.ok)
                throw new Error(
                    'Error al actualizar el estado del calendario.'
                );

            setCalendarActive(newCalendarState);
            toast.success('Estado del calendario actualizado.');
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Manejar la selección o eliminación de fechas
    const handleDateChange = (date) => {
        if (!calendarActive) return;

        const formattedDate = formatDate(date);

        if (fechasDisponibles.includes(formattedDate)) {
            deleteDate(formattedDate);
        } else {
            setSelectedDates((prev) =>
                prev.includes(formattedDate)
                    ? prev.filter((d) => d !== formattedDate)
                    : [...prev, formattedDate]
            );
        }
    };

    // Eliminar una fecha del backend
    const deleteDate = useCallback(
        async (date) => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${VITE_API_URL_BASE}/reservas/salas/${idSala}/fechas-disponibles`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ fechaDisponible: date }),
                    }
                );

                if (!response.ok)
                    throw new Error('Error al eliminar la fecha.');

                setFechasDisponibles((prev) => prev.filter((d) => d !== date));
                toast.success('Fecha eliminada correctamente.');
            } catch (error) {
                toast.error(
                    error.message || 'Error al conectar con el servidor.'
                );
            } finally {
                setLoading(false);
            }
        },
        [idSala, token, VITE_API_URL_BASE]
    );

    // Enviar fechas seleccionadas al backend
    const submitDates = useCallback(async () => {
        if (!selectedDates.length) {
            toast.error('Selecciona al menos una fecha.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/reservas/salas/${idSala}/fechas-disponibles`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fechaDisponible: selectedDates }),
                }
            );

            if (!response.ok) throw new Error('Error al guardar las fechas.');

            toast.success('Fechas registradas correctamente.');
            setFechasDisponibles((prev) => [
                ...prev,
                ...selectedDates.filter((d) => !prev.includes(d)),
            ]);
            setSelectedDates([]);
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    }, [selectedDates, idSala, token, VITE_API_URL_BASE]);

    // Aplicar clases a los tiles del calendario
    const tileClassName = ({ date }) => {
        const formattedDate = formatDate(date);
        if (fechasDisponibles.includes(formattedDate)) return 'available-date';
        if (selectedDates.includes(formattedDate)) return 'selected-date';
        return '';
    };

    return (
        <div className="md:w-[calc(45%-1rem)]">
            <Calendar
                onChange={handleDateChange}
                selectRange={false}
                tileClassName={tileClassName}
                tileDisabled={({ date }) => {
                    return (
                        date < today || date > oneYearFromNow || !calendarActive
                    );
                }}
            />

            {(calendarActive === 1 || calendarActive === true) && (
                <button
                    onClick={submitDates}
                    disabled={loading}
                    className="btn-account mt-2 mr-4"
                >
                    {loading ? 'Guardando...' : 'Guardar fechas'}
                </button>
            )}
            <button
                onClick={toggleCalendarActive}
                disabled={loading}
                className="btn-account mt-2"
            >
                {calendarActive
                    ? 'Desactivar Calendario'
                    : 'Activar Calendario'}
            </button>
        </div>
    );
};

export default CalendarioDisponibilidad;
