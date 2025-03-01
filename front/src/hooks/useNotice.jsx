import { useState, useEffect } from 'react';
import GetNoticeService from '../services/Noticeboard/GetNoticeService';

const useNotice = ({ idNotice, token }) => {
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getNotice = async () => {
            try {
                const json = await GetNoticeService({ idNotice, token });

                setNotice(json.notice);
            } catch (error) {
                setError(error);
            }
        };

        getNotice();
    }, [idNotice, token]);

    return { notice, error };
};

export default useNotice;
