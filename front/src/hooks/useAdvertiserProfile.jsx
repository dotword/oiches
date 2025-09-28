import { useState, useEffect } from 'react';
import GetAdvertiserProfileService from '../services/Advertisers/GetAdvertiserProfileService';

const useAdvertiserProfile = ({ userId, token }) => {
    const [advertiser, setAdvertiser] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getAdvertiser = async () => {
            try {
                const json = await GetAdvertiserProfileService({
                    userId,
                    token,
                });

                setAdvertiser(json.advertiserDetails[0]);
            } catch (error) {
                setError(error);
            }
        };

        getAdvertiser();
    }, [userId, token]);

    return { advertiser, error };
};

export default useAdvertiserProfile;
