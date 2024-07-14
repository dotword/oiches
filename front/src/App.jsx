import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import GrupoDetail from './components/GrupoDetail.jsx';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/grupos/:idGrupo" element={<GrupoDetail />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;
