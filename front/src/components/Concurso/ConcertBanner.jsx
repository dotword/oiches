import { Link } from 'react-router-dom';

const ConcertBanner = () => {
    return (
        <section className="relative bg-hero-concierto bg-cover bg-center text-white kilogram min-h-[60vh] sm:min-h-screen flex items-start sm:items-center justify-center pt-8 sm:pt-0">
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 px-4 py-2 sm:py-12 w-full max-w-6xl">
                {/* CABECERA: CONCERTO + OICHES + 2025 + OICHES & LA CONSERVERA */}
                <div className="flex flex-col items-center">
                    {/* Bloque principal con posicionamiento relativo */}
                    <div className="relative">
                        {/* Título principal */}
                        <div className="text-center space-y-2 flex flex-col items-center">
                            <h2 className="text-white text-7xl sm:text-8xl md:text-9xl font-normal leading-none w-full">
                                concierto
                            </h2>
                            <div className="inline-flex flex-col items-start">
                                <h3 className="text-yellowOiches text-7xl sm:text-8xl md:text-9xl font-normal leading-none -mt-8">
                                    OICHES
                                </h3>
                                <div className="flex items-center">
                                    <h3 className="text-yellowOiches text-7xl sm:text-8xl md:text-9xl font-normal leading-none -mt-8">
                                        2025
                                    </h3>
                                    <div className="text-left ml-2 sm:ml-4 md:ml-6 -space-y-1 sm:-space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">
                                        <p className="leading-none whitespace-nowrap">
                                            OICHES &
                                        </p>
                                        <p className="leading-none whitespace-nowrap">
                                            LA CONSERVERA
                                        </p>
                                        <p className="tracking-[0.1em] mt-1 whitespace-nowrap">
                                            (VIVEIRO)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LINEUP */}
                    <div className="mt-4 sm:mt-10 md:mt-12 space-y-2 text-4xl sm:text-5xl md:text-6xl font-normal tracking-normal text-center">
                        <p>
                            <span className="text-white">DISTANCE </span>
                            <span className="text-yellowOiches">SISTERS</span>
                        </p>
                        <p>
                            <span className="text-yellowOiches">ANDREI </span>
                            <span className="text-white">LA LEY</span>
                        </p>
                        <p className="text-yellowOiches">BETANIA</p>
                    </div>

                    {/* INFORMACIÓN INFERIOR */}
                    <div className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl font-normal flex flex-col md:flex-row md:justify-center md:items-center md:gap-8 uppercase tracking-normal">
                        <span>
                            Septiembre{' '}
                            <span className="text-yellowOiches">20</span>
                        </span>
                        <Link
                            to="/concurso/concierto-oiches"
                            className="px-6 py-4 sm:py-2 text-base sm:text-lg md:text-xl bg-white hover:text-white hover:bg-gradient-to-r hover:from-purpleOiches hover:to-moradoOiches text-moradoOiches font-['Encode_Sans'] font-bold rounded-lg transition-all hover:scale-105 mt-4 mb-8 md:mb-0 md:mt-0"
                        >
                            MÁS INFORMACIÓN
                        </Link>
                        {/* <a
                            href="/concurso/concierto-oiches"
                            className="px-6 py-4 sm:py-2 text-base sm:text-lg md:text-xl bg-white hover:text-white hover:bg-gradient-to-r hover:from-purpleOiches hover:to-moradoOiches text-moradoOiches font-['Encode_Sans'] font-bold rounded-lg transition-all hover:scale-105 mt-4 mb-8 md:mb-0 md:mt-0"
                            style={{ fontFamily: "'Encode Sans', sans-serif" }}
                        >
                            MÁS INFORMACIÓN
                        </a> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConcertBanner;
