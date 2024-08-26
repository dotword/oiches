import { useState, useEffect } from 'react';
import getListSalasGrupoService from '../services/getListSalasGrupoService';

const useListSalasGrupoUser = (token) => {
    const [entries, setEntries] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getListSalasGrupoService(token);

                setEntries(json.data.ownerList);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [token]);

    return { entries, setEntries, error };
};

export default useListSalasGrupoUser;
