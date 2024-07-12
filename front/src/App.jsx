import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/auth/auth.context.jsx';
import { Home } from './components/Home.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';
import { FullRegisterForm } from './components/FullRegisterForm.jsx';

function App() {
    return (
         <AuthContextProvider>
            <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/alta' element={<RegisterForm/>}></Route>
                <Route path='/register' element={<FullRegisterForm/>}></Route>
            </Routes>
            </>
         </AuthContextProvider>
    );
}

export default App;
