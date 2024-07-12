import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/auth/auth.context.jsx';
import { Home } from './pages/Home.jsx';
import { RegisterForm } from './pages/RegisterForm.jsx';

function App() {
    return (
         <AuthContextProvider>
            <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/register' element={<RegisterForm/>}></Route>
            </Routes>
            </>
         </AuthContextProvider>
    );
}

export default App;
