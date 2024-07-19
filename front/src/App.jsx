import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GrupoDetail from './components/GrupoDetail.jsx';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import { CreacionModifciacionSala } from './pages/Creacion-ModifciacionSala.jsx';
import UserValidationPage from './pages/UserValidationPage.jsx';

import './App.css';
function App() {
    return (
        <>
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
                    path="/creacionmodifciacionsala"
                    element={<CreacionModifciacionSala />}
                />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
}

export default App;
