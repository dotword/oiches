import { useState } from 'react';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CrearConcierto = ({ reserva, token }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/conciertos/crear/${
        reserva?.id || 'non-reserva'
    }`;
    const initialDate = reserva?.fecha ? new Date(reserva.fecha) : new Date();

    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [formValues, setFormValues] = useState({
        reservaId: reserva?.id || '',
        fecha: reserva?.fecha || '',
        hora: '',
        precio: '',
        link: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormValues({ ...formValues, [name]: e.target.files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleChangeDate = (date) => {
        setSelectedDate(date);
        const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setFormValues({
            ...formValues,
            fecha: formattedDate,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (formValues.reservaId) {
                formData.append('reservaId', formValues.reservaId);
            }
            formData.append('fecha', formValues.fecha);
            formData.append('hora', formValues.hora);
            formData.append('precio', formValues.precio);
            formData.append('link', formValues.link);
            formData.append('image', formValues.image);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error al crear el concierto.');
            }
            toast.success('Concierto creado correctamente.');
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        }
    };

    const { hora, precio, link } = formValues;

    return (
        <div className="w-full flex flex-col items-center p-4 min-h-screen">
            {/* Contenedor Principal con Ancho Fijo en Pantallas Grandes */}
            <div className="w-full max-w-4x5 bg-white rounded-lg p-6">
                {/* Formulario en Grid (Dos Columnas en Pantallas Grandes) */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
                >
                    {/* Sección Izquierda: Fecha y Hora */}
                    <div className=" p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Fecha y hora</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Selecciona cuándo será el concierto
                        </p>

                        <label className="text-gray-700 text-sm font-medium">
                            Fecha del concierto
                        </label>
                        <Calendar
                            value={selectedDate}
                            onChange={handleChangeDate}
                            className="w-full border rounded-lg shadow-sm mt-2"
                        />

                        <div className="w-full md:w-1/5 flex flex-col gap-2 mt-8">
                            <label className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                                Hora:
                                <input
                                    type="time"
                                    name="hora"
                                    value={hora}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Sección Derecha: Detalles del Concierto */}
                    <div className=" p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">
                            Detalles del concierto
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Información adicional del evento
                        </p>

                        <label className="block text-gray-700 text-sm font-medium">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            name="precio"
                            value={precio}
                            onChange={handleChange}
                            className="w-full md:w-1/5 mt-1 p-2 border border-gray-300 rounded-lg"
                        />

                        <label className="block mt-4 text-gray-700 text-sm font-medium">
                            Enlace
                        </label>
                        <input
                            type="url"
                            name="link"
                            value={link}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />

                        <label className="block mt-4 text-gray-700 text-sm font-medium">
                            Poster
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-dashed border-gray-400 rounded-lg text-sm text-gray-500"
                        />
                        <p className="text-gray-400 text-xs mt-2">
                            PNG, JPG, GIF hasta 2MB
                        </p>
                        {/* Botón de Enviar */}
                        <div className="col-span-1 lg:col-span-2 flex justify-items-start mt-6">
                            <button className="w-full  bg-gradient-to-r from-moradoOiches to-purpleOiches text-white font-bold text-lg py-3 rounded-lg shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-lg">
                                Crear concierto
                            </button>
                        </div>
                    </div>
                </form>

                <Toastify />
            </div>
        </div>
    );
};

export default CrearConcierto;
