import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuForms from '../components/MenuForms.jsx';
import Toastify from '../components/Toastify.jsx';
import { useEffect, useState } from 'react';
import { Input } from '../components/Input.jsx';
import { toast } from 'react-toastify';

export const ValidateUser = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { VITE_API_URL_BASE } = import.meta.env;
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.target);
    const code = formData.get('code');  
    console.log(code);
    try {
      const response = await fetch(`${VITE_API_URL_BASE}/users/validate/${code}`);

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('Usuario validado con exito')
        navigate('/')
      } else {
        throw new Error(data.message || 'Error validating user');
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: '100%' }}
      exit={{ opacity: 0, height: 0 }}
      className="h-screen md:flex md:w-screen"
    >
      <MenuForms
        signInLogin={
          <>
            <p className="max-[360px]:hidden">¿Ya tienes cuenta?</p>
            <Link
              to="/login"
              className="hover:text-purpleOiches text-yellowOiches ml-2"
            >
              Login
            </Link>
          </>
        }
      />
      <div className="flex justify-between md:justify-evenly max-w-md flex-col gap-y-5 lg:w-1/3 mx-auto lg:mt-20 my-14 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-4xl">Introduzca su código de validación de usuario:</h1>
          <hr />

          <div className="flex flex-col gap-5 justify-center">
            <label htmlFor="code">
              <Input
                type="text"
                name="code"
                placeholder="Código de validación"
                required
                className="form-input"
              />
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Usuario validado con éxito</p>}
          <button
            type="submit"
            className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
            disabled={loading}
          >
            {loading ? 'Validando...' : 'Validar usuario'}
          </button>
        </form>
        <Toastify />
      </div>
    </motion.div>
  );
};
