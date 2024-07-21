import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './App.css';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import GrupoDetail from './components/GrupoDetail.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import { CreacionModifciacionSala } from './pages/Creacion-ModifciacionSala.jsx';
import UserValidationPage from './pages/UserValidationPage.jsx';
import Salas from './pages/Salas.jsx';
import SalaEdit from './components/SalaEdit.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <>
            <AnimatePresence>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/grupos/:idGrupo" element={<GrupoDetail />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/users/validate/:registrationCode"
                        element={<UserValidationPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/recover-password"
                        element={<RecuperarPassword />}
                    />
                    <Route
                        path="/creacion-sala"
                        element={<CreacionModifciacionSala />}
                    />
                    <Route path="/salas/:idSala/edit" element={<SalaEdit />} />

                    <Route path="/salas" element={<Salas />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
