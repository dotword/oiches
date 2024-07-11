import './App.css';
import LoginForm from './components/LoginForm';
import { useAuth } from './authContext';
import React from 'react';

function App() {
  const { auth, logout } = useAuth();

  return (
    <>
      <h1>Oiches</h1>
      {auth ? (
        <div>
          <h2>Bienvenido, {auth.userInfo.name}</h2>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default App;
