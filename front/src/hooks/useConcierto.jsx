import { useState, useEffect } from 'react';
import getConciertoService from '../services/Conciertos/getConciertoService.js';

const useConcierto = (conciertoId) => {
    const [concierto, setConcierto] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getConciertoService(conciertoId);

                setConcierto(json.concierto);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [conciertoId]);

    return { concierto, error };
};

export default useConcierto;
