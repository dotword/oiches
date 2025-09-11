import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdvertsFilter from '../../components/Advertisers/AdvertsFilter.jsx';
import ClasificadosList from '../../components/Advertisers/ClasificadosList.jsx';
import FetchAllPublishedAdvertisersService from '../../services/Advertisers/FetchAllPublishedAdvertisersService.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Paginator from '../../components/Paginator.jsx';
import { IoFilter } from 'react-icons/io5';

const ClasificadosPage = () => {
    const [page, setPage] = useState(1); // Estado para la página actual
    const [total, setTotal] = useState(null); // Total de elementos
    const pageSize = 6; // Tamaño de cada página
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [filters, setFilters] = useState({}); // Filtros activos
    const [filteredAdverts, setFilteredAdverts] = useState([]); //

    useEffect(() => {
        const fetchAdverts = async () => {
            const data = await FetchAllPublishedAdvertisersService(
                filters,
                page,
                pageSize
            );
            setTotal(data.total);
            setFilteredAdverts(data.rows);
        };

        fetchAdverts();
    }, [page, filters, pageSize]);

    // Actualiza los filtros y resetea la página a la primera SOLO SI los filtros cambian
    const handleFilterChange = async (newFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters);
            setPage(1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header />
            <main className="px-4 pb-16 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200">
                <h1 className="text-4xl md:text-5xl font-bold ">
                    Clasificados
                </h1>
                <Paginator
                    setPage={setPage}
                    page={page}
                    total={total}
                    pageSize={pageSize}
                />

                <section>
                    <div
                        className="flex justify-center p-2 gap-4 bg-footercolor text-white md:hidden"
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
                        <div className="flex flex-col items-center justify-between w-11/12">
                            <AdvertsFilter
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </section>

                <section className="ads-list-container">
                    {filteredAdverts.length > 0 ? (
                        <ClasificadosList clasificados={filteredAdverts} />
                    ) : (
                        <p className="text-center">
                            No se encontraron anuncios
                        </p>
                    )}

                    <Paginator
                        setPage={setPage}
                        page={page}
                        total={total}
                        pageSize={pageSize}
                    />
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default ClasificadosPage;
