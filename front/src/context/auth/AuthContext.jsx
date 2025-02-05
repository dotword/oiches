import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import getDataUserLoggedService from '../../services/Users/getDataUserLoggedService.js';

const AuthContext = createContext({
    currentUser: null,
    signIn: (token = '') => {
        console.log(token);
    },
    signOut: () => {},
});

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN');
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogged, setUserLogged] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    function signIn(token) {
        localStorage.setItem('AUTH_TOKEN', token);
        const user = jwtDecode(token);
        setCurrentUser(user);
    }

    function signOut() {
        localStorage.removeItem('AUTH_TOKEN');
        setCurrentUser(null);
        setUserLogged(null); // También limpiamos el estado de userLogged
    }

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            const user = jwtDecode(token);
            if (user.exp * 1000 < Date.now()) {
                localStorage.removeItem('AUTH_TOKEN');
                navigate('/login');
            } else {
                setCurrentUser(user);
            }
        }
    }, [navigate]);

    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === 'AUTH_TOKEN') {
                if (event.newValue) {
                    const user = jwtDecode(event.newValue);
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    useEffect(() => {
        const getDateUserLogged = async () => {
            try {
                const data = await getDataUserLoggedService({ token });
                setUserLogged(data);
            } catch (error) {
                console.log(error);
                signOut();
            } finally {
                setLoading(false); // Se completó la carga, sea exitosa o con error
            }
        };

        if (token) {
            getDateUserLogged();
        } else {
            setLoading(false); // Si no hay token, no hay nada que cargar
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                userLogged,
                setUserLogged,
                currentUser,
                signIn,
                signOut,
                token,
                loading, // Pasar el estado de carga al contexto
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
