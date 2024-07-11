import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState(null);

    const login = ( token, userInfo ) => {
        setAuth({ token, userInfo });
    };

    const logout = () => {
        setAuth(null);
    };

    return (
        <AuthContext.Provider value = {{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};