// import { FaVoteYea, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

// const MusicianContestBanner = () => {
//     return (
//         <section className="w-full bg-black text-white overflow-hidden">
//             <div className="flex flex-col md:flex-row h-[750px] relative">
//                 {/* Zona de texto con gradiente */}
//                 <div className="relative w-full md:w-2/3 flex flex-col justify-center px-6 md:px-16 bg-gradient-to-r from-[#3A0CA3] via-[#7209B7] to-[#f72585] z-10">
//                     <div className="max-w-xl">
//                         <p className="uppercase text-xl tracking-wide mb-2 ml-20">
//                             Atención artistas y bandas
//                         </p>
//                         <h1 className="text-xl md:text-7xl font-extrabold leading-tight mb-2 ml-20">
//                             <span className="whitespace-nowrap">
//                                 Concurso de músicos
//                             </span>
//                             <br />
//                             <span className="text-4xl md:text-6xl">
//                                 Oiches 2025
//                             </span>
//                         </h1>
//                         <h2 className="text-xl md:text-2xl font-semibold uppercase mt-4 mb-1 ml-20">
//                             Inscripciones
//                         </h2>
//                         <p className="text-lg mb-6 ml-20">19 DE MAYO</p>
//                         <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 ml-20 rounded-lg text-lg transition">
//                             Inscríbete →
//                         </button>
//                     </div>
//                 </div>

//                 {/* Imagen derecha las guitarras y el escenario */}
//                 <div className="w-full md:w-1/2 h-[960px] relative z-0">
//                     <img
//                         src="/Ampliescenario.jpg"
//                         alt="Escenario musical"
//                         className="absolute inset-0 w-full h-full object-cover"
//                     />
//                 </div>
//             </div>

//             {/* Faldón blanco pegado a la izquierda con ancho fijo */}
//             <div className="relative z-20 -mt-12 md:-mt-24">
//                 <div className="bg-white text-gray-900 px-8 md:px-16 py-12 w-[95%] max-w-6xl rounded-none shadow-none ml-0">
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-left">
//                         <div>
//                             <FaVoteYea className="text-purple-600 text-3xl mb-3" />
//                             <h3 className="font-bold text-purple-700 mb-1">
//                                 Votación Popular
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 La votación será popular y pública
//                             </p>
//                         </div>
//                         <div>
//                             <FaUsers className="text-purple-600 text-3xl mb-3" />
//                             <h3 className="font-bold text-purple-700 mb-1">
//                                 3 Proyectos Finalistas
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 Los finalistas actuarán en La Conservera
//                                 (Viveiro)
//                             </p>
//                         </div>
//                         <div>
//                             <FaMoneyBillWave className="text-purple-600 text-3xl mb-3" />
//                             <h3 className="font-bold text-purple-700 mb-1">
//                                 Premio en metálico
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 Además de promoción, redes sociales hay premio
//                                 en metálico.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default MusicianContestBanner;

import { FaVoteYea, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

const MusicianContestBanner = () => {
    return (
        <section className="w-full bg-black text-white overflow-hidden">
            {/* Bloque principal */}
            <div className="flex flex-col md:flex-row h-auto md:h-[750px] relative">
                {/* Zona de texto con gradiente */}
                <div className="relative w-full md:w-2/4 flex flex-col justify-center px-6 md:px-16 py-12 md:py-0 bg-gradient-to-r from-[#3A0CA3] via-[#7209B7] to-[#f72585] z-10">
                    <div className="w-full">
                        <p className="uppercase text-base md:text-xl tracking-wide mb-2 ml-8 md:ml-20">
                            Atención artistas y bandas
                        </p>
                        <h1 className="text-3xl md:text-7xl font-extrabold leading-tight mb-2 w-full  ml-8 md:ml-20">
                            Concurso de músicos
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 w-full  ml-8 md:ml-20">
                            Oiches 2025
                        </h1>
                        <h2 className="text-lg md:text-2xl font-semibold uppercase mt-4 mb-1  ml-8 md:ml-20">
                            Inscripciones
                        </h2>
                        <p className="text-base md:text-lg mb-6  ml-8 md:ml-20">
                            19 DE MAYO
                        </p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-base md:text-lg transition ml-8 md:ml-20">
                            Inscríbete →
                        </button>{' '}
                        {/* Boton sin enlace a y url final */}
                    </div>
                </div>

                {/* Imagen de escenario */}
                {/* <div className="w-full md:w-2/4 h-[400px] md:h-[960px] relative z-0">
                    <img
                        src="/Ampliescenario.jpg"
                        alt="Escenario musical"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div> */}
                {/* Imagen de escenario */}
                <div className="w-full md:w-2/4 h-[400px] md:h-[960px] relative z-0">
                    <img
                        src="/Soloamplie.png"
                        alt="Escenario musical"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Faldón blanco completamente pegado a la izquierda */}
            <div className="relative z-20 -mt-10 md:-mt-24">
                <div className="bg-white text-gray-900 py-12 px-6 w-full max-w-full md:max-w-7xl rounded-none shadow-none ml-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
                        <div>
                            <FaVoteYea className="text-purple-600 text-3xl mb-3 ml-6" />
                            <h3 className="font-bold text-purple-700 mb-1 ml-6">
                                Votación Popular
                            </h3>
                            <p className="text-base text-gray-600 ml-6">
                                Votación online y pública. 9 proyectos
                                finalistas
                            </p>
                        </div>
                        <div>
                            <FaUsers className="text-purple-600 text-3xl mb-3 ml-6" />
                            <h3 className="font-bold text-purple-700 mb-1 ml-6">
                                3 Proyectos Finalistas
                            </h3>
                            <p className="text-base text-gray-600 ml-6">
                                Los ganadores actuarán en La Conservera
                                (Viveiro)
                            </p>
                        </div>
                        <div>
                            <FaMoneyBillWave className="text-purple-600 text-3xl mb-3 ml-6" />
                            <h3 className="font-bold text-purple-700 mb-1 ml-6">
                                Premio en metálico
                            </h3>
                            <p className="text-base text-gray-600 ml-6">
                                600 € a cada proyecto ganador + promocióno.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MusicianContestBanner;
