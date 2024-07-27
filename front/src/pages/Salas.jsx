// src/pages/Salas.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalaFilter from '../components/SalaFilter';
import SalaList from '../components/SalaList';
import FetchSalasService from '../services/FetchSalasService';

const Salas = () => {
    const [salas, setSalas] = useState([]);
    const [filteredSalas, setFilteredSalas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const initialSalas = await FetchSalasService();
                setSalas(initialSalas);
                setFilteredSalas(initialSalas);
            } catch (error) {
                console.error('Error fetching salas:', error);
                setError('Hubo un error al obtener las salas');
            }
        };

        fetchSalas();
    }, []);

    const handleFilterChange = async (filters) => {
        try {
            const filtered = await FetchSalasService(filters);
            setFilteredSalas(filtered);
        } catch (error) {
            console.error('Error filtering salas:', error);
            setError('Hubo un error al filtrar las salas');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-salas"
        >
            <div className="hero w-full h-[680px] bg-gray-200 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Encuentra tu Banda Sala</h1>
                <p className="text-xl mt-4 text-center">
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam
                    ad, nam no suscipit quaerendum. At nam minimum ponderum. Est
                    audiam animal molestiae te.
                </p>
            </div>
            <div className="sala-filter-form-container">
                <SalaFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="sala-list-container mt-20">
                {error && <p className="text-red-500">{error}</p>}
                <SalaList salas={filteredSalas} />
            </div>
        </motion.div>
    );
};

export default Salas;
