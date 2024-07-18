import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import GrupoDetail from './components/GrupoDetail.jsx';
import './App.css';
import { LoginPage } from './pages/Login.jsx';
import { RecuperarPassword } from './pages/RecuperarPassword.jsx';
import { CreacionModifciacionSala } from './pages/Creacion-ModifciacionSala.jsx';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/grupos/:idGrupo" element={<GrupoDetail />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/RecuperarPassword"
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
