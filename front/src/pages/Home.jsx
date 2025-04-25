import { motion } from 'framer-motion';
import HeaderHero from '../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SalaCard from '../components/Salas/SalaCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GrupoCard from '../components/Grupos/GrupoCard.jsx';
import SliderMulti from '../components/SliderMulti.jsx';
import Footer from '../components/Footer.jsx';
import Toastify from '../components/Toastify.jsx';
import Seo from '../components/SEO/Seo.jsx';
import Steps from '../components/Steps.jsx';
import Conectate from '../components/Conectate.jsx';
import MusicianContestBanner from '../components/MusicianContestBanner.jsx';

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const { VITE_API_URL_BASE } = import.meta.env;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/salas`);
                const result = await response.json();
                setSalas(Array.isArray(result.result) ? result.result : []);
            } catch (error) {
                console.error('Error fetching salas:', error);
                setSalas([]);
            }
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/grupos`);
                const result = await response.json();
                setGrupos(Array.isArray(result.rows) ? result.rows : []);
            } catch (error) {
                console.error('Error fetching grupos:', error);
                setGrupos([]);
            }
        };
        fetchData();
    }, [VITE_API_URL_BASE]);

    return (
        <>
            <Seo
                title="Oiches - Músicos y Salas de Conciertos Destacados"
                description="Explora los músicos mejor valorados y las salas más votadas en Oiches. Conecta con talentos y escenarios perfectos para disfrutar la mejor música en vivo."
                keywords="músicos, bandas, salas de conciertos, eventos musicales"
                url="https://oiches.com"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg"
                type="website"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'ItemList',
                    itemListElement: [
                        ...grupos.map((grupo, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            name: grupo.nombre,
                            url: `https://oiches.com/grupos/${grupo.id}`,
                        })),
                        ...salas.map((sala, index) => ({
                            '@type': 'ListItem',
                            position: grupos.length + index + 1,
                            name: sala.nombre,
                            url: `https://oiches.com/salas/${sala.id}`,
                        })),
                    ],
                }}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <HeaderHero />
                <MusicianContestBanner />{' '}
                {/* Componente banner anuncio concurso */}
                {/* Hero Section hero banner comentado para usar banner concurso, descomentar y eliminar comoponente MusicanContestBanner*/}
                {/* <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center sm:h-96 md:h-[680px] p-8 md:p-16">
                    <div className="text-left max-w-lg mr-auto">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Encuentra tu banda sonora
                        </h1>
                        <p className="text-white text-lg md:text-xl mt-4 mb-3 max-[600px]:hidden">
                            Encuentra el escenario perfecto o la banda ideal sin
                            complicaciones.
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
                            ¡Vive la música en cada rincón!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/grupos"
                                className="bg-purpleOiches hover:bg-moradoOiches text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
                            >
                                Músicos
                            </Link>
                            <Link
                                to="/salas"
                                className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
                            >
                                Salas
                            </Link>
                        </div>
                    </div>
                </section> */}
                {/* Main Content */}
                <main className="w-11/12 mx-auto mt-6 mb-20 md:max-w-7xl md:mb-28">
                    {/* Músicos más votados */}
                    <section className="mt-16 md:mt-20">
                        <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                            Músicos más votados
                        </h2>
                        {grupos.length > 0 ? (
                            <SliderMulti>
                                {grupos.slice(0, 8).map((grupo) => (
                                    <GrupoCard key={grupo.id} grupo={grupo} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p className="text-center text-gray-500">
                                Músicos no encontrados
                            </p>
                        )}
                        <div className="flex justify-center mt-16">
                            <Link
                                to="/grupos"
                                className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                            >
                                Todos los músicos
                            </Link>
                        </div>
                    </section>

                    {/* Salas más votadas */}
                    <section className="mt-16 md:mt-20">
                        <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                            Salas más votadas
                        </h2>
                        {salas.length > 0 ? (
                            <SliderMulti>
                                {salas.slice(0, 8).map((sala) => (
                                    <SalaCard key={sala.id} sala={sala} />
                                ))}
                            </SliderMulti>
                        ) : (
                            <p className="text-center text-gray-500">
                                Salas no encontradas
                            </p>
                        )}
                        <div className="flex justify-center mt-16">
                            <Link
                                to="/salas"
                                className="bg-gradient-to-r from-moradoOiches to-purpleOiches text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                            >
                                Todas las salas
                            </Link>
                        </div>
                    </section>

                    {/* Sección de Steps */}
                    <section className="mt-20 mx-4 flex justify-center items-center md:mt-28">
                        <Steps />
                    </section>

                    {/* Sección de Conectate */}
                    <section className="mt-20 mx-4 flex flex-col justify-between items-center gap-16 md:flex-row md:mt-28">
                        <Conectate />
                    </section>
                </main>
                <Footer />
                <Toastify />
            </motion.div>
        </>
    );
};

export default Home;
