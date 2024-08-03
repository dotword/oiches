import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../components/GrupoFilter';
import GrupoList from '../components/GrupoList';
import FetchGruposService from '../services/FetchGruposService';
import HeaderHero from '../components/HeaderHero.jsx';
import Footer from '../components/Footer';

const Grupos = () => {
    // const [grupos, setGrupos] = useState([]);
    const [filteredGrupos, setFilteredGrupos] = useState([]);

    useEffect(() => {
        const fetchGrupos = async () => {
            const initialGrupos = await FetchGruposService();
            // setGrupos(initialGrupos);
            setFilteredGrupos(initialGrupos);
        };

        fetchGrupos();
    }, []);

    const handleFilterChange = async (filters) => {
        const filtered = await FetchGruposService(filters);
        setFilteredGrupos(filtered);
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-grupos"
        >
            <HeaderHero />
            <div className="hero bg-hero-grupos bg-cover relative before:content-[''] before:bg-white/[.10] before:absolute before:w-full before:h-full">
                <h1 className="hero-title text-white">
                    Encuentra tu Grupo Ideal
                </h1>
                <p className="hero-subtitle text-white">
                    Explora diversos grupos, conecta con ellos y crea música
                    juntos.
                </p>
            </div>
            <div className="grupo-filter-form-container">
                <GrupoFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="grupo-list-container">
                {filteredGrupos.length ? (
                    <GrupoList grupos={filteredGrupos} />
                ) : (
                    <p>No se encontraron grupos</p>
                )}
            </div>
            <Footer />
        </motion.div>
    );
};

export default Grupos;
