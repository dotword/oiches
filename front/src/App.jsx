import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './App.css';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import UserValidationPage from './pages/UserValidationPage.jsx';
import Users from './pages/Users.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import CreacionSala from './pages/CreacionSala.jsx';
import EdicionSala from './pages/EdicionSala.jsx';
import { SalaPage } from './pages/SalaPage.jsx';
import Salas from './pages/Salas.jsx';
import CreacionGrupo from './pages/CreacionGrupo.jsx';
import EdicionGrupo from './pages/EdicionGrupo.jsx';
import GrupoDetail from './components/GrupoDetail.jsx';
import Grupos from './pages/Grupos.jsx';
import NotFound from './pages/NotFound.jsx';
import { CrearReservaPage } from './pages/CrearReservaPage.jsx';
import { ValidateUser } from './pages/ValidateUser.jsx';

function App() {
    return (
        <AnimatePresence>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/users/validate/:registrationCode"
                    element={<UserValidationPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/users/password/recover"
                    element={<RecuperarPassword />}
                />
                <Route path="/users/password" element={<ChangePassword />} />
                <Route path="/users" element={<Users />} />
                <Route path="/creacion-sala" element={<CreacionSala />} />
                <Route path="/sala/:idSala/edit" element={<EdicionSala />} />
                <Route path="/salas" element={<Salas />} />
                <Route path="/sala/:idSala" element={<SalaPage />} />
                <Route path="/creacion-grupo" element={<CreacionGrupo />} />
                <Route
                    path="/grupos/:idGrupo/edit"
                    element={<EdicionGrupo />}
                />
                <Route path="/grupo/:idGrupo" element={<GrupoDetail />} />
                <Route path="/grupos" element={<Grupos />} />{' '}
                {/* Añadida ruta para la página de grupos */}
                <Route
                    path="/sala/:idSala/reservas"
                    element={<CrearReservaPage type="sala" />}
                />
                <Route
                    path="/grupo/:idGrupo/reservas"
                    element={<CrearReservaPage type="grupo" />}
                />
                <Route
                    path="/validateUser"
                    element={<ValidateUser  />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
