import { useState, useEffect } from 'react';
import GetAdvertService from '../services/Advertisers/GetAdvertService';

const useAdvert = (idAdvert) => {
    const [advert, setAdvert] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getAdvert = async () => {
            try {
                const json = await GetAdvertService(idAdvert);

                setAdvert(json.advert);
            } catch (error) {
                setError(error);
            }
        };

        getAdvert();
    }, [idAdvert]);

    return { advert, error };
};

export default useAdvert;
