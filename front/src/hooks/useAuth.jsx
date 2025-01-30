import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext.jsx';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
