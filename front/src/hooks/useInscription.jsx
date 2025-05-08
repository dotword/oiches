import { useState, useEffect } from 'react';
import GetInscriptionService from '../services/Concurso/GetInscriptionService';

const useInscription = ({ token, idGrupo }) => {
    const [inscription, setInscription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await GetInscriptionService({ token, idGrupo });

                setInscription(json.inscription);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [token, idGrupo]);

    return { inscription, error };
};

export default useInscription;
