import { useState, useEffect } from 'react';
import getAgenciaService from '../services/Agencias/getAgenciaService';

const useAgencia = (idAgencia) => {
    const [entry, setEntry] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getAgenciaService(idAgencia);

                setEntry(json.data.sala);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [idAgencia]);

    return { entry, error };
};

export default useAgencia;
