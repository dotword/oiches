import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import './App.css';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import { Login } from './pages/Login.jsx';
import { CreacionModifciacionSala } from './pages/Creacion-ModifciacionSala.jsx';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/RecuperarPassword" element={<RecuperarPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/creacionmodifciacionsala" element={<CreacionModifciacionSala />} />
            </Routes>
        </>
    );
}

export default App;
