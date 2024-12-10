import { FiMusic, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';

const FeatureGridSalas = () => {
    return (
        <>
            <h2 className="text-3xl text-center font-bold mb-8 mx-auto max-w-700 md:text-4xl md:mb-12">
                ¿Qué te ofrece Oiches si tienes un local con música en directo?
            </h2>

            {/* Grid con dos columnas y distribución solicitada */}
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 md:justify-around md:mx-auto xl:w-1200">
                {/* Tarjeta 1 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Más visibilidad:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Los grupos están activamente buscando salas donde tocar.
                        ¡Haz que encuentren la tuya!
                    </p>
                </div>

                {/* Tarjeta 2 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Nuevos descubrimientos
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Conecta con grupos que quizás aún no conoces, y ofrece
                        tu espacio a artistas emergentes.
                    </p>
                </div>

                {/* Tarjeta 3 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiMusic className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Control total:
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Eliges qué bandas reservas y cuándo. Además, puedes
                        valorar y comentar tu experiencia con cada grupo después
                        del concierto.
                    </p>
                </div>

                {/* Tarjeta 4 */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-transparent hover:border-purple-600 transition-all text-center md:text-left">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-2 mx-auto md:mx-0">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                        Crecimiento
                    </h3>
                    <p className="text-gray-600 mt-2 text-center md:text-left">
                        Más eventos, más música y más oportunidades para hacer
                        crecer tu sala.
                    </p>
                </div>
            </div>
        </>
    );
};

export default FeatureGridSalas;
