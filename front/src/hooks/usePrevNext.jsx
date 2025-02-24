import { useEffect, useState } from 'react';

const usePrevNext = ({ idItem, roles }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${VITE_API_URL_BASE}/${roles}/${idItem}/prevnext`
            );
            const data = await response.json();

            setPrevious(data[0].anterior);
            setNext(data[0].posterior);
        };

        fetchData();
    }, [idItem, roles, VITE_API_URL_BASE]);

    return { previous, next };
};

export default usePrevNext;
