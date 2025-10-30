import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../../components/Grupos/GrupoFilter.jsx';
import GrupoList from '../../components/Grupos/GrupoList';
import FetchGruposService from '../../services/Grupos/FetchGruposService.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Seo from '../../components/SEO/Seo.jsx'; // Importar el componente SEO
import FeatureGridMusicos from '../../components/Grupos/FeatureGridMusicos.jsx';
import Conectate from '../../components/Conectate.jsx';
import { IoFilter } from 'react-icons/io5';
import Paginator from '../../components/Paginator.jsx';

const Grupos = () => {
    const [filteredGrupos, setFilteredGrupos] = useState([]);
    const [page, setPage] = useState(1); // Estado para la página actual
    const pageSize = 12; // Tamaño de página
    const [total, setTotal] = useState(null); // Total de resultados
    const [isNavOpen, setIsNavOpen] = useState(false);
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

    return (
        <>
            {/* Componente SEO dinámico */}
            <Seo
                title="Músicos - Oiches"
                description="Encuentra músicos ideales para tu sala y llena tu espacio con la mejor música en vivo. Conéctate con bandas y organiza eventos únicos."
                url="https://oiches.com/grupos"
                keywords="músicos, bandas emergentes, grupos musicales, músicos para eventos, eventos, salas de conciertos"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salas.jpg"
                imageAlt="Oiches - Conectamos músicos y salas"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Encuentra a los músicos ideales" />

                <section>
                    <div
                        className="flex justify-center p-2 gap-4 bg-footercolor text-white mt-2 md:hidden"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        FILTRAR
                        <IoFilter className="text-2xl cursor-pointer" />
                    </div>
                    <div
                        className={`bg-footercolor flex-col items-center justify-evenly ${
                            isNavOpen ? 'flex' : 'hidden md:flex'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-between w-4/5">
                            <GrupoFilter onFilterChange={handleFilterChange} />
                        </div>
                    </div>
                </section>

                <main className="w-11/12 mx-auto mt-6 mb-20 md:max-w-7xl md:mb-28">
                    <section className="grupo-list-container">
                        {!error &&
                            (filteredGrupos.length > 0 ? (
                                <GrupoList grupos={filteredGrupos} />
                            ) : (
                                <p className="text-center">
                                    No se encontraron músicos
                                </p>
                            ))}

                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </section>

                    {/* Sección de características para músicos*/}
                    <section className="flex flex-col gap-8 mt-20 mx-4 md:mt-28">
                        <FeatureGridMusicos />
                    </section>

                    {/* Sección de Conectate */}
                    <section className="mt-20 mx-4 flex flex-col justify-between items-center gap-16 md:flex-row md:mt-28">
                        <Conectate />
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default Grupos;
