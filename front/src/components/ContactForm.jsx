import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombreContacto: '',
        nombreSalaArtista: '',
        email: '',
        mensaje: '',
        aceptaPolitica: false, // Consentimiento siempre desmarcado de primeras
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Función de validación de formulario
    const validateForm = () => {
        if (
            !formData.nombreContacto ||
            !formData.nombreSalaArtista ||
            !formData.email ||
            !formData.mensaje
        ) {
            return 'Por favor, completa todos los campos.';
        }
        if (!formData.aceptaPolitica) {
            return 'Debes aceptar la política de privacidad.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Por favor, ingresa un correo electrónico válido.';
        }
        return '';
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación del formulario antes de enviar
        const errorMessage = validateForm();
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

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
                email: '',
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
        <div className="w-full max-w-6xl mx-auto p-6 md:p-2 bg-black bg-opacity-50 rounded-lg border border-gray-500 backdrop-blur-lg flex flex-col md:flex-row gap-10 items-center md:items-stretch justify-center mt-60 md:mt-10">
            <div className="flex flex-col gap-6 w-full md:w-1/2  md:p-6">
                <h2 className="text-white text-2xl font-semibold text-center md:text-left">
                    Ponte en contacto con nosotros
                </h2>
                <p className="text-white text-opacity-80 text-center md:text-left">
                    Seamos libres, hagamos música.
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="nombreContacto"
                            placeholder="Nombre de Contacto"
                            value={formData.nombreContacto}
                            onChange={handleChange}
                            className="flex-1 p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                        />
                        <input
                            type="text"
                            name="nombreSalaArtista"
                            placeholder="Nombre Sala / Artista"
                            value={formData.nombreSalaArtista}
                            onChange={handleChange}
                            className="flex-1 p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                    />
                    <textarea
                        name="mensaje"
                        placeholder="Mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="w-full p-3 h-28 bg-white bg-opacity-10 rounded border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60"
                    />
                    <label className="flex flex-wrap items-center text-white">
                        <input
                            type="checkbox"
                            name="aceptaPolitica"
                            checked={formData.aceptaPolitica}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="whitespace-nowrap">
                            He leído y acepto la
                            <a
                                href="https://oiches.com/politica-privacidad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold underline ml-1"
                            >
                                Política de privacidad
                            </a>
                        </span>
                    </label>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && (
                        <p className="text-green-500 text-sm">
                            {successMessage}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#763AF5] to-[#A604F2] rounded text-white font-medium"
                    >
                        Enviar Mensaje
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/2 gap-2 text-white ">
                <img
                    src="/Oiches-logo-vertical.png"
                    alt="Logo"
                    className="w-80 md:w-30 my-4"
                />

                <button
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    className="md:hidden bg-purpleOiches text-white font-normal p-2 rounded-md mb-4"
                >
                    {isInfoOpen
                        ? 'Ocultar Información Protección de Datos'
                        : 'Mostrar Información Protección de Datos'}
                </button>

                <div
                    className={`p-5 bg-opacity-50 rounded-lg text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                        isInfoOpen ? 'block' : 'hidden'
                    } md:block`}
                >
                    <p className="text-sm font-semibold">Responsabilidad:</p>
                    <p>
                        María Carmen Salgueiro Rodríguez (En adelante, Oiches)
                    </p>
                    <p className="text-sm font-semibold mt-2">Finalidad:</p>
                    <p>Envío y recepción de información, gestión de usuarios</p>
                    <p className="text-sm font-semibold mt-2">Legitimación:</p>
                    <p>Consentimiento del interesado</p>
                    <p className="text-sm font-semibold mt-2">Destinatarios:</p>
                    <p>
                        Plataformas de Marketing (Consultar política de
                        privacidad)
                    </p>
                    <p className="text-sm font-semibold mt-2">Derechos:</p>
                    <p>
                        De acceso, rectificación y supresión de datos, así como
                        otros derechos detallados en la política de privacidad.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
