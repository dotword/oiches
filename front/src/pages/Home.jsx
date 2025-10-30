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
import Conectate from '../components/Conectate.jsx';

const Home = () => {
    const [salas, setSalas] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [agencias, setAgencias] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_BASE}/agencias`);
                const result = await response.json();

                setAgencias(Array.isArray(result.result) ? result.result : []);
            } catch (error) {
                console.error('Error fetching agencias:', error);
                setAgencias([]);
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

                {/* Hero Section hero banner comentado para usar banner concurso, descomentar y eliminar comoponente MusicanContestBanner*/}
                <section className="hero relative flex flex-col justify-center items-start bg-hero-home bg-cover bg-center sm:h-96 md:h-[680px] p-8 md:p-16">
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
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/grupos"
                                className="btn-buscar w-auto bg-moradoOiches hover:bg-purpleOiches"
                            >
                                Músicos
                            </Link>
                            <Link to="/salas" className="btn-buscar w-auto">
                                Salas
                            </Link>
                            <Link
                                to="/agencias"
                                className="btn-buscar w-auto bg-moradoOiches hover:bg-purpleOiches"
                            >
                                Agencias
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Main Content */}
                <main className="mb-20 md:mb-28">
                    {/* Músicos más votados */}
                    <section className="pt-16 pb-8 bg-gray-50 md:pt-20">
                        <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                            Músicos
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
                            <Link to="/grupos" className="btn-gradient-purple">
                                Todos los músicos
                            </Link>
                        </div>
                    </section>

                    {/* Salas más votadas */}
                    <section className="mt-10 pb-8 md:mt-16">
                        <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                            Salas
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
                            <Link to="/salas" className="btn-gradient-purple">
                                Todas las salas
                            </Link>
                        </div>
                    </section>
                    {/* Agencias más votadas */}
                    <section className="pt-10 pb-8 bg-gray-50 md:pt-16">
                        <h2 className="text-3xl text-center font-bold mb-8 mx-auto md:text-4xl md:mb-12">
                            Agencias
                        </h2>
                        {salas.length > 0 ? (
                            <SliderMulti>
                                {agencias.slice(0, 8).map((agencia) => (
                                    <div
                                        key={agencia.id}
                                        className="card-generica"
                                    >
                                        <Link
                                            to={`/agencia/${agencia.id}`}
                                            className="w-full"
                                        >
                                            <img
                                                src={`${VITE_API_URL_BASE}/uploads/${agencia.avatar}`}
                                                alt={`Imagen de ${agencia.nombre}`}
                                                className={`grupo-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
                                                    !agencia.avatar
                                                        ? 'object-contain'
                                                        : 'object-cover'
                                                }`}
                                            />
                                        </Link>

                                        {/* Contenedor del contenido alineado a la izquierda */}
                                        <div className="flex flex-col flex-1">
                                            <h2 className="text-lg font-bold mt-2">
                                                {agencia.nombre}
                                            </h2>
                                            <p className="text-gray-400">
                                                {agencia.provincia}
                                            </p>
                                            <p className="text-sm">
                                                {agencia.especNombres}
                                            </p>

                                            {/* Botón siempre abajo alineado a la izquierda */}
                                            <div className="mt-auto pb-2 flex justify-end">
                                                <Link
                                                    to={`/agencia/${agencia.id}`}
                                                    className="mt-4 inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-all"
                                                >
                                                    Más info
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </SliderMulti>
                        ) : (
                            <p className="text-center text-gray-500">
                                Agencias no encontradas
                            </p>
                        )}
                        <div className="flex justify-center mt-16">
                            <Link
                                to="/agencias"
                                className="btn-gradient-purple"
                            >
                                Todas las agencias
                            </Link>
                        </div>
                    </section>

                    {/* Sección de Conectate */}
                    <section className="w-11/12 mx-auto mb-20 mt-20 flex flex-col justify-between items-center gap-16 md:max-w-7xl md:flex-row md:mt-28">
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
