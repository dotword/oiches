import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombreContacto: '',
        nombreSalaArtista: '',
        emailFrom: '',
        mensaje: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');

        // Enviar datos a la API
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL_BASE}/contacto`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }

            setSuccessMessage('Mensaje enviado con éxito.');

            setFormData({
                nombreContacto: '',
                nombreSalaArtista: '',
                emailFrom: '',
                mensaje: '',
                aceptaPolitica: false,
            });
        } catch (error) {
            setError(
                'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.'
            );
        }
    };

    return (
        <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
            <div className="flex flex-col flex-wrap md:flex-row gap-4">
                <input
                    type="text"
                    name="nombreContacto"
                    placeholder="Nombre de contacto"
                    value={formData.nombreContacto}
                    onChange={handleChange}
                    className="flex-1 p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                />
                <input
                    type="text"
                    name="nombreSalaArtista"
                    placeholder="Nombre sala/artista"
                    value={formData.nombreSalaArtista}
                    onChange={handleChange}
                    className="flex-1 p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                />
            </div>
            <input
                type="email"
                name="emailFrom"
                placeholder="Email *"
                value={formData.emailFrom}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
            />
            <textarea
                name="mensaje"
                placeholder="Mensaje *"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full p-3 h-28 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
            />

            <p className="text-white">
                <input type="checkbox" name="terms" required /> Acepto la{' '}
                <a
                    href="/politica-privacidad"
                    target="blank"
                    className="underline"
                >
                    política de privacidad
                </a>
            </p>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
            )}
            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#763AF5] to-[#A604F2] rounded text-white font-medium"
            >
                Enviar Mensaje
            </button>
        </form>
    );
};

export default ContactForm;
