import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalaFilter from '../../components/Salas/SalaFilter.jsx';
import SalaList from '../../components/Salas/SalaList.jsx';
import FetchSalasService from '../../services/Salas/FetchSalasService.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Paginator from '../../components/Paginator.jsx';
import Seo from '../../components/SEO/Seo.jsx';
import FeatureGridSalas from '../../components/Salas/FeatureGridSalas.jsx';
import Conectate from '../../components/Conectate.jsx';
import { IoFilter } from 'react-icons/io5';

const Salas = () => {
    const [page, setPage] = useState(1); // Estado para la página actual
    const [total, setTotal] = useState(null); // Total de elementos
    const pageSize = 12; // Tamaño de cada página
    const [isNavOpen, setIsNavOpen] = useState(false);
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

    return (
        <>
            {/* Componente SEO dinámico */}
            <Seo
                title="Oiches | Encuentra Salas de Conciertos para Eventos en Vivo"
                description="Explora y reserva salas de conciertos perfectas para tus eventos en vivo. Conéctate directamente con las mejores opciones a través de Oiches."
                keywords="salas de conciertos, música en vivo, reservas de salas, eventos musicales, donde tocar, conciertos en vivo"
                url="https://oiches.com/salas"
                image="https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg"
                imageAlt="Oiches -Encuentra Salas de Conciertos para Eventos en Vivo"
            />

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <Header txt="Encuentra tu sala" />

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
                            <SalaFilter onFilterChange={handleFilterChange} />
                        </div>
                    </div>
                </section>

                <main className="w-11/12 mx-auto mt-6 mb-20 md:max-w-7xl md:mb-28">
                    <section className="sala-list-container">
                        {filteredSalas.length > 0 ? (
                            <SalaList salas={filteredSalas} />
                        ) : (
                            <p className="text-center">
                                No se encontraron salas
                            </p>
                        )}

                        <Paginator
                            setPage={setPage}
                            page={page}
                            total={total}
                            pageSize={pageSize}
                        />
                    </section>

                    <section className="flex flex-col gap-8 mt-20 mx-4 md:mt-28">
                        <FeatureGridSalas />
                    </section>

                    <section className="mt-20 mx-4 flex flex-col justify-between items-center gap-16 md:flex-row md:mt-28">
                        <Conectate />
                    </section>
                </main>
                <Footer />
            </motion.div>
        </>
    );
};

export default Salas;
