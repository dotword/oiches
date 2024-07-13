import React, { useState } from 'react';
import { Input } from './Input.jsx';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterForm = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const data = {
      roles: formValues.get('roles'),
      username: formValues.get('name'),
      password: formValues.get('password'),
      email: formValues.get('email')
    };
    const password2 = formValues.get('password2');

    if (data.password !== password2) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    const url = import.meta.env.VITE_API_URL_BASE;
    console.log(url);

    try {
      const response = await fetch(`${url}/users/registro`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const { status, message} = result;
      console.log(result);
      if (status === "error") {
        console.log(status);
        toast.error(message);
      } 
      
      if (status === "ok") {
        toast.success(message);
      } 
    } catch (err) {
      console.error('Error during registration:', err);
      toast.error(err.message);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-2">
        <h3 className="text-4xl">Registro</h3>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <hr />
        <div className="flex gap-4 pla">
          <label>
            Grupo <input type="radio" name="roles" value="grupo" />
          </label>
          <label>
            Sala <input type="radio" required name="roles" value="sala" />
          </label>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <label htmlFor="name">Username*
            <Input type="text" name="name" placeholder="Led Zeppelin" required className="border mt-2 h-10 w-full" />
          </label>
          <label htmlFor="email">Email*
            <Input type="email" name="email" placeholder="Youremail@example.com" required className="border mt-2 h-10 w-full" />
          </label>
          <label htmlFor="password">Contraseña*
            <Input type="password" name="password" placeholder="Yourpassword0?" required className="border mt-2 h-10 w-full" />
          </label>
          <label htmlFor="password2">Repetir contraseña*
            <Input type="password" name="password2" placeholder="Yourpassword0?" required className="border mt-2 h-10 w-full" />
          </label>
        </div>
        <p><input type="checkbox" name="terms" required /> Acepto los términos y condiciones</p>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="p-4 w-full bg-slate-500 justify-center rounded">Crear cuenta</button>
      </form>
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
        transition={Bounce} // Correct usage of transition
      />
    </>
  );
};
