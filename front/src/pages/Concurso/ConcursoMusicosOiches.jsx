import HeaderHero from '../../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import Seo from '../../components/SEO/Seo.jsx';
import { motion } from 'framer-motion';

// Datos para la sección "Sobre el concurso"
const contestInfo = [
    {
        title: '¿Finalidad del concurso?',
        description:
            'La finalidad del concurso es descubrir y promover el talento los artistas emergentes, dándoles más visibilidad y la oportunidad de compartir su trabajo.',
    },
    {
        title: '¿Quién puede participar?',
        description:
            'Bandas y artistas, de todos los géneros musicales, en activo en el territorio nacional. Los participantes deben estar dispuestos a actuar en directo si ganan el concurso.',
    },
    {
        title: '¿Cuál es el premio?',
        description:
            'Habrá 3 proyectos ganadores. Los ganadores actuarán en La Conservera (Viveiro, Lugo). Pago de 600 € por actuación, en concepto de gastos.',
    },
];

const howToParticipate = [
    {
        title: 'Regístrate',
        href: '/register',
        description:
            'Si no lo has hecho ya, completa el formulario con los datos de tu proyecto musical.',
    },
    {
        title: 'Inscríbete',
        href: '/login',
        description:
            'En tu cuenta de Oiches, accede a «Concurso Oiches 2025» y acepta las bases del concurso.',
    },
    {
        title: 'Tu música',
        href: '#',
        description:
            'No olvides subir videos de tu música. Si es en directo, mejor.',
    },
    {
        title: 'Comparte',
        href: '#',
        description:
            'Promociona tu participación y consigue el apoyo del público',
    },
];

// Renombrado a camelCase para consistencia
const comoVotar = [
    {
        title: 'Accede a las candidaturas',
        href: '#',
        description:
            'Entra en la sección «Candidaturas y votación» de nuestra web.',
    },
    {
        title: 'Registra tu email',
        description:
            'En la pestaña «Inscribe tu email para votar», introduce tu email. Recibirás un correo electrónico para validarlo.',
    },
    {
        title: 'Vota hasta 3 proyectos',
        description:
            'Selecciona el proyecto y haz clic en «Votar». Introduce tu email validado. Confirma tu elección.',
    },
];

