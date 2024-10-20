import { FiMusic, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';

const FeatureGridSalas = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-0">
            {/* Título */}
            <h2 className="text-2xl text-center font-semibold mx-auto md:mb-16  md:text-3xl">
                ¿Qué te ofrece Oiches si eres una Sala de conciertos o Bar con
                música en directo?
            </h2>

            {/* Grid con dos columnas y distribución solicitada */}
            <section className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 md:justify-around md:mx-auto xl:w-1200">
                {/* Tarjeta 1 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Más visibilidad:</h3>
                    <p className="text-gray-600 mt-2">
                        Los grupos están activamente buscando salas donde tocar.
                        ¡Haz que encuentren la tuya!
                    </p>
                </div>

                {/* Tarjeta 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Nuevos descubrimientos
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Conecta con grupos que quizás aún no conoces, y ofrece
                        tu espacio a artistas emergentes.
                    </p>
                </div>

                {/* Tarjeta 3 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiMusic className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Control total:</h3>
                    <p className="text-gray-600 mt-2">
                        Eliges qué bandas reservas y cuándo. Además, puedes
                        valorar y comentar tu experiencia con cada grupo después
                        del concierto.
                    </p>
                </div>

                {/* Tarjeta 4 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Crecimiento</h3>
                    <p className="text-gray-600 mt-2">
                        Más eventos, más música y más oportunidades para hacer
                        crecer tu sala.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default FeatureGridSalas;
