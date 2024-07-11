import React, { useState } from "react";
import { useAuth } from "../authContext";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/login',{
            method: 'POST',
            headers: { 'Content-Type': 'applicatio/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if(response.ok) {
            login(data.token, data.user);
        } else {
            alert('Fallo de login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuario</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;