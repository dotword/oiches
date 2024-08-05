import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalaFilter from '../components/SalaFilter';
import SalaList from '../components/SalaList';
import FetchSalasService from '../services/FetchSalasService';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';

const Salas = () => {
    const [salas, setSalas] = useState([]);
    const [page, setPage] = useState(1);
    const [total,setTotal] = useState(null)
    const [pageSize, setPageSize] = useState(8);
    const [filters, setFilters] = useState({});
    const [filteredSalas, setFilteredSalas] = useState([]);

    useEffect(() => {
        const fetchSalas = async () => {
            const initialSalas = await FetchSalasService(filters, page, pageSize);
            setTotal(initialSalas.total)
            setFilteredSalas( initialSalas.rows);
        };

        fetchSalas();
    }, [page, filters, pageSize]);

    const handleFilterChange = async (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reinicia la paginación cuando cambian los filtros
        const filtered = await FetchSalasService(newFilters, 1, pageSize);
        setTotal(filtered.total)
        setFilteredSalas(filtered.rows);
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-salas"
        >
            <HeaderHero />
            <div className="hero bg-hero-salas bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                <h1 className="hero-title text-white">Encuentra tu Sala </h1>
                <p className="hero-subtitle text-white">
                    Descubre y explora distintas salas, conecta con ellos y crea
                    música juntos.
                </p>
            </div>
            <div className="sala-filter-form-container">
                <SalaFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="sala-list-container">
                {filteredSalas.length ? (
                    <SalaList salas={filteredSalas} />
                ) : (
                    <p>No se encontraron salas</p>
                )}
            </div>
            <div className='flex gap-6 justify-center my-16'>
                <button hidden={page == 1} className='pointer' onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous ⬅</button>
                <p>{page}/<span>{total / pageSize}</span></p>
                <button hidden={page == total / pageSize} onClick={() => setPage(page + 1)}>Next ➡</button>
            </div>
            <Footer />
        </motion.div>
    );
};

export default Salas;
