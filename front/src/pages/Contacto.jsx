import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import HeaderHero from '../components/HeaderHero.jsx';
import { FaEnvelope } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import Seo from '../components/SEO/Seo.jsx';

export const Contacto = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <>
            {/* SEO contacto */}
            <Seo
                title="Contacto - Oiches"
                description="Ponte en contacto con Oiches para dudas, propuestas o ideas. ¡Devolvamos la esencia a la música en directo!"
                url="https://oiches.com/contacto"
                keywords="contacto, hablar con Oiches, dudas, propuestas, ideas"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Contacto - Oiches',
                    description:
                        'Ponte en contacto con Oiches para dudas, propuestas o ideas.',
                    url: 'https://oiches.com/contacto',
                    mainEntity: {
                        '@type': 'ContactPoint',
                        email: 'hola@oiches.com',
                        contactType: 'Customer Support',
                        availableLanguage: ['Spanish', 'English'],
                        sameAs: [
                            'https://www.instagram.com/oiches_musica/',
                            'https://www.facebook.com/oiches',
                        ],
                    },
                }}
            />
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <HeaderHero />

                <section className="bg-hero-contacto bg-cover bg-center flex flex-col items-center justify-center relative px-4 min-h-screen">
                    <div className="mt-14 text-center px-4 md:px-0">
                        <h1 className="text-white text-4xl drop-shadow-[0_4px_3px_rgba(0,0,0,0.9) font-extrabold md:text-6xl">
                            Hablemos
                        </h1>
                        <p className="text-white text-opacity-70 text-base drop-shadow-[0_2px_1px_rgba(0,0,0,0.9)] mt-2 md:text-lg md:mt-4">
                            ¡Dudas, ideas, propuestas…! ¡Devolvamos la esencia a
                            la música en directo!
                        </p>
                    </div>
                    <div className="w-full max-w-6xl mx-auto p-6 md:p-2 bg-black bg-opacity-50 rounded-lg border border-gray-500 backdrop-blur-lg flex flex-col gap-10 items-center justify-center mt-14 mb-8 md:flex-row">
                        <div className="flex flex-col gap-6 w-full md:w-1/2  md:p-6">
                            <h2 className="text-white text-2xl font-semibold text-center md:text-left">
                                Ponte en contacto con nosotros
                            </h2>
                            <p className="text-white text-opacity-80 text-center md:text-left">
                                Seamos libres, hagamos música.
                            </p>

                            <ContactForm />
                        </div>

                        <div className="flex flex-col items-center justify-center w-full md:w-1/2 gap-2 text-white ">
                            <img
                                src="/Oiches-logo-vertical.png"
                                alt="Logo"
                                className="w-48 my-4"
                            />
                            <div className="flex flex-wrap justify-center gap-6 items-center mb-4">
                                <a
                                    href="mailto:hola@oiches.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-2 font-semibold text-sm"
                                >
                                    <FaEnvelope className="text-lg" />
                                    hola@oiches.com
                                </a>

                                <a
                                    href="https://www.instagram.com/oiches_musica/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-2 font-semibold text-sm"
                                >
                                    <FaInstagram className="text-lg" />
                                    @oiches_musica
                                </a>
                            </div>
                            <button
                                onClick={() => setIsInfoOpen(!isInfoOpen)}
                                className="bg-purpleOiches text-white text-sm font-normal p-2 rounded-md mb-4"
                            >
                                {isInfoOpen
                                    ? 'Ocultar información protección de datos'
                                    : 'Mostrar información protección de datos'}
                            </button>

                            <div
                                className={`p-5 bg-opacity-50 rounded-lg text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                                    isInfoOpen ? 'block' : 'hidden'
                                }`}
                            >
                                <p className="text-sm font-semibold">
                                    Responsabilidad:
                                </p>
                                <p>
                                    María Carmen Salgueiro Rodríguez (en
                                    adelante, Oiches)
                                </p>
                                <p className="text-sm font-semibold mt-2">
                                    Finalidad:
                                </p>
                                <p>
                                    Envío y recepción de información, gestión de
                                    usuarios
                                </p>
                                <p className="text-sm font-semibold mt-2">
                                    Legitimación:
                                </p>
                                <p>Consentimiento del interesado</p>
                                <p className="text-sm font-semibold mt-2">
                                    Destinatarios:
                                </p>
                                <p>
                                    Plataformas de Marketing (consultar política
                                    de privacidad)
                                </p>
                                <p className="text-sm font-semibold mt-2">
                                    Derechos:
                                </p>
                                <p>
                                    De acceso, rectificación y supresión de
                                    datos, así como otros derechos detallados en
                                    la política de privacidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </>
    );
};

export default Contacto;
