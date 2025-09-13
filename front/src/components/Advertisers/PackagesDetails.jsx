import { FaCheck } from 'react-icons/fa6';

const PackagesDetails = () => {
    return (
        <div className="mx-auto mt-6 grid w-11/12 grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card 1 - Anuncio Básico */}
            <div className="package-card group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <div className="flex items-center justify-between gap-x-4 mb-4">
                    <h3 className="package-title">Anuncio básico</h3>
                </div>

                {/* Lista de características - altura fija */}
                <div className="flex-1 mb-4">
                    <div className="text-sm leading-6 text-gray-200">
                        <ul className="space-y-2 h-32">
                            <li className="package-desc-item">
                                <FaCheck className="text-green-500" />
                                Título
                            </li>
                            <li className="package-desc-item">
                                <FaCheck className="text-green-500" />
                                Descripción
                            </li>
                            <li className="package-desc-item">
                                <FaCheck className="text-green-500" />
                                Imagen pequeña
                            </li>
                            <li className="package-desc-item">
                                <FaCheck className="text-green-500" />
                                Enlace a tu web - Contacto
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Precio - posición fija */}
                <div className="mb-4">
                    <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
                        <span className="text-4xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
                            20 €
                        </span>
                        <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
                            /3 meses
                        </span>
                    </p>
                </div>

                {/* Descripción y opciones adicionales */}
                <div className="mt-auto">
                    <ul className="space-y-3 text-base leading-6 text-gray-200">
                        <li className="flex items-center justify-center gap-x-3">
                            <div className="flex gap-2 flex-wrap justify-center">
                                <span className="package-buttons bg-blue-900/40 text-blue-200  border-blue-700/50">
                                    6 meses: 35€
                                </span>
                                <span className="package-buttons bg-green-900/40 text-green-200  border-green-700/50">
                                    1 año: 60€
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Card 2 - Anuncio Destacado */}
            <div className="package-card group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-baseline justify-between gap-x-4 mb-4">
                        <h3 className="package-title">Anuncio destacado</h3>
                        {/* <span className="package-popular">
                                Más popular
                            </span> */}
                    </div>

                    {/* Lista de características - altura fija */}
                    <div className="flex-1 mb-4">
                        <div className="text-sm leading-6 text-gray-200">
                            <ul className="space-y-2 h-32">
                                <li className="package-desc-item">
                                    <FaCheck className="text-green-500" />
                                    Básico +
                                </li>
                                <li className="package-desc-item">
                                    <FaCheck className="text-green-500" />
                                    Siempre en primeras posiciones
                                </li>
                                <li className="package-desc-item">
                                    <FaCheck className="text-green-500" />
                                    Imagen principal grande
                                </li>
                                <li className="package-desc-item">
                                    <FaCheck className="text-green-500" />
                                    Fondo destacado en el listado
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Precio - posición fija */}
                    <div className="mb-4">
                        <p className="flex items-baseline justify-center gap-x-1 transform transition-all duration-300 group-hover:scale-110">
                            <span className="text-4xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors duration-300">
                                30 €
                            </span>
                            <span className="text-sm font-semibold leading-6 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300">
                                /3 meses
                            </span>
                        </p>
                    </div>

                    {/* Descripción y opciones adicionales */}
                    <div className="mt-auto">
                        <ul className="space-y-3 text-base leading-6 text-gray-200">
                            <li className="flex items-center justify-center">
                                <div className="flex gap-2 flex-wrap justify-center">
                                    <span className="package-buttons bg-blue-900/40 text-blue-200  border-blue-700/50">
                                        6 meses: 50€
                                    </span>
                                    <span className="package-buttons bg-green-900/40 text-green-200  border-green-700/50">
                                        1 año: 90€
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesDetails;
