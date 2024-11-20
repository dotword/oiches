import { motion } from 'framer-motion';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';
import Seo from '../components/SEO/Seo.jsx'; // Importamos el componente Seo

const SobreOiches = () => {
    return (
        <>
            {/* Integración del componente Seo */}
            <Seo
                title="Sobre Oiches - Plataforma para Músicos y Salas de Concierto"
                description="Descubre cómo Oiches conecta a músicos emergentes con salas de concierto, facilitando reservas y oportunidades únicas para música en vivo."
                keywords="Oiches, músicos, salas de concierto, música en vivo, reservas, gestión de eventos"
                url="https://oiches.com/sobre-oiches"
                image="https://oiches.com/Oiches-musica-vivo.jpg"
                type="website"
                imageType="image/jpg"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <HeaderHero />
                <section className="hero relative flex flex-col justify-center items-center bg-hero-oiches bg-cover bg-center h-52">
                    <h1 className="hero-title text-white">Sobre Oiches</h1>
                </section>

                <main className="w-11/12 mx-auto mt-6 mb-10 md:max-w-7xl">
                    <section className="mt-10 mb-20">
                        <p className="mb-4">
                            Eres parte de un grupo musical emergente que sueña
                            con tocar en los escenarios más vibrantes. Has
                            trabajado incansablemente para perfeccionar tu
                            sonido y estás listo para compartirlo con el mundo.
                        </p>
                        <p className="mb-4">
                            Pero hay un obstáculo: encontrar la sala de
                            conciertos perfecta para tu banda no es fácil. Cada
                            lugar tiene sus propias características, y coordinar
                            con los responsables para reservar fechas adecuadas
                            puede ser una pesadilla logística.
                        </p>
                        <p className="mb-4">
                            Al mismo tiempo, hay salas de conciertos que buscan
                            constantemente nuevas bandas para llenar sus
                            calendarios con música en vivo emocionante.
                        </p>
                        <p className="mb-4">
                            Sin embargo, conectarse con los músicos adecuados y
                            gestionar todas las reservas es un desafío constante
                            para los administradores de las salas.
                        </p>
                        <p className="mb-4">
                            Con Oiches, como músico, puedes explorar una amplia
                            variedad de salas de conciertos, desde locales
                            íntimos hasta grandes escenarios, viendo de antemano
                            la ubicación, capacidad, equipamiento técnico y
                            disponibilidad de fechas.
                        </p>
                        <p className="mb-4">
                            Como sala de conciertos, podrás dar con el grupo que
                            más se ajuste a tu estilo musical y a tus fechas
                            disponibles, y dar a conocer a los músicos las
                            características de tu sala.
                        </p>
                        <p className="mb-4">
                            No más correos interminables o llamadas perdidas;
                            ahora puedes contactar directamente con los
                            responsables de las salas y gestionar todas las
                            reservas en un solo lugar.
                        </p>
                        <p className="mb-4">
                            Ya seas un músico que busca su próximo gran
                            escenario o un administrador de sala que quiere
                            optimizar su programación, Oiches es la herramienta
                            que conecta todos estos mundos.
                        </p>
                        <p className="font-bold text-center mt-8 mb-4 text-lg">
                            ¡Únete a Oiches hoy y vive la música siempre!
                        </p>
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default SobreOiches;
