import { FaVoteYea, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MusicianContestBanner = () => {
    return (
        // overflow-hidden evita barras de desplazamiento por el margen negativo inferior
        <section className="w-full bg-black text-white overflow-hidden">
            {/* Contenedor flex principal: columna en pequeño, fila en mediano+ */}
            <div className="flex flex-col md:flex-row h-auto lg:h-[750px] relative">
                <div className="relative w-full flex flex-col justify-center px-6 py-12 bg-gradient-to-r from-[#3A0CA3] via-[#7209B7] to-[#f72585] sm:px-8 md:w-2/4 md:px-12 md:py-8">
                    {/* Contenedor interno para alineación de texto y ancho máximo */}
                    <div className="w-full mx-auto md:mx-0">
                        {/* Alineación de texto: moviles tablet */}
                        <div className="text-center md:text-left">
                            <p className="uppercase text-base md:text-lg lg:text-xl tracking-wide mb-2">
                                Atención artistas y bandas
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold leading-tight break-words mb-2">
                                {/* Span para texto en una sola l inea pantallas grandes asi dejamos menos espacio de degradado */}
                                <span className="block lg:inline">
                                    Concurso de músicos
                                </span>
                            </h1>

                            <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
                                Oiches 2025
                            </h2>
                            <h3 className="text-lg lg:text-2xl font-semibold uppercase mt-6 mb-1">
                                Inscripciones
                                {/* Votaciones */}
                            </h3>
                            <p className="text-base lg:text-lg mb-6">
                                19 DE MAYO - 09 DE JUNIO
                                {/* 11 DE JUNIO - 06 DE JULIO */}
                            </p>

                            <Link
                                to="/concurso-musicos-oiches"
                                className="relative z-10 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-base lg:text-lg transition duration-300 ease-in-out transform hover:scale-105 mb-8 md:mb-32"
                            >
                                Más información →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Área de Imagen Derecha */}

                <div className="w-full md:w-2/4 h-[300px] sm:h-[400px] md:h-auto lg:h-[960px] relative">
                    <img
                        src="/Soloamplie.png"
                        alt="Concierto de músicos oiches 2025"
                        className="absolute inset-0 w-full h-full object-cover" // object-cover evita distorsion
                    />
                </div>
            </div>

            {/* Banner Informativo Blanco Margen negativo lo sube sobre la sección superior z-10 asegura que esté sobre la imagen si hay solapamiento */}

            <div className="relative -mt-12 md:-mt-8 lg:-mt-24 z-10">
                {/* Contenedor con fondo, padding, ancho máximo, esquina redondeada y sombra */}
                <div className="bg-white text-gray-900 py-10 px-6 sm:px-10 md:px-12 lg:px-16 w-full max-w-full md:max-w-6xl lg:max-w-7xl rounded-tr-3xl shadow-[0_0_25px_rgba(0,0,0,0.70)]">
                    {/* Grid responsivo para los tres puntos informativos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {/* Punto Informativo 1 */}
                        {/* Centrado en sm y md, izquierda en lg. Margen izquierdo desde sm */}
                        <div className="text-center md:text-center lg:text-left sm:ml-6">
                            {/* Icono centrado automáticamente por text-center en el div padre */}
                            <FaVoteYea className="text-purple-600 text-4xl mb-3 inline-block" />

                            <h4 className="font-bold text-purple-700 text-lg mb-1">
                                Votación popular
                            </h4>
                            <p className="text-base text-gray-600">
                                Votación online y pública. 9 proyectos
                                finalistas.
                            </p>
                        </div>
                        {/* Punto Informativo 2 */}
                        <div className="text-center md:text-center lg:text-left sm:ml-6">
                            <FaUsers className="text-purple-600 text-4xl mb-3 inline-block" />
                            <h4 className="font-bold text-purple-700 text-lg mb-1">
                                3 proyectos ganadores
                            </h4>
                            <p className="text-base text-gray-600">
                                Los ganadores actuarán en La Conservera
                                (Viveiro).
                            </p>
                        </div>
                        {/* Punto Informativo 3 */}
                        <div className="text-center md:text-center lg:text-left sm:ml-6">
                            <FaMoneyBillWave className="text-purple-600 text-4xl mb-3 inline-block" />
                            <h4 className="font-bold text-purple-700 text-lg mb-1">
                                Premio en metálico
                            </h4>
                            <p className="text-base text-gray-600">
                                600 € a cada proyecto ganador + promoción.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MusicianContestBanner;
