import { FiMapPin, FiCalendar, FiMusic, FiStar } from 'react-icons/fi';

const FeatureGridMusicos = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-0">
            {/* Título */}
            <h2 className="text-2xl text-center font-semibold mx-auto md:mb-16  md:text-3xl">
                Cómo Oiches puede ayudarte si eres Músico
            </h2>
            {/* Grid con dos columnas y distribución solicitada */}
            <section className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 md:justify-around md:mx-auto xl:w-1200">
                {/* Tarjeta 1 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Acceso directo a salas:
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Encuentra y reserva las salas donde quieres tocar,
                        conoce su historia, equipamiento, etc.
                    </p>
                </div>
                {/* Tarjeta 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Reservas sin complicaciones:
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Puedes enviar solicitudes, gestionar fechas y estar en
                        contacto directo con las salas.
                    </p>
                </div>
                {/* Tarjeta 3 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiMusic className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Más oportunidades:
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Descubre nuevas salas y toca en lugares que no sabías
                        que existían.
                    </p>
                </div>
                {/* Tarjeta 4 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Valoraciones:</h3>
                    <p className="text-gray-600 mt-2">
                        Después de cada concierto, las salas podrán valorar la
                        experiencia, y tú también puedes dejar tus opiniones.
                        ¡Perfecto para crear conexiones!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default FeatureGridMusicos;
