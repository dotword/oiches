import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/auth/auth.context.jsx';
import { Home } from './components/Home.jsx';
import { RegisterPage } from './pages/Register.jsx';




function App() {
    return (
         <AuthContextProvider>
            <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/register' element={<RegisterPage/>}></Route>
            </Routes>
            </>
         </AuthContextProvider>
    );
}

export default App;
