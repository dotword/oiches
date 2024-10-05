import { motion } from 'framer-motion';
import HeaderHero from '../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SalaCard from '../components/SalaCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SalasImg from '../assets/salas-de-conciertos.webp';
import GruposImg from '../assets/musicos.jpg';
import GrupoCard from '../components/GrupoCard.jsx';
import SliderMulti from '../components/SliderMulti.jsx';
import Footer from '../components/Footer.jsx';
import Toastify from '../components/Toastify.jsx';
// import { Helmet } from 'react-helmet'; // Importar Helmet para las metaetiquetas dinámicas

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const { VITE_API_URL_BASE } = import.meta.env;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/salas`);
                const result = await response.json();
                setSalas(Array.isArray(result.rows) ? result.rows : []);
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
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {/* SEO - Meta Tags dinámicas */}
            {/* <Helmet>
                <title>Oiches - Conecta Músicos y Salas de Conciertos</title>
                <meta
                    name="description"
                    content="Descubre los músicos más votados y las salas de conciertos más populares en Oiches. Conéctate con la música en vivo y organiza eventos musicales únicos."
                />
            </Helmet> */}


            <HeaderHero />
            <section className="hero relative flex flex-col justify-center items-center bg-hero-home bg-cover bg-center h-96 md:h-[680px]">
                <h1 className="hero-title text-white">
                    Encuentra tu Banda Sonora
                </h1>
                <p className="text-xl md:text-3xl hero-subtitle text-white">
                    Donde la música y el escenario se unen
                </p>
            </section>
            <main className="flex flex-col gap-20 mb-8 max-w-screen-xl mx-auto p-8 md:my-12">
                <section className="grid gap-6">
                    <div className="flex justify-between place-items-center">
                        <h2 className="text-2xl text-center font-semibold mx-auto md:mb-4 md:text-3xl">
                            Músicos más votados
                        </h2>
                    </div>
                    {grupos.length > 0 ? (
                        <SliderMulti>
                            {grupos.map((grupo) => (
                                <GrupoCard key={grupo.id} grupo={grupo} />
                            ))}
                        </SliderMulti>
                    ) : (
                        <p>Músicos no encontrados</p>
                    )}
                </section>
                <section className="grid gap-6">
                    <div className="flex justify-between place-items-center">
                        <h2 className="text-2xl text-center font-semibold mx-auto md:mb-4 md:text-3xl">
                            Salas más votadas
                        </h2>
                    </div>
                    {salas.length > 0 ? (
                        <SliderMulti>
                            {salas.map((sala) => (
                                <SalaCard key={sala.id} sala={sala} />
                            ))}
                        </SliderMulti>
                    ) : (
                        <p>Salas no encontradas</p>
                    )}
                </section>
                <section className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-8 md:justify-around md:mx-auto md:my-6 xl:w-1200">
                    <Link
                        className="relative hover:scale-105 transition-all"
                        to={'/grupos'}
                    >
                        <img
                            className="w-96 md:w-auto rounded-2xl"
                            src={GruposImg}
                            alt="Músicos en Oiches"
                        />
                        <span className="absolute bottom-3 px-4 z-50 text-3xl w-full text-white bg-black bg-opacity-65">
                            Músicos
                        </span>
                    </Link>
                    <Link
                        className="relative hover:scale-105 transition-all"
                        to={'/salas'}
                    >
                        <img
                            className="w-96 md:w-auto h-full rounded-2xl"
                            src={SalasImg}
                            alt="Salas de conciertos  en Oiches"
                        />
                        <span className="absolute bottom-3 px-4 z-50 text-3xl text-white w-full bg-black bg-opacity-65">
                            Salas
                        </span>
                    </Link>
                </section>
            </main>
            <Footer />
            <Toastify />
        </motion.div>
    );
};

export default Home;
