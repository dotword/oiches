import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../context/auth.context.jsx";
import { AuthContext } from "../context/auth/auth.context.jsx";
import { loginUserService } from '../services/LoginUserService.jsx';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const { login } = AuthContextProvider();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const data = await loginUserService({ email, password });
        setToken(data.token);
        login(data.token, data.email);
        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo electrónico: </label>
            <input
              type="text"
              name="email"
              placeholder="Introduce tu correo electrónico"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Iniciar sesión" />
          </div>
          <div>
            {error ? <p>{error}</p> : ''}
          </div>
          <div>
            <p>Recuperar contraseña</p>
          </div>
        </form>
      </>
    );
  };
  
  export default LoginForm;