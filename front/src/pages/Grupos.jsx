import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../components/GrupoFilter';
import GrupoList from '../components/GrupoList';
import FetchGruposService from '../services/FetchGruposService';
import HeaderHero from '../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Seo from '../components/SEO/Seo.jsx'; // Importar el componente SEO
import FeatureGridMusicos from '../components/FeatureGridMusicos.jsx';
import Conectate from '../components/Conectate.jsx'; // Importar el componente FeatureGrid

const Grupos = () => {
    const [filteredGrupos, setFilteredGrupos] = useState([]);
    const [page, setPage] = useState(1); // Estado para la página actual
    const pageSize = 12; // Tamaño de página
    const [total, setTotal] = useState(null); // Total de resultados
    const [filters, setFilters] = useState({}); // Filtros activos
    const [error, setError] = useState(null);

    // Fetch de los grupos basado en los filtros y la página actual
    useEffect(() => {
        const fetchGrupos = async () => {
            setError(null);

            try {
                const data = await FetchGruposService(filters, page, pageSize);
                setFilteredGrupos(data.rows); // Grupos filtrados
                setTotal(data.total); // Total de grupos disponibles
            } catch (err) {
                setError('No se pudo cargar la información de los músicos.');
            }
        };

        fetchGrupos();
    }, [page, filters, pageSize]);

    // Actualiza los filtros y resetea la página a la primera cuando los filtros cambian
    const handleFilterChange = (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters); // Aplica los nuevos filtros
            setPage(1); // Reinicia la paginación cuando los filtros cambian
        }
    };

    // Cambiar de página sin afectar los filtros
    const handlePageChange = (newPage) => {
        setPage(newPage); // Actualiza la página actual
    };

    const totalPages = total ? Math.ceil(total / pageSize) : 0; // Calcula el total de páginas

    return (
        <>
            {/* Componente SEO dinámico */}
            <Seo
                title="Músicos - Oiches"
                description="Encuentra músicos ideales para tu sala y llena tu espacio con la mejor música en vivo. Conéctate con bandas y organiza eventos únicos."
                url="https://oiches.com/grupos"
                keywords="músicos, bandas emergentes, grupos musicales,músicos para eventos, eventos, salas de conciertos"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="container-grupos"
            >
                <HeaderHero />

                <div className="hero relative flex flex-col justify-center items-start bg-hero-grupos bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
                    <div className="text-left max-w-lg mr-auto">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Encuentra a los músicos ideales
                        </h1>
                        <p className="text-white text-lg md:text-xl mt-4 mb-3">
                            Explora diversos talentos, conecta con ellos y llena
                            tu sala con música en vivo.
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
                            ¡Vive la música en cada rincón!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/register"
                                className="bg-purpleOiches hover:bg-orange-500 text-white font-bold py-2 px-6 rounded"
                            >
                                Regístrate
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grupo-filter-form-container">
                    <GrupoFilter onFilterChange={handleFilterChange} />
                </div>
                <div className="grupo-list-container">
                    {!error &&
                        (filteredGrupos.length > 0 ? (
                            <GrupoList grupos={filteredGrupos} />
                        ) : (
                            <p>No se encontraron músicos</p>
                        ))}
                </div>

                {/* Controles de paginación */}
                {totalPages > 1 && (
                    <div className="flex gap-3 justify-center my-16">
                        <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)} // Cambiar de página sin modificar los filtros
                        >
                            <MdKeyboardDoubleArrowLeft className="text-xl" />
                        </button>
                        <p>
                            {page} de {totalPages}
                        </p>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => handlePageChange(page + 1)} // Cambiar de página sin modificar los filtros
                        >
                            <MdKeyboardDoubleArrowRight className="text-xl" />
                        </button>
                    </div>
                )}

                {/* Sección de características para músicos*/}
                <section className="flex flex-col gap-8 mx-auto mt-12 mb-24">
                    <FeatureGridMusicos />
                </section>

                {/* Sección de Conectate */}
                <Conectate />

                <Footer />
            </motion.div>
        </>
    );
};

export default Grupos;
