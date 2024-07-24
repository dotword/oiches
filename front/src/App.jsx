import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './App.css';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import GrupoDetail from './components/GrupoDetail.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import UserValidationPage from './pages/UserValidationPage.jsx';
import Users from './pages/Users.jsx';
import CreacionSala from './pages/CreacionSala.jsx';
import EdicionSala from './pages/EdicionSala.jsx';
import Salas from './pages/Salas.jsx';
import CreacionGrupo from './pages/CreacionGrupo.jsx';
import NotFound from './pages/NotFound.jsx';
import { SalaPage } from './pages/SalaPage.jsx';

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
                    <Route path="/users" element={<Users />} />
                    <Route path="/creacion-sala" element={<CreacionSala />} />
                    <Route
                        path="/salas/:idSala/edit"
                        element={<EdicionSala />}
                    />

                    <Route path="/salas" element={<Salas />} />
                    <Route path="/sala/:idSala" element={<SalaPage/>} />
                    <Route path="/creacion-grupo" element={<CreacionGrupo />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
