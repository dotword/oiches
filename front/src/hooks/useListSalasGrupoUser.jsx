import { useState, useEffect } from 'react';
import getListSalasGrupoService from '../services/getListSalasGrupoService';

const useListSalasGrupoUser = ({ token, idUserOwner }) => {
    const [entries, setEntries] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                if (idUserOwner) {
                    const json = await getListSalasGrupoService({
                        token,
                        idUserOwner,
                    });
                    setEntries(json.data.ownerList);
                }
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [token, idUserOwner]);

    return { entries, setEntries, error };
};

export default useListSalasGrupoUser;
