import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalaFilter from '../components/SalaFilter';
import SalaList from '../components/SalaList';
import FetchSalasService from '../services/FetchSalasService';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const Salas = () => {
    // const [salas, setSalas] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);
    const pageSize = 8;
    const [filters, setFilters] = useState({});
    const [filteredSalas, setFilteredSalas] = useState([]);

    useEffect(() => {
        const fetchSalas = async () => {
            const data = await FetchSalasService(filters, page, pageSize);
            setTotal(data.total);
            setFilteredSalas(data.rows);
        };

        fetchSalas();
    }, [page, filters, pageSize]);

    const handleFilterChange = async (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reinicia la paginación cuando cambian los filtros
    };

    const totalPages = total ? Math.ceil(total / pageSize) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-salas"
        >
            <HeaderHero />
            <div className="hero bg-hero-salas bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                <h1 className="hero-title text-white">Encuentra tu Sala</h1>
                <p className="hero-subtitle text-white">
                    Descubre y explora distintas salas, conecta con ellos y crea
                    música juntos.
                </p>
            </div>
            <div className="sala-filter-form-container">
                <SalaFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="sala-list-container">
                {filteredSalas ? (
                    <SalaList salas={filteredSalas} />
                ) : (
                    <p>No se encontraron salas</p>
                )}
            </div>
            {totalPages > 1 & (
                <div className="flex gap-3 justify-center my-16">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        <MdKeyboardDoubleArrowLeft className="text-xl" />
                    </button>
                    <p>
                        {page} de {totalPages}
                    </p>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        <MdKeyboardDoubleArrowRight className="text-xl" />
                    </button>
                </div>
            )}

            <Footer />
        </motion.div>
    );
};

export default Salas;
