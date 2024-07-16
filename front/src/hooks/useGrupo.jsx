import { useState, useEffect } from 'react';
import getGrupoByIdService from '../services/getGrupoByIdService';

const useGrupo = (idGrupo) => {
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getGrupoByIdService(idGrupo);

                setEntry(json.data.grupo);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [idGrupo]);

    return { entry, error };
};

export default useGrupo;
