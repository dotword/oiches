import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/auth.context.jsx';
import { Home } from './pages/Home.jsx';

function App() {
    return (
         <AuthContextProvider>
            <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
            </>
         </AuthContextProvider>
    );
}

export default App;
