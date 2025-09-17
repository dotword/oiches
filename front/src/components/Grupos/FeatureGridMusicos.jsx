import { FiMapPin, FiCalendar, FiMusic, FiStar } from 'react-icons/fi';

const FeatureGridMusicos = () => {
    return (
        <>
            <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                Cómo Oiches puede ayudarte si eres músico
            </h2>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 md:justify-around md:mx-auto xl:w-1200">
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="icon-circle-gradient">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Acceso directo a salas:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Encuentra y reserva las salas donde quieres tocar,
                        conoce su historia, equipamiento, etc.
                    </p>
                </div>
                {/* Tarjeta 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="icon-circle-gradient">
                        <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Reservas sin complicaciones:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Puedes enviar solicitudes, gestionar fechas y estar en
                        contacto directo con las salas.
                    </p>
                </div>
                {/* Tarjeta 3 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="icon-circle-gradient">
                        <FiMusic className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Más oportunidades:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Descubre nuevas salas y toca en lugares que no sabías
                        que existían.
                    </p>
                </div>
                {/* Tarjeta 4 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="icon-circle-gradient">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Valoraciones:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Después de cada concierto, las salas podrán valorar la
                        experiencia, y tú también puedes dejar tus opiniones.
                        ¡Perfecto para crear conexiones!
                    </p>
                </div>
            </div>
        </>
    );
};

export default FeatureGridMusicos;
