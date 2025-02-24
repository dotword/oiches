import { useState, useEffect } from 'react';
import getAgenciaService from '../services/Agencias/getAgenciaService';

const useAgencia = (idAgencia) => {
    const [agencia, setAgencia] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getAgencia = async () => {
            try {
                const json = await getAgenciaService(idAgencia);

                setAgencia(json.data.agencia);
            } catch (error) {
                setError(error);
            }
        };

        getAgencia();
    }, [idAgencia]);

    return { agencia, error };
};

export default useAgencia;
