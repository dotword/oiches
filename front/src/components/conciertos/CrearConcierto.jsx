import { useState } from 'react';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CrearConcierto = ({ reserva, token }) => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/conciertos/${reserva.id}`;
    const initialDate = new Date(reserva.fecha);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [formValues, setFormValues] = useState({
        reservaId: reserva.id,
        fecha: '',
        hora: '',
        precio: '',
        link: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            // Manejo del archivo
            setFormValues({ ...formValues, [name]: e.target.files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleChangeDate = (date) => {
        setSelectedDate(date);

        // Formatea la fecha seleccionada y actualiza formValues
        const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        setFormValues({
            ...formValues,
            fecha: formattedDate, // Actualiza la fecha en formValues
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('reservaId', formValues.reservaId);
            formData.append('fecha', formValues.fecha);
            formData.append('hora', formValues.hora);
            formData.append('precio', formValues.precio);
            formData.append('link', formValues.link);
            formData.append('image', formValues.image);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`, // El token puede ir en el encabezado
                },
                body: formData, // Enviamos el FormData
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
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap justify-evenly gap-8"
            >
                <div className="md:max-w-[calc(50%-1rem)]">
                    <p className="font-semibold mb-2">Fecha del concierto*</p>
                    <Calendar
                        value={selectedDate}
                        onChange={handleChangeDate}
                        className="concert"
                    />
                </div>

                <div className="md:max-w-[calc(50%-1rem)] flex flex-col gap-2">
                    <label>
                        <span className="font-semibold mr-2">Hora:</span>
                        <input
                            type="time"
                            name="hora"
                            value={hora}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <span className="font-semibold mr-2">Precio:</span>
                        <input
                            type="number"
                            name="precio"
                            value={precio}
                            onChange={handleChange}
                            className="form-input max-w-32"
                        />
                    </label>

                    <label className="flex items-baseline">
                        <span className="font-semibold mr-2">Enlace:</span>
                        <input
                            type="url"
                            name="link"
                            value={link}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </label>

                    <label>
                        <span className="font-semibold mr-2">Poster:</span>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </label>
                    <div className="flex gap-4 mt-6 justify-center">
                        <button className="btn-account">Crear concierto</button>
                    </div>
                </div>
            </form>

            <Toastify />
        </>
    );
};

export default CrearConcierto;
