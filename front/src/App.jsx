import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';
import './App.css';
import LoginForm from './components/LoginForm.jsx';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </>
    );
}

export default App;
