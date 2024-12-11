import { useState, useEffect } from 'react';
import getSalaService from '../services/Salas/getSalaService.js';

const useSala = (idSala) => {
    const [entry, setEntry] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getSalaService(idSala);

                setEntry(json.data.sala);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [idSala]);

    return { entry, error };
};

export default useSala;