function ConcursoMusicosOichesPage() {
    return (
        <>
            {/* Componente SEO dinámico */}
            <Seo
                title="Oiches | Concurso de Bandas y Artistas Emergentes"
                description="Participa en el concurso de Oiches para artistas y bandas emergentes. Gana visibilidad y la oportunidad de actuar en vivo."
                keywords="concurso de musica, bandas emergentes, artistas emergentes, oiches, musica en vivo, premio musica"
                url="https://oiches.com/concurso"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg"
                imageAlt="Concurso Oiches para músicos y bandas emergentes"
            />
            {/* Contenedor principal con animación */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HeaderHero />

                {/* --- HERO Section --- */}
                <section className="relative flex flex-col justify-center items-start bg-hero-concurso bg-cover bg-center min-h-[500px] md:min-h-[680px] p-8 md:p-16 text-white">
                    {/* Overlay para legibilidad */}
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    {/* Contenido del Hero */}
                    <div className="relative z-10 text-left w-full max-w-3xl mr-auto">
                        <h1 className="block w-full text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-center md:text-left mb-4">
                            Buscamos el próximo gran artista/grupo
                        </h1>
                        <p className="text-lg md:text-xl mt-4 mb-6 text-center md:text-left">
                            Participa, vota y sé parte de esta experiencia
                            musical
                        </p>
                        <div className="flex justify-center md:justify-start gap-4 mt-8">
                            <Link
                                to="/register"
                                className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                ¡Participa Ahora!
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- SOBRE EL CONCURSO Section --- */}
                <section className="relative bg-black text-white overflow-hidden py-20 md:py-32 px-4 sm:px-6">
                    {/* Efecto visual de fondo (Glow + Grid) */}
                    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-700/25 rounded-full blur-[160px] z-0" />
                    <div
                        className="absolute inset-0 z-0 opacity-45"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 10V40M10 25H40' stroke='%23A855F7' stroke-width='0.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            backgroundSize: '50px 50px',
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Título de la sección */}
                        <div className="text-center md:text-left mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-purple-500 inline-block pb-2 text-white">
                                Sobre el Concurso
                            </h2>
                        </div>
                        {/* Bloques de información mapeados */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-left">
                            {contestInfo.map((item) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeOut',
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-300">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMO PARTICIPAR Section - Refactorizada */}
                <section className="relative bg-white text-black overflow-hidden py-20 md:py-32 px-4 sm:px-6">
                    {/* Glow difuminado morado - Anclado abajo */}
                    <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[400px] md:bottom-[-200px] md:w-[1200px] md:h-[600px] lg:bottom-[-250px] lg:w-[1500px] lg:h-[700px] bg-purple-600/20 rounded-full blur-[120px] md:blur-[150px] lg:blur-[180px] z-0 pointer-events-none" />
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 z-0 opacity-15"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 12V44M12 28H44' stroke='%23A855F7' stroke-width='0.6' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            backgroundSize:
                                '30px 30px sm:backgroundSize: 40px 40px',
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Título */}
                        <div className="text-center md:text-left mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-purple-500 inline-block pb-2 text-gray-800">
                                CÓMO PARTICIPAR
                            </h2>
                            <p>19/05/2005 al 09/06/2025</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
                            {howToParticipate.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col"
                                >
                                    <h3 className="text-lg font-semibold mb-3 text-purple-700">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                                        {step.description}
                                    </p>
                                    {step.href !== '#' && (
                                        <a
                                            href={step.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 font-semibold text-sm flex items-center gap-1 hover:underline mt-auto group"
                                        >
                                            <span>Ir ahora</span>
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 15,
                                                }}
                                                className="inline-block transition-transform group-hover:translate-x-1"
                                            >
                                                →
                                            </motion.span>
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMO VOTAR Section - Revisada con dos glows */}
                <section className="relative bg-white text-black overflow-hidden py-20 md:py-32 px-4 sm:px-6">
                    <div className="absolute left-1/2 -translate-x-1/2 top-[-150px] w-[90vw] max-w-[700px] h-[350px] md:top-[-200px] md:w-[1200px] md:h-[600px] lg:top-[-250px] lg:w-[1500px] lg:h-[700px] bg-purple-600/20 rounded-full blur-[120px] md:blur-[150px] lg:blur-[180px] z-0 pointer-events-none" />
                    {/* Glow 2: Abajo a la derecha (responsivo) */}
                    <div className="absolute bottom-[-50px] right-[-50px] w-[60vw] max-w-[400px] h-[200px] md:bottom-[-100px] md:right-[-100px] md:w-[800px] md:h-[400px] lg:bottom-[-150px] lg:right-[-150px] lg:w-[1000px] lg:h-[500px] bg-purple-500/15 rounded-full blur-[100px] md:blur-[120px] lg:blur-[150px] z-0 pointer-events-none" />
                    {/* Contenido de la sección centrado con max-w-7xl */}
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Título corregido y alineado responsivamente */}
                        <div className="text-center md:text-left mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-purple-500 inline-block pb-2 text-gray-800">
                                CÓMO VOTAR
                            </h2>
                            <p>11/06/2025 al 06/07/2025</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-left">
                            {/* Mapeo con variable renombrada */}
                            {comoVotar.map((item) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeOut',
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-purple-700">
                                        {item.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>
                                    {item.href && item.href !== '#' && (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 font-semibold text-sm flex items-center gap-1 hover:underline mt-4 group"
                                        >
                                            <span>Ir ahora</span>
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 15,
                                                }}
                                                className="inline-block transition-transform group-hover:translate-x-1"
                                            >
                                                →
                                            </motion.span>
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </motion.div>

            <Footer />
        </>
    );
}

export default ConcursoMusicosOichesPage;
