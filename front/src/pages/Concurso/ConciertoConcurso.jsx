import { motion } from 'framer-motion';
import HeaderHero from '../../components/HeaderHero.jsx';
import Footer from '../../components/Footer.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StepsImg from '../../assets/Steps.jpg';
import bannerBg from '../../assets/banner-concierto-background.jpg';
import selectedBg from '../../assets/ganadoresBG.png';
import sobreBG from '../../assets/sobreConcursoBg.jpg';
import logoOiches from '../../assets/Horizontal_blanco.webp';
import logoConservera from '../../assets/logo-conservera.png';
import { CiCalendar } from 'react-icons/ci';
import { PiMapPinLight } from 'react-icons/pi';
import { MdOutlineDoorSliding } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi2';

const ConciertoConcurso = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <HeaderHero />

                <main className="w-full">
                    <section
                        className="kilogram py-12 px-6 bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${bannerBg})`,
                        }}
                    >
                        <div className="w-full flex justify-center">
                            <h1 className="flex flex-col">
                                <span className="text-white text-6xl z-10 sm:text-7xl md:text-9xl">
                                    Concierto
                                </span>
                                <span className="text-yellowOiches text-7xl -mt-6 sm:text-8xl md:text-[10rem] md:-mt-12">
                                    Oiches
                                </span>
                                <span className="text-yellowOiches text-7xl -mt-4 sm:text-8xl md:text-[10rem] md:-mt-8">
                                    2025
                                </span>
                            </h1>
                        </div>
                        <div className="flex justify-end md:mr-[8vw] xl:-mt-16">
                            <p className="text-white flex flex-col text-4xl sm:text-5xl md:text-6xl">
                                <span>Oiches &</span>
                                <span className="-mt-3">La Conservera</span>
                                <span className="-mt-3">(Viveiro)</span>
                            </p>
                        </div>
                    </section>
                    <section
                        className="sm:grid md:grid-cols-3 justify-items-center pt-12 pb-8 bg-no-repeat bg-cover md:gap-4 md:px-4 lg:gap-8 lg:px-8"
                        style={{
                            backgroundImage: `url(${selectedBg})`,
                        }}
                    >
                        {/* Distance Sisters */}
                        <div
                            className="concurso_winners-card"
                            style={{
                                backgroundImage: `url(${VITE_API_URL_BASE}/uploads/aeda57d2-59bd-4ae7-99df-5398f8fe6e95.jpg)`,
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                                }}
                            />
                            <p className="font-semibold z-10">Rock, Blues</p>
                            <p className="text-xl z-10">
                                Cuatro mujeres melómanas con una base rítmica
                                contundente, riffs de guitarra inspirados en el
                                rock clásico y una voz llena de personalidad.
                            </p>
                            <h2 className="font-bold text-4xl z-10">
                                Distance Sisters
                            </h2>
                            <div className="self-end mt-6 z-10">
                                <Link
                                    to="/grupo/951c5f2b-1dc0-42ac-9a5d-993995f8cde6"
                                    className="concurso_semifinal-link"
                                >
                                    Conoce más
                                    <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Betania */}
                        <div
                            className="concurso_winners-card"
                            style={{
                                backgroundImage: `url(${VITE_API_URL_BASE}/uploads/01abad53-16ea-4dc8-9b9c-1cb133e833d9.jpeg)`,
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                                }}
                            />
                            <p className="font-semibold z-10">Heavy, Metal</p>
                            <p className="text-xl z-10">
                                Con su energía única y pasión por la música,
                                esta banda emergente tiene mucho por ofrecer en
                                la escena del heavy metal melódico.
                            </p>
                            <h2 className="font-bold text-4xl z-10">Betania</h2>
                            <div className="self-end mt-6 z-10">
                                <Link
                                    to="/grupo/87f49a01-3757-4a97-be7b-1d5c8c3c13c1"
                                    className="concurso_semifinal-link"
                                >
                                    Conoce más
                                    <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                        {/* ANDREI */}
                        <div
                            className="concurso_winners-card"
                            style={{
                                backgroundImage: `url(${VITE_API_URL_BASE}/uploads/ce70d336-a49f-40bb-8580-cfe5aaabf0fc.jpg)`,
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                                }}
                            />
                            <p className="font-semibold z-10">Rap, Hip-Hop</p>
                            <p className="text-xl z-10">
                                Su directo es pura energía. No busca simplemente
                                llenar escenarios, sino conectar con el público.
                                Su nombre es sinónimo de impacto.
                            </p>
                            <h2 className="font-bold text-4xl z-10">
                                Andrei La Ley
                            </h2>
                            <div className="mb-4 z-10">
                                <Link
                                    to="/grupo/edc649e0-fbb8-45d3-ab9e-0a747459a966"
                                    className="concurso_semifinal-link mt-6"
                                >
                                    Conoce más
                                    <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section
                        className="text-white px-5 py-12 bg-no-repeat bg-cover bg-center md:flex md:justify-end md:px-10 md:py-20"
                        style={{
                            backgroundImage: `url(${StepsImg})`,
                        }}
                    >
                        <div className="md:w-1/2">
                            <h3 className="font-bold text-4xl mb-8 text-center md:text-left">
                                Concierto Oiches 2025
                            </h3>
                            <div className="text-xl mb-8">
                                <p className="flex gap-2 items-center mb-4">
                                    <CiCalendar /> 20 de septiembre
                                </p>
                                <p className="flex gap-2 items-center mb-4">
                                    <PiMapPinLight />
                                    La Conservera: C. Costa, 5, 27863 Viveiro,
                                    Lugo
                                </p>
                                <p className="flex gap-2 items-center mb-4">
                                    <MdOutlineDoorSliding /> Apertura: 20:00
                                </p>
                                <p className="flex gap-2 items-center mb-4">
                                    <HiOutlineTicket /> Entrada: 10 €
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">
                                    Puntos de venta de entradas anticipadas
                                </p>
                                <p className="flex flex-col lg:flex-row lg:gap-1">
                                    <span className="font-semibold">
                                        La Conservera:
                                    </span>{' '}
                                    C/ Costa, 5, 27863, Viveiro (Lugo)
                                </p>
                                <p className="flex flex-col lg:flex-row lg:gap-1">
                                    <span className="font-semibold">
                                        Marlem (Dekada):
                                    </span>{' '}
                                    Av. Granxas, 13, 27861 Viveiro (Lugo)
                                </p>
                                <p className="flex flex-col lg:flex-row lg:gap-1">
                                    <span className="font-semibold">
                                        Galipizza Covas:
                                    </span>{' '}
                                    C/ Suasbarras, 40, 27861 Viveiro (Lugo)
                                </p>
                                <p className="font-semibold text-lg mt-6">
                                    Venta online
                                </p>
                                <p>
                                    Si quieres reservar tu entrada escríbenos al
                                    email{' '}
                                    <a
                                        href="mailto:hola@oiches.com"
                                        className="underline"
                                    >
                                        hola@oiches.com
                                    </a>
                                    .
                                </p>
                                <p>Asunto: Entradas Concurso Oiches 2025.</p>
                                <p>
                                    Indica tu nombre, número de entradas y tu
                                    DNI.
                                </p>
                            </div>
                            <div className="w-full max-w-700 h-96 mt-12">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d857.9150523171938!2d-7.590334168591286!3d43.675816596876096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd321b0053e2bbfd%3A0x585f41cc8d68e814!2sConservera!5e0!3m2!1ses!2ses!4v1752049201075!5m2!1ses!2ses"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </section>
                    <section
                        className="pt-10 pb-32 px-6 bg-no-repeat bg-cover bg-bottom text-white md:px-20"
                        style={{
                            backgroundImage: `url(${sobreBG})`,
                        }}
                    >
                        <h3 className="font-bold text-4xl mb-8 text-center md:text-left">
                            Sobre el concurso
                        </h3>
                        <div className="md:flex md:gap-8 md:justify-evenly md:mb-10">
                            <div>
                                <div className="text-2xl mb-6 md:text-4xl">
                                    <p>Más de 135 artistas.</p>
                                    <p>3 proyectos musicales seleccionados.</p>
                                    <p>
                                        Más de 25 000 visitas y un millón de
                                        gracias.
                                    </p>
                                </div>
                                <div className="md:text-xl">
                                    <p>Esto no ha hecho más que empezar. </p>
                                    <p>
                                        Gracias por votar, compartir y vivir
                                        este viaje musical con nosotros.
                                    </p>{' '}
                                    <p>¡Y ahora… que suene la música!</p>
                                </div>
                            </div>
                            <div className="my-10">
                                <img
                                    src={logoOiches}
                                    alt="Logo Oiches"
                                    className="max-w-56 mx-auto mb-6"
                                />
                                <img
                                    src={logoConservera}
                                    alt="Logo La Conservera"
                                    className="max-w-56 mx-auto"
                                />
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default ConciertoConcurso;
