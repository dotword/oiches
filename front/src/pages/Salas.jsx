import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalaFilter from '../components/SalaFilter';
import SalaList from '../components/SalaList';
import FetchSalasService from '../services/FetchSalasService';
import HeaderHero from '../components/HeaderHero.jsx';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
    MdKeyboardDoubleArrowRight,
    MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Seo from '../components/SEO/Seo.jsx'; // Importamos el componente Seo
import FeatureGridSalas from '../components/FeatureGridSalas.jsx'; // Importar el componente FeatureGrid
import Conectate from '../components/Conectate.jsx'; // Importar el componente FeatureGrid

const Salas = () => {
    const [page, setPage] = useState(1); // Estado para la página actual
    const [total, setTotal] = useState(null); // Total de elementos
    const pageSize = 12; // Tamaño de cada página
    const [filters, setFilters] = useState({}); // Filtros activos
    const [filteredSalas, setFilteredSalas] = useState([]); // Salas filtradas

    // Fetch de las salas basado en los filtros y la página actual
    useEffect(() => {
        const fetchSalas = async () => {
            const data = await FetchSalasService(filters, page, pageSize);

            setTotal(data.total); // Total de salas disponibles
            setFilteredSalas(data.result); // Salas filtradas
        };

        fetchSalas();
    }, [page, filters, pageSize]); // Se ejecuta solo cuando cambian la página, filtros o el tamaño de página

    // Actualiza los filtros y resetea la página a la primera SOLO SI los filtros cambian
    const handleFilterChange = async (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters); // Aplica los nuevos filtros
            setPage(1); // Reinicia la paginación cuando cambian los filtros
        }
    };

    // Manejo de la paginación sin interferir con los filtros
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const totalPages = total ? Math.ceil(total / pageSize) : 0; // Calcula las páginas totales

    return (
        <>
            {/* Componente SEO dinámico para la página de Salas */}
            <Seo
                title="Oiches | Encuentra Salas de Conciertos para Eventos en Vivo "
                description="Explora y reserva salas de conciertos perfectas para tus eventos en vivo. Conéctate directamente con las mejores opciones a través de Oiches."
                keywords="salas de conciertos, música en vivo, reservas de salas, eventos musicales"
                url="https://oiches.com/salas"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                className="container-salas"
            >
                <HeaderHero />

                <section className="hero relative flex flex-col justify-center items-start bg-hero-salas bg-cover bg-center h-96 md:h-[680px] px-8 md:px-16">
                    <div className="text-left max-w-lg mr-auto">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Encuentra tu Sala
                        </h1>
                        <p className="text-white text-lg md:text-xl mt-4 mb-3">
                            Descubre y explora distintas salas, conéctate con
                            ellas y lleva tu música en vivo a nuevos escenarios
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-semibold mt-0.25 mb-8">
                            ¡Vive la música en cada rincón!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/register"
                                className="bg-moradoOiches hover:bg-purpleOiches text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
                            >
                                Registrate
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="sala-filter-form-container">
                    <SalaFilter onFilterChange={handleFilterChange} />
                </div>

                <div className="sala-list-container">
                    {filteredSalas.length > 0 ? (
                        <SalaList salas={filteredSalas} />
                    ) : (
                        <p>No se encontraron salas</p>
                    )}
                </div>

                {/* Controles de paginación */}
                {totalPages > 1 && (
                    <div className="flex gap-3 justify-center my-16">
                        <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)} // Cambia de página sin interferir con los filtros
                        >
                            <MdKeyboardDoubleArrowLeft className="text-xl" />
                        </button>
                        <p>
                            {page} de {totalPages}
                        </p>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => handlePageChange(page + 1)} // Cambia de página sin interferir con los filtros
                        >
                            <MdKeyboardDoubleArrowRight className="text-xl" />
                        </button>
                    </div>
                )}

                <section className="flex flex-col gap-8 mx-auto mt-12 mb-24">
                    <FeatureGridSalas />
                </section>
                <Conectate />
                <Footer />
            </motion.div>
        </>
    );
};

export default Salas;
