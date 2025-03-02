import { FiMapPin, FiCalendar, FiMusic, FiStar } from 'react-icons/fi';

const FeatureGridMusicos = () => {
    return (
        <>
            <h2 className="text-3xl text-center font-bold mb-8 mx-auto max-w-lg md:text-4xl md:mb-12">
                Cómo Oiches puede ayudarte si eres manager o agencia
            </h2>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 md:justify-around md:mx-auto xl:w-1200">
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Acceso directo a salas:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Reserva salas de conciertos para tus artistas con acceso
                        a disponibilidad, equipamiento y condiciones de
                        contratación, agilizando la planificación de giras y
                        eventos.
                    </p>
                </div>
                {/* Tarjeta 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Gestión de reservas:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Envía solicitudes, gestiona fechas y comunica
                        directamente con las salas para agilizar la contratación
                        de conciertos y optimizar la planificación de tus
                        artistas.
                    </p>
                </div>
                {/* Tarjeta 3 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiMusic className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Expande tu red:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Descubre y conecta con nuevos artistas y salas de
                        conciertos de forma rápida y eficiente. Amplía tu
                        catálogo de representados y encuentra espacios ideales
                        para cada estilo
                    </p>
                </div>
                {/* Tarjeta 4 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Valoraciones:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Después de cada concierto, las salas podrán valorar la
                        experiencia con tus artistas y tú también podrás dejar
                        opiniones sobre los recintos. Una herramienta clave para
                        generar confianza, mejorar futuras colaboraciones.
                    </p>
                </div>
            </div>
        </>
    );
};

export default FeatureGridMusicos;
