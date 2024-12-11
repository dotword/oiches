import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import getUserDataService from '../services/Users/getUserDataService';

const useUser = (userId) => {
    const { token } = useContext(AuthContext);

    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getEntry = async () => {
            try {
                const json = await getUserDataService({ token, userId });
                setUser(json);
            } catch (error) {
                setError(error);
            }
        };

        getEntry();
    }, [token, userId]);

    return { user, error };
};

export default useUser;
