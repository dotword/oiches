import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../components/GrupoFilter';
import GrupoList from '../components/GrupoList';
import FetchGruposService from '../services/FetchGruposService';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';

const Grupos = () => {
    const [filteredGrupos, setFilteredGrupos] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(null);
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrupos = async () => {
            setError(null);

            try {
                const data = await FetchGruposService(filters, page, pageSize);
                console.log(data);
                setFilteredGrupos(data.rows);
                setTotal(data.total);
            } catch (err) {
                setError('No se pudo cargar la información de los grupos.');
            } 
        };

        fetchGrupos();
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
            className="container-grupos"
        >
            <HeaderHero />
            <div className="hero bg-hero-grupos bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                <h1 className="hero-title text-white">Encuentra tu Grupo Ideal</h1>
                <p className="hero-subtitle text-white">
                    Explora diversos grupos, conecta con ellos y crea música juntos.
                </p>
            </div>
            <div className="grupo-filter-form-container">
                <GrupoFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="grupo-list-container">
               
                {!error && (filteredGrupos.length ? (
                    <GrupoList grupos={filteredGrupos} />
                ) : (
                    <p>No se encontraron grupos</p>
                ))}
            </div>
            <div className='flex gap-6 justify-center my-16'>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous ⬅</button>
                <p>{page}/{totalPages}</p>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next ➡</button>
            </div>
            <Footer />
        </motion.div>
    );
};

export default Grupos;
