import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrupoFilter from '../components/GrupoFilter';
import GrupoList from '../components/GrupoList';
import FetchGruposService from '../services/FetchGruposService';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';

const Grupos = () => {
    const [grupos, setGrupos] = useState([]);
    const [filteredGrupos, setFilteredGrupos] = useState([]);

    useEffect(() => {
        const fetchGrupos = async () => {
            const initialGrupos = await FetchGruposService();
            // console.log('Grupos iniciales:', initialGrupos);
            setGrupos(initialGrupos);
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
            <Header />
            <div className="hero w-full">
                <h1 className="hero-title">Encuentra tu Grupo Ideal</h1>
                <p className="hero-subtitle">
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
