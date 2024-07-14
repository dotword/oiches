import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import GrupoDetails from './components/GrupoDetails.jsx';
import { RegisterPage } from './pages/Register.jsx';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/grupos/:idGrupo" element={<GrupoDetails />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;
